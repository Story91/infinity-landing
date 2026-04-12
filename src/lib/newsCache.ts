import OpenAI from 'openai';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  source: 'HackerNews' | 'DevTo' | 'Guardian' | 'Arxiv';
  publishedAt: string;
  image: string;
}

interface CacheEntry {
  data: NewsItem[];
  timestamp: number;
}

const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2h
const newsCache = new Map<string, CacheEntry>();

async function fetchHackerNews(): Promise<Omit<NewsItem, 'excerpt'>[]> {
  const topIds: number[] = await fetch(
    'https://hacker-news.firebaseio.com/v0/topstories.json',
    { next: { revalidate: 0 } }
  ).then(r => r.json());

  const results: Omit<NewsItem, 'excerpt'>[] = [];
  const AI_REGEX = /\bai\b|gpt|llm|openai|claude|anthropic|machine learning|neural|mistral|gemini|deepmind|language model/i;

  for (let i = 0; i < Math.min(topIds.length, 200); i += 10) {
    if (results.length >= 10) break;
    const batch = await Promise.all(
      topIds.slice(i, i + 10).map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
      )
    );
    const aiStories = batch.filter((item: any) =>
      item?.title && AI_REGEX.test(item.title)
    );
    results.push(...aiStories.map((item: any) => ({
      id: `hn-${item.id}`,
      title: item.title as string,
      url: (item.url as string) || `https://news.ycombinator.com/item?id=${item.id}`,
      source: 'HackerNews' as const,
      publishedAt: new Date(item.time * 1000).toISOString(),
      image: '',
    })));
  }
  return results.slice(0, 10);
}

async function fetchDevTo(): Promise<Omit<NewsItem, 'excerpt'>[]> {
  const articles: any[] = await fetch(
    'https://dev.to/api/articles?tag=ai&per_page=8&top=1'
  ).then(r => r.json());

  return articles.map((a: any) => ({
    id: `devto-${a.id}`,
    title: a.title as string,
    url: a.url as string,
    source: 'DevTo' as const,
    publishedAt: a.published_at as string,
    image: (a.cover_image as string) || (a.social_image as string) || '',
  }));
}

async function fetchGuardian(): Promise<Omit<NewsItem, 'excerpt'>[]> {
  const key = process.env.GUARDIAN_API_KEY;
  if (!key) return [];

  const data: any = await fetch(
    `https://content.guardianapis.com/search?q=artificial+intelligence&api-key=${key}&page-size=8&order-by=newest&show-fields=thumbnail`
  ).then(r => r.json());

  return (data.response?.results ?? []).map((r: any) => ({
    id: `guardian-${r.id}`,
    title: r.webTitle as string,
    url: r.webUrl as string,
    source: 'Guardian' as const,
    publishedAt: r.webPublicationDate as string,
    image: (r.fields?.thumbnail as string) || '',
  }));
}

async function fetchArxiv(): Promise<Omit<NewsItem, 'excerpt'>[]> {
  const xml = await fetch(
    'https://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=5'
  ).then(r => r.text());

  const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g) ?? [];
  return entries.map((entry, i) => {
    const title = (entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '').trim().replace(/\s+/g, ' ');
    const id = (entry.match(/<id>([\s\S]*?)<\/id>/)?.[1] ?? '').trim();
    const published = (entry.match(/<published>([\s\S]*?)<\/published>/)?.[1] ?? '').trim();
    return {
      id: `arxiv-${i}`,
      title,
      url: id,
      source: 'Arxiv' as const,
      publishedAt: published,
      image: '',
    };
  });
}

async function fetchOgImage(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'Range': 'bytes=0-15000' },
    });
    clearTimeout(timeout);
    const html = await res.text();
    const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)
      || html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);
    return ogMatch?.[1] ?? '';
  } catch {
    return '';
  }
}

async function enrichWithImages(
  items: Omit<NewsItem, 'excerpt'>[]
): Promise<Omit<NewsItem, 'excerpt'>[]> {
  const needsImage = items.filter(i => !i.image);
  if (!needsImage.length) return items;

  const images = await Promise.allSettled(
    needsImage.map(i => fetchOgImage(i.url))
  );

  let idx = 0;
  return items.map(item => {
    if (item.image) return item;
    const result = images[idx++];
    return { ...item, image: result?.status === 'fulfilled' ? result.value : '' };
  });
}

async function summarizeWithOpenAI(
  items: Omit<NewsItem, 'excerpt'>[]
): Promise<NewsItem[]> {
  if (!items.length) return [];

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `Dla każdego poniższego tytułu artykułu o AI/technologii:
1. Przetłumacz tytuł na język polski (naturalnie, nie dosłownie)
2. Napisz krótkie polskie streszczenie (2-3 zdania)

Odpowiedz w formacie JSON: {"items": [{"id": "...", "title_pl": "...", "excerpt": "..."}]}

Tytuły:
${items.map(i => `{"id": "${i.id}", "title": ${JSON.stringify(i.title)}}`).join('\n')}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 3000,
    });

    const parsed = JSON.parse(response.choices[0].message.content ?? '{}');
    const summaries: { id: string; title_pl: string; excerpt: string }[] = parsed.items ?? [];

    return items.map(item => {
      const s = summaries.find(s => s.id === item.id);
      return {
        ...item,
        title: s?.title_pl || item.title,
        excerpt: s?.excerpt || item.title,
      };
    });
  } catch (err) {
    console.error('[newsCache] OpenAI summarize error:', err);
    return items.map(item => ({ ...item, excerpt: item.title }));
  }
}

export async function getNewsWithCache(): Promise<NewsItem[]> {
  const CACHE_KEY = 'news-feed';
  const cached = newsCache.get(CACHE_KEY);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const [hn, devto, guardian, arxiv] = await Promise.allSettled([
    fetchHackerNews(),
    fetchDevTo(),
    fetchGuardian(),
    fetchArxiv(),
  ]);

  const rawItems = [
    ...(hn.status === 'fulfilled' ? hn.value : []),
    ...(devto.status === 'fulfilled' ? devto.value : []),
    ...(guardian.status === 'fulfilled' ? guardian.value : []),
    ...(arxiv.status === 'fulfilled' ? arxiv.value : []),
  ];

  // Deduplicate by first 40 chars of title
  const seen = new Set<string>();
  const unique = rawItems.filter(item => {
    const key = item.title.toLowerCase().slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const withImages = await enrichWithImages(unique);
  const withSummaries = await summarizeWithOpenAI(withImages);
  newsCache.set(CACHE_KEY, { data: withSummaries, timestamp: Date.now() });
  return withSummaries;
}
