import OpenAI from 'openai';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  source: 'TechCrunch' | 'TheVerge' | 'Wired' | 'DevTo' | 'Guardian' | 'Arxiv';
  publishedAt: string;
  image: string;
}

interface CacheEntry {
  data: NewsItem[];
  timestamp: number;
}

const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2h
const CACHE_FILE = join(tmpdir(), 'infinity-news-cache.json');

// --- File-based cache ---

function readCache(): CacheEntry | null {
  try {
    if (!existsSync(CACHE_FILE)) return null;
    const raw = readFileSync(CACHE_FILE, 'utf-8');
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
}

function writeCache(entry: CacheEntry) {
  try {
    writeFileSync(CACHE_FILE, JSON.stringify(entry), 'utf-8');
  } catch {}
}

let memCache: CacheEntry | null = null;

function getCache(): CacheEntry | null {
  if (memCache) return memCache;
  const fileCache = readCache();
  if (fileCache) memCache = fileCache;
  return memCache;
}

function setCache(entry: CacheEntry) {
  memCache = entry;
  writeCache(entry);
}

// --- RSS parser helper ---

function parseRssItems(xml: string, source: NewsItem['source'], limit: number): Omit<NewsItem, 'excerpt'>[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
  return items.slice(0, limit).map((item, i) => {
    const title = (item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]>/)?.[1]
      ?? item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '').trim();
    const link = (item.match(/<link><!\[CDATA\[([\s\S]*?)\]\]>/)?.[1]
      ?? item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? '').trim();
    const pubDate = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? '').trim();

    // Try to extract image from media:content, media:thumbnail, or enclosure
    const image = (
      item.match(/<media:content[^>]+url=["']([^"']+)["']/)?.[1]
      ?? item.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/)?.[1]
      ?? item.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image/)?.[1]
      ?? item.match(/<img[^>]+src=["']([^"']+)["']/)?.[1]
      ?? ''
    ).trim();

    return {
      id: `${source.toLowerCase()}-${i}`,
      title,
      url: link,
      source,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      image,
    };
  }).filter(item => item.title && item.url);
}

// --- API fetchers ---

async function fetchTechCrunch(): Promise<Omit<NewsItem, 'excerpt'>[]> {
  try {
    const xml = await fetch(
      'https://techcrunch.com/category/artificial-intelligence/feed/',
      { signal: AbortSignal.timeout(8000) }
    ).then(r => r.text());
    return parseRssItems(xml, 'TechCrunch', 8);
  } catch {
    return [];
  }
}

async function fetchTheVerge(): Promise<Omit<NewsItem, 'excerpt'>[]> {
  try {
    const xml = await fetch(
      'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
      { signal: AbortSignal.timeout(8000) }
    ).then(r => r.text());
    return parseRssItems(xml, 'TheVerge', 6);
  } catch {
    return [];
  }
}

async function fetchWired(): Promise<Omit<NewsItem, 'excerpt'>[]> {
  try {
    const xml = await fetch(
      'https://www.wired.com/feed/tag/ai/latest/rss',
      { signal: AbortSignal.timeout(8000) }
    ).then(r => r.text());
    return parseRssItems(xml, 'Wired', 6);
  } catch {
    return [];
  }
}

async function fetchDevTo(): Promise<Omit<NewsItem, 'excerpt'>[]> {
  try {
    const articles = await fetch(
      'https://dev.to/api/articles?tag=ai&per_page=8&top=1',
      { signal: AbortSignal.timeout(8000) }
    ).then(r => r.json()) as Array<{ id: number; title: string; url: string; published_at: string; cover_image?: string; social_image?: string }>;

    return articles.map(a => ({
      id: `devto-${a.id}`,
      title: a.title,
      url: a.url,
      source: 'DevTo' as const,
      publishedAt: a.published_at,
      image: a.cover_image || a.social_image || '',
    }));
  } catch {
    return [];
  }
}

async function fetchGuardian(): Promise<Omit<NewsItem, 'excerpt'>[]> {
  const key = process.env.GUARDIAN_API_KEY;
  if (!key) return [];

  try {
    const data = await fetch(
      `https://content.guardianapis.com/search?q=artificial+intelligence&api-key=${key}&page-size=8&order-by=newest&show-fields=thumbnail`,
      { signal: AbortSignal.timeout(8000) }
    ).then(r => r.json()) as { response?: { results?: Array<{ id: string; webTitle: string; webUrl: string; webPublicationDate: string; fields?: { thumbnail?: string } }> } };

    return (data.response?.results ?? []).map(r => ({
      id: `guardian-${r.id}`,
      title: r.webTitle,
      url: r.webUrl,
      source: 'Guardian' as const,
      publishedAt: r.webPublicationDate,
      image: r.fields?.thumbnail || '',
    }));
  } catch {
    return [];
  }
}

async function fetchArxiv(): Promise<Omit<NewsItem, 'excerpt'>[]> {
  try {
    const xml = await fetch(
      'https://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=5',
      { signal: AbortSignal.timeout(8000) }
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
  } catch {
    return [];
  }
}

// --- OpenAI translation ---

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
    console.error('[newsCache] OpenAI error:', err);
    return items.map(item => ({ ...item, excerpt: item.title }));
  }
}

// --- Main cache logic ---

async function fetchAndTranslate(): Promise<NewsItem[]> {
  const [techcrunch, verge, wired, devto, guardian, arxiv] = await Promise.allSettled([
    fetchTechCrunch(),
    fetchTheVerge(),
    fetchWired(),
    fetchDevTo(),
    fetchGuardian(),
    fetchArxiv(),
  ]);

  const rawItems = [
    ...(techcrunch.status === 'fulfilled' ? techcrunch.value : []),
    ...(verge.status === 'fulfilled' ? verge.value : []),
    ...(wired.status === 'fulfilled' ? wired.value : []),
    ...(devto.status === 'fulfilled' ? devto.value : []),
    ...(guardian.status === 'fulfilled' ? guardian.value : []),
    ...(arxiv.status === 'fulfilled' ? arxiv.value : []),
  ];

  // Sort by date (newest first)
  rawItems.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Deduplicate
  const seen = new Set<string>();
  const unique = rawItems.filter(item => {
    const key = item.title.toLowerCase().slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Translate and cache
  const translated = await summarizeWithOpenAI(unique);
  setCache({ data: translated, timestamp: Date.now() });
  return translated;
}

export async function getNewsWithCache(): Promise<NewsItem[]> {
  const cached = getCache();

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    return await fetchAndTranslate();
  } catch (err) {
    console.error('[newsCache] fetchAndTranslate failed:', err);
    return cached?.data ?? [];
  }
}
