# Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Uruchomić blog firmowy z artykułami z Notion (ISR) + automatycznym feedem newsów AI z 4 darmowych API, w stylu pasującym do reszty strony (dark navy).

**Architecture:** Server Component `blog/page.tsx` z ISR (`revalidate=3600`) pobiera artykuły z Notion i renderuje statyczny shell (nav, footer). Interaktywne części (filtry, wyszukiwarka, hero z animacjami) to `BlogContent.tsx` — Client Component. Newsy ze świata (`NewsSection.tsx`) działają niezależnie przez `/api/news` z in-memory cache 2h + OpenAI summarization.

**Tech Stack:** Next.js 14 App Router, `@notionhq/client`, `notion-to-md`, `openai`, `react-markdown`, Tailwind CSS

---

## File Map

| Plik | Akcja | Odpowiedzialność |
|---|---|---|
| `src/lib/notion.ts` | CREATE | Klient Notion, typy `BlogPost`, funkcje fetch |
| `src/lib/newsCache.ts` | CREATE | Fetche z 4 API + OpenAI summarizer + in-memory cache |
| `src/app/api/news/route.ts` | CREATE | GET endpoint serwujący newsy z cache |
| `src/components/NewsSection.tsx` | CREATE | UI feedu newsów (client, fetch + render) |
| `src/components/blog/BlogContent.tsx` | CREATE | Hero + filtry + grid artykułów (client, dark style) |
| `src/app/blog/page.tsx` | EDIT | Server Component ISR — nav, fetch Notion, footer |
| `src/app/blog/[slug]/page.tsx` | CREATE | Strona artykułu z Notion + markdown render |
| `src/app/page.tsx` | EDIT | Dodanie "Blog" do menuItems |

---

## Task 1: Zainstaluj zależności i skonfiguruj env

**Files:**
- Modify: `package.json`
- Modify: `.env.local`

- [ ] **Krok 1: Zainstaluj pakiety**

```bash
cd "C:/Users/nadru/OneDrive/Dokumenty/Infinity Org/infinity-landing"
npm install @notionhq/client notion-to-md openai react-markdown @tailwindcss/typography
```

Oczekiwane: instalacja bez błędów, pakiety dodane do `package.json`.

- [ ] **Krok 1b: Dodaj plugin typography do `tailwind.config.ts`**

W `tailwind.config.ts` podmień `plugins: []` na:

```typescript
plugins: [require('@tailwindcss/typography')],
```

- [ ] **Krok 2: Dodaj zmienne środowiskowe do `.env.local`**

Otwórz `.env.local` i dodaj (zachowaj istniejące wpisy):

```
NOTION_API_KEY=secret_...
NOTION_BLOG_DATABASE_ID=...
GUARDIAN_API_KEY=...
```

Jak uzyskać klucze:
- **Notion API Key:** `https://www.notion.so/my-integrations` → New integration → skopiuj "Internal Integration Secret"
- **Notion Database ID:** otwórz bazę danych w Notion → URL wygląda jak `notion.so/<ID>?v=...` → skopiuj `<ID>`
- **Guardian API Key:** `https://open-platform.theguardian.com/access/` → Developer (darmowy) → otrzymasz email z kluczem

Pamiętaj: po stworzeniu integracji w Notion, musisz ją udostępnić bazie danych (Share → zaproś integrację).

- [ ] **Krok 3: Sprawdź TypeScript**

```bash
npx tsc --noEmit
```

Oczekiwane: zero błędów TypeScript przed napisaniem czegokolwiek.

- [ ] **Krok 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat(blog): install notion, openai, react-markdown dependencies"
```

---

## Task 2: Utwórz `src/lib/notion.ts`

**Files:**
- Create: `src/lib/notion.ts`

- [ ] **Krok 1: Utwórz plik**

```typescript
// src/lib/notion.ts
import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  coverImage: string;
  readTime: string;
  featured: boolean;
  published: boolean;
}

function extractProp(prop: any): string {
  if (!prop) return '';
  switch (prop.type) {
    case 'title': return prop.title.map((t: any) => t.plain_text).join('');
    case 'rich_text': return prop.rich_text.map((t: any) => t.plain_text).join('');
    case 'url': return prop.url || '';
    case 'date': return prop.date?.start || '';
    case 'select': return prop.select?.name || '';
    default: return '';
  }
}

export function pageToPost(page: PageObjectResponse): BlogPost {
  const props = page.properties as any;
  return {
    id: page.id,
    slug: extractProp(props.Slug),
    title: extractProp(props.Title),
    excerpt: extractProp(props.Excerpt),
    category: extractProp(props.Category),
    date: extractProp(props.Date),
    author: extractProp(props.Author),
    coverImage: extractProp(props.CoverImage),
    readTime: extractProp(props.ReadTime),
    featured: props.Featured?.checkbox ?? false,
    published: props.Published?.checkbox ?? false,
  };
}

export async function fetchPublishedPosts(): Promise<BlogPost[]> {
  const db = process.env.NOTION_BLOG_DATABASE_ID;
  if (!db) return [];

  try {
    const response = await notion.databases.query({
      database_id: db,
      filter: { property: 'Published', checkbox: { equals: true } },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

    return response.results
      .filter((p): p is PageObjectResponse => p.object === 'page')
      .map(pageToPost);
  } catch (err) {
    console.error('[notion] fetchPublishedPosts error:', err);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = process.env.NOTION_BLOG_DATABASE_ID;
  if (!db) return null;

  try {
    const response = await notion.databases.query({
      database_id: db,
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Published', checkbox: { equals: true } },
        ],
      },
    });

    const page = response.results.find((p): p is PageObjectResponse => p.object === 'page');
    return page ? pageToPost(page) : null;
  } catch (err) {
    console.error('[notion] fetchPostBySlug error:', err);
    return null;
  }
}

export async function fetchPostContent(pageId: string): Promise<string> {
  try {
    const { NotionToMarkdown } = await import('notion-to-md');
    const n2m = new NotionToMarkdown({ notionClient: notion });
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    return n2m.toMarkdownString(mdBlocks).parent;
  } catch (err) {
    console.error('[notion] fetchPostContent error:', err);
    return '';
  }
}
```

- [ ] **Krok 2: Sprawdź TypeScript**

```bash
npx tsc --noEmit
```

Oczekiwane: zero błędów.

- [ ] **Krok 3: Commit**

```bash
git add src/lib/notion.ts
git commit -m "feat(blog): add Notion client, types and fetch functions"
```

---

## Task 3: Utwórz `src/lib/newsCache.ts`

**Files:**
- Create: `src/lib/newsCache.ts`

- [ ] **Krok 1: Utwórz plik**

```typescript
// src/lib/newsCache.ts
import OpenAI from 'openai';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  source: 'HackerNews' | 'DevTo' | 'Guardian' | 'Arxiv';
  publishedAt: string;
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
  }));
}

async function fetchGuardian(): Promise<Omit<NewsItem, 'excerpt'>[]> {
  const key = process.env.GUARDIAN_API_KEY;
  if (!key) return [];

  const data: any = await fetch(
    `https://content.guardianapis.com/search?q=artificial+intelligence&api-key=${key}&page-size=8&order-by=newest`
  ).then(r => r.json());

  return (data.response?.results ?? []).map((r: any) => ({
    id: `guardian-${r.id}`,
    title: r.webTitle as string,
    url: r.webUrl as string,
    source: 'Guardian' as const,
    publishedAt: r.webPublicationDate as string,
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
    };
  });
}

async function summarizeWithOpenAI(
  items: Omit<NewsItem, 'excerpt'>[]
): Promise<NewsItem[]> {
  if (!items.length) return [];

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `Dla każdego poniższego tytułu artykułu o AI/technologii napisz krótkie polskie streszczenie (2-3 zdania). Odpowiedz w formacie JSON: {"items": [{"id": "...", "excerpt": "..."}]}

Tytuły:
${items.map(i => `{"id": "${i.id}", "title": ${JSON.stringify(i.title)}}`).join('\n')}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 2000,
    });

    const parsed = JSON.parse(response.choices[0].message.content ?? '{}');
    const summaries: { id: string; excerpt: string }[] = parsed.items ?? [];

    return items.map(item => ({
      ...item,
      excerpt: summaries.find(s => s.id === item.id)?.excerpt ?? item.title,
    }));
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

  const withSummaries = await summarizeWithOpenAI(unique);
  newsCache.set(CACHE_KEY, { data: withSummaries, timestamp: Date.now() });
  return withSummaries;
}
```

- [ ] **Krok 2: Sprawdź TypeScript**

```bash
npx tsc --noEmit
```

Oczekiwane: zero błędów.

- [ ] **Krok 3: Commit**

```bash
git add src/lib/newsCache.ts
git commit -m "feat(blog): add news cache with HN/DevTo/Guardian/Arxiv + OpenAI summarizer"
```

---

## Task 4: Utwórz `src/app/api/news/route.ts`

**Files:**
- Create: `src/app/api/news/route.ts`

- [ ] **Krok 1: Utwórz plik**

```typescript
// src/app/api/news/route.ts
import { NextResponse } from 'next/server';
import { getNewsWithCache } from '@/lib/newsCache';

export async function GET() {
  try {
    const news = await getNewsWithCache();
    return NextResponse.json(news);
  } catch (err) {
    console.error('[/api/news] error:', err);
    return NextResponse.json([], { status: 200 }); // graceful degradation
  }
}
```

- [ ] **Krok 2: Sprawdź TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Krok 3: Zweryfikuj endpoint ręcznie**

Uruchom `npm run dev` i otwórz `http://localhost:3000/api/news`. Powinieneś zobaczyć tablicę JSON z newsami (lub `[]` jeśli klucze API nie są ustawione).

- [ ] **Krok 4: Commit**

```bash
git add src/app/api/news/route.ts
git commit -m "feat(blog): add /api/news route with cache"
```

---

## Task 5: Utwórz `src/components/NewsSection.tsx`

**Files:**
- Create: `src/components/NewsSection.tsx`

- [ ] **Krok 1: Utwórz plik**

```typescript
// src/components/NewsSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, TrendingUp, Code, Globe, BookOpen } from 'lucide-react';
import FadeIn from '@/components/react-bits/FadeIn';
import type { NewsItem } from '@/lib/newsCache';

const SOURCE_META = {
  HackerNews: { label: 'HackerNews', Icon: TrendingUp, color: '#FF6600' },
  DevTo:       { label: 'Dev.to',     Icon: Code,        color: '#7B9BDB' },
  Guardian:    { label: 'Guardian',   Icon: Globe,       color: '#4F6AE8' },
  Arxiv:       { label: 'Arxiv',      Icon: BookOpen,    color: '#059669' },
} as const;

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then((data: NewsItem[]) => { setNews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 border-t border-[#1A2461]">
        <div className="max-w-[1600px] mx-auto px-6 flex justify-center">
          <div className="w-8 h-8 border-2 border-[#7B9BDB] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (!news.length) return null;

  return (
    <section className="py-16 border-t border-[#1A2461]">
      <div className="max-w-[1600px] mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1A2461] rounded-full border border-[#2E4AAD]">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[#D6E4FF] text-sm font-semibold tracking-wide">LIVE</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Aktualności AI ze świata</h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {news.slice(0, 8).map((item, index) => {
            const meta = SOURCE_META[item.source];
            const Icon = meta.Icon;
            return (
              <FadeIn key={item.id} delay={index * 0.05}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full p-6 rounded-2xl bg-[#1A2461]/50 border border-[#2E4AAD]/40 hover:border-[#4F6AE8] hover:bg-[#1A2461] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${meta.color}20`,
                        color: meta.color,
                        border: `1px solid ${meta.color}40`,
                      }}
                    >
                      <Icon className="w-3 h-3" />
                      {meta.label}
                    </span>
                    <ExternalLink className="w-4 h-4 text-[#7B9BDB] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-sm font-bold text-white mb-3 line-clamp-2 group-hover:text-[#D6E4FF] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#7B9BDB] leading-relaxed line-clamp-4 flex-1">
                    {item.excerpt}
                  </p>

                  <p className="text-xs text-[#2E4AAD] mt-3 pt-3 border-t border-[#2E4AAD]/30">
                    {new Date(item.publishedAt).toLocaleDateString('pl-PL', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </p>
                </a>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Krok 2: Sprawdź TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Krok 3: Commit**

```bash
git add src/components/NewsSection.tsx
git commit -m "feat(blog): add NewsSection component with live AI news feed"
```

---

## Task 6: Utwórz `src/components/blog/BlogContent.tsx`

Client component obsługujący całą interaktywną część bloga: hero featured post, filtry, grid artykułów, sidebar. Ciemny styl pasujący do reszty strony.

**Files:**
- Create: `src/components/blog/BlogContent.tsx`

- [ ] **Krok 1: Stwórz katalog i plik**

```bash
mkdir -p "src/components/blog"
```

```typescript
// src/components/blog/BlogContent.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowRight, Eye, Heart, Search, Tag, TrendingUp, Mail,
  Linkedin, Twitter, Youtube,
} from 'lucide-react';
import FadeIn from '@/components/react-bits/FadeIn';
import Particles from '@/components/react-bits/Particles';
import type { BlogPost } from '@/lib/notion';

const CATEGORIES = ['Wszystkie', 'OpenCLAW', 'AI', 'AI Agents', 'Technologie', 'Bezpieczeństwo'];

const CATEGORY_COLORS: Record<string, string> = {
  OpenCLAW:      'from-purple-600 to-indigo-600',
  AI:            'from-blue-600 to-cyan-600',
  'AI Agents':   'from-green-600 to-emerald-600',
  Technologie:   'from-[#2E4AAD] to-[#7B9BDB]',
  Bezpieczeństwo:'from-red-600 to-rose-600',
};

interface Props {
  posts: BlogPost[];
}

export default function BlogContent({ posts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = posts.find(p => p.featured) ?? posts[0] ?? null;
  const popularPosts = [...posts].sort((a, b) => 0).slice(0, 3); // sorted by date (Notion returns newest first)

  const filteredPosts = posts.filter(post => {
    if (post === featuredPost) return false;
    const matchesCategory = selectedCategory === 'Wszystkie' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Featured Post Hero */}
      {featuredPost && (
        <section className="pt-24 pb-16 relative min-h-[85vh] flex items-center overflow-hidden bg-[#0B0F2E]">
          <div className="absolute inset-0 z-0">
            <Particles quantity={40} color="#7B9BDB" speed={0.4} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F2E] via-[#1A2461]/80 to-[#0B0F2E] z-[1]" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/90 text-sm font-medium">Najnowszy artykuł</span>
                  </div>

                  <span className={`inline-block px-5 py-2 bg-gradient-to-r ${CATEGORY_COLORS[featuredPost.category] ?? 'from-[#2E4AAD] to-[#7B9BDB]'} text-white text-sm font-bold rounded-full`}>
                    {featuredPost.category}
                  </span>

                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    {featuredPost.title}
                  </h1>

                  <p className="text-xl text-white/80 leading-relaxed max-w-xl">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-6 text-white/70 pt-4">
                    <span className="font-medium text-white">{featuredPost.author}</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date
                        ? new Date(featuredPost.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })
                        : ''}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <div className="pt-4">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:scale-105 transition-transform shadow-xl"
                    >
                      Czytaj artykuł <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                {featuredPost.coverImage ? (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30" />
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#1A2461] to-[#2E4AAD] flex items-center justify-center">
                    <span className="text-[#7B9BDB] text-6xl font-bold opacity-30">AI</span>
                  </div>
                )}
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* Search & Categories */}
      <section className="py-8 bg-[#0B0F2E] border-y border-[#1A2461]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7B9BDB]" />
              <input
                type="text"
                placeholder="Szukaj artykułów..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#1A2461]/50 border border-[#2E4AAD]/40 text-white placeholder-[#7B9BDB] focus:border-[#4F6AE8] focus:ring-1 focus:ring-[#4F6AE8] outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#2E4AAD] text-white shadow-lg shadow-[#2E4AAD]/30'
                      : 'bg-[#1A2461]/50 text-[#D6E4FF] border border-[#2E4AAD]/40 hover:bg-[#1A2461] hover:border-[#4F6AE8]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 pb-20 bg-[#0B0F2E]">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col xl:flex-row gap-12">
            {/* Posts Grid */}
            <div className="xl:w-3/4">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
                <Tag className="w-7 h-7 text-[#7B9BDB]" />
                {selectedCategory === 'Wszystkie' ? 'Wszystkie artykuły' : selectedCategory}
                <span className="text-base font-normal text-[#7B9BDB]">({filteredPosts.length})</span>
              </h2>

              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredPosts.map((post, index) => (
                    <FadeIn key={post.id} delay={index * 0.1}>
                      <article className="group flex flex-col h-full rounded-2xl overflow-hidden border border-[#2E4AAD]/40 bg-[#1A2461]/30 hover:border-[#4F6AE8] hover:bg-[#1A2461]/60 transition-all duration-300">
                        <div className="relative h-56 flex-shrink-0 overflow-hidden">
                          {post.coverImage ? (
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#2E4AAD] to-[#1A2461] flex items-center justify-center">
                              <span className="text-[#7B9BDB] text-4xl font-bold opacity-30">AI</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F2E]/80 via-transparent to-transparent" />
                          <span className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${CATEGORY_COLORS[post.category] ?? 'from-[#2E4AAD] to-[#7B9BDB]'} text-white text-xs font-semibold rounded-full`}>
                            {post.category}
                          </span>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-lg font-bold mb-3 text-white line-clamp-2 group-hover:text-[#D6E4FF] transition-colors">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>
                          <p className="text-sm text-[#7B9BDB] mb-4 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-[#2E4AAD] border-t border-[#2E4AAD]/30 pt-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {post.date ? new Date(post.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' }) : ''}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </article>
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-[#1A2461]/20 rounded-2xl border border-[#2E4AAD]/30">
                  <p className="text-[#7B9BDB] text-lg">Nie znaleziono artykułów spełniających kryteria.</p>
                  <button
                    onClick={() => { setSelectedCategory('Wszystkie'); setSearchQuery(''); }}
                    className="mt-4 text-[#4F6AE8] font-medium hover:underline"
                  >
                    Wyczyść filtry
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="xl:w-1/4 space-y-8">
              {/* Popular Posts */}
              <div className="bg-[#1A2461]/40 rounded-2xl p-6 border border-[#2E4AAD]/40">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2E4AAD]/30">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E4AAD] to-[#4F6AE8] flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Popularne</h3>
                    <p className="text-xs text-[#7B9BDB]">Najczęściej czytane</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {popularPosts.map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-4 group">
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#2E4AAD]/30">
                        {post.coverImage && (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-[#D6E4FF] group-hover:text-white transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-[#7B9BDB] mt-1">{post.author}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-[#1A2461]/40 rounded-2xl p-8 border border-[#2E4AAD]/40 text-white">
                <div className="w-12 h-12 rounded-xl bg-[#2E4AAD]/40 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#7B9BDB]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Newsletter</h3>
                <p className="text-[#7B9BDB] text-sm mb-6">Bądź na bieżąco z nowinkami AI. Zero spamu.</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Twój adres email"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F2E]/60 border border-[#2E4AAD]/40 text-white placeholder-[#7B9BDB] focus:outline-none focus:border-[#4F6AE8] transition-colors"
                  />
                  <button className="w-full py-3 bg-[#2E4AAD] hover:bg-[#4F6AE8] text-white font-bold rounded-xl transition-colors">
                    Zapisz się
                  </button>
                </div>
              </div>

              {/* Social Follow */}
              <div className="bg-[#1A2461]/40 rounded-2xl p-8 border border-[#2E4AAD]/40 text-white text-center">
                <h3 className="font-bold mb-2">Obserwuj nas</h3>
                <p className="text-[#7B9BDB] text-sm mb-6">Dołącz do społeczności AI</p>
                <div className="flex justify-center gap-4">
                  {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-12 h-12 rounded-full bg-[#0B0F2E]/60 border border-[#2E4AAD]/40 flex items-center justify-center hover:border-[#4F6AE8] hover:bg-[#2E4AAD]/20 transition-all"
                    >
                      <Icon className="w-5 h-5 text-[#7B9BDB]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Krok 2: Sprawdź TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Krok 3: Commit**

```bash
git add src/components/blog/BlogContent.tsx
git commit -m "feat(blog): add BlogContent client component with dark style"
```

---

## Task 7: Refaktoryzuj `src/app/blog/page.tsx` → Server Component z ISR

Zastąp cały plik. Usuwa własną nawigację, białe tło, statyczne dane. Staje się server component z ISR 60 min.

**Files:**
- Modify: `src/app/blog/page.tsx`

- [ ] **Krok 1: Zastąp plik**

```typescript
// src/app/blog/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';
import { fetchPublishedPosts } from '@/lib/notion';
import BlogContent from '@/components/blog/BlogContent';
import NewsSection from '@/components/NewsSection';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog | Infinity Tech',
  description: 'Artykuły o AI, automatyzacji procesów, OpenCLAW i najnowszych trendach technologicznych.',
  openGraph: {
    title: 'Blog | Infinity Tech',
    description: 'Artykuły o AI, automatyzacji i OpenCLAW.',
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = await fetchPublishedPosts();

  return (
    <div className="min-h-screen bg-[#0B0F2E]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F2E]/90 backdrop-blur-lg border-b border-[#1A2461]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Infinity Tech" width={42} height={42} className="object-contain" />
            <span className="text-xl md:text-2xl font-bold text-white">INFINITY TECH</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-[#7B9BDB] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Powrót</span>
          </Link>
        </div>
      </nav>

      {/* Blog Content (hero + filtry + grid + sidebar) */}
      <BlogContent posts={posts} />

      {/* News Feed */}
      <NewsSection />

      {/* Footer */}
      <footer className="py-16 bg-[#050B1F] border-t border-[#1A2461] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold text-[#D6E4FF] mb-4">Infinity Tech</div>
              <p className="text-[#7B9BDB] mb-6">Tworzymy przyszłość biznesu z AI.</p>
              <div className="flex gap-4">
                {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#1A2461] border border-[#2E4AAD]/40 flex items-center justify-center hover:border-[#4F6AE8] hover:bg-[#2E4AAD]/20 transition-all">
                    <Icon className="w-5 h-5 text-[#7B9BDB]" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Na skróty</h4>
              <ul className="space-y-2 text-[#7B9BDB]">
                <li><Link href="/" className="hover:text-white transition-colors">Start</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Usługi</h4>
              <ul className="space-y-2 text-[#7B9BDB]">
                <li><Link href="/agents" className="hover:text-white transition-colors">AI Agenci</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Automatyzacja</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consulting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Kontakt</h4>
              <ul className="space-y-2 text-[#7B9BDB]">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> contact@infinityteam.io</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +48 123 456 789</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Warszawa, Polska</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#1A2461] pt-8 text-center text-[#7B9BDB]">
            <p>&copy; {new Date().getFullYear()} Infinity Tech.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Krok 2: Sprawdź TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Krok 3: Otwórz `http://localhost:3000/blog` i zweryfikuj**

Sprawdź:
- [x] Ciemne tło `#0B0F2E` na całej stronie
- [x] Dark nav u góry (logo + "Powrót")
- [x] Hero featured post (jeśli masz artykuły w Notion) lub pusty grid
- [x] Ciemne karty artykułów z niebieskim borderem
- [x] Ciemny pasek kategorii
- [x] Ciemny sidebar
- [x] Sekcja "Aktualności AI ze świata" na dole (może chwilę ładować)

- [ ] **Krok 4: Commit**

```bash
git add src/app/blog/page.tsx
git commit -m "feat(blog): refactor blog page to server component with ISR and dark style"
```

---

## Task 8: Utwórz `src/app/blog/[slug]/page.tsx`

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Krok 1: Stwórz katalog i plik**

```bash
mkdir -p "src/app/blog/[slug]"
```

```typescript
// src/app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { fetchPostBySlug, fetchPostContent } from '@/lib/notion';

export const revalidate = 3600;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug);
  if (!post) return { title: 'Artykuł nie znaleziony | Infinity Tech' };
  return {
    title: `${post.title} | Infinity Tech Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) notFound();

  const content = await fetchPostContent(post.id);

  return (
    <div className="min-h-screen bg-[#0B0F2E]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F2E]/90 backdrop-blur-lg border-b border-[#1A2461]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Infinity Tech" width={42} height={42} className="object-contain" />
            <span className="text-xl font-bold text-white">INFINITY TECH</span>
          </Link>
          <Link href="/blog" className="flex items-center gap-2 text-[#7B9BDB] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Blog</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2461]/30 to-[#0B0F2E]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <span className="px-4 py-1.5 bg-[#2E4AAD]/40 text-[#D6E4FF] text-sm font-semibold rounded-full border border-[#2E4AAD]/60">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-[#7B9BDB] mb-8">{post.excerpt}</p>
          <div className="flex items-center gap-6 text-[#7B9BDB] text-sm">
            <span className="text-white font-medium">{post.author}</span>
            {post.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-[#D6E4FF]/80 prose-a:text-[#4F6AE8] prose-strong:text-white prose-code:text-[#7B9BDB] prose-pre:bg-[#1A2461]/60 prose-pre:border prose-pre:border-[#2E4AAD]/40 prose-blockquote:border-l-[#2E4AAD] prose-blockquote:text-[#7B9BDB]">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1A2461]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#7B9BDB] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Wróć do bloga
          </Link>
        </div>
      </article>
    </div>
  );
}
```

- [ ] **Krok 2: Sprawdź TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Krok 3: Zweryfikuj**

Odwiedź `http://localhost:3000/blog/<slug>` dla artykułu z Notion. Sprawdź:
- Ciemne tło i nawigacja
- Tytuł, kategoria, autor, data widoczne
- Treść artykułu (markdown) renderowana poprawnie
- Link powrotu do bloga

- [ ] **Krok 4: Commit**

```bash
git add "src/app/blog/[slug]/page.tsx"
git commit -m "feat(blog): add individual article page with Notion content rendering"
```

---

## Task 9: Dodaj "Blog" do nawigacji głównej

**Files:**
- Modify: `src/app/page.tsx` (linia ~1426)

- [ ] **Krok 1: Znajdź i edytuj menuItems**

W `src/app/page.tsx` znajdź tablicę `menuItems` (około linii 1426) i dodaj wpis Blog:

```typescript
// PRZED:
const menuItems: { label: string; ariaLabel: string; link: string }[] = [
  { label: 'Start', ariaLabel: 'Przejdź do sekcji start', link: '#start' },
  { label: 'Usługi', ariaLabel: 'Zobacz nasze usługi', link: '#uslugi' },
  { label: 'O nas', ariaLabel: 'Dowiedz się więcej o nas', link: '#o-nas' },
  { label: 'Kalkulator ROI', ariaLabel: 'Oblicz ROI automatyzacji', link: '/kalkulator' },
  { label: 'Kontakt', ariaLabel: 'Skontaktuj się z nami', link: '#kontakt' },
  { label: 'FAQ', ariaLabel: 'Częste pytania', link: '#faq' }
];

// PO (dodaj Blog przed Kontaktem):
const menuItems: { label: string; ariaLabel: string; link: string }[] = [
  { label: 'Start', ariaLabel: 'Przejdź do sekcji start', link: '#start' },
  { label: 'Usługi', ariaLabel: 'Zobacz nasze usługi', link: '#uslugi' },
  { label: 'O nas', ariaLabel: 'Dowiedz się więcej o nas', link: '#o-nas' },
  { label: 'Kalkulator ROI', ariaLabel: 'Oblicz ROI automatyzacji', link: '/kalkulator' },
  { label: 'Blog', ariaLabel: 'Przejdź do bloga', link: '/blog' },
  { label: 'Kontakt', ariaLabel: 'Skontaktuj się z nami', link: '#kontakt' },
  { label: 'FAQ', ariaLabel: 'Częste pytania', link: '#faq' }
];
```

- [ ] **Krok 2: Sprawdź TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Krok 3: Zweryfikuj**

Otwórz `http://localhost:3000`, kliknij hamburger menu — "Blog" powinno być widoczne w menu i klikalne.

- [ ] **Krok 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(blog): add Blog link to main navigation menu"
```

---

## Kryteria akceptacji (po zakończeniu wszystkich zadań)

- [ ] `http://localhost:3000/blog` — ciemna strona, artykuły z Notion (lub pusty grid jeśli brak)
- [ ] `http://localhost:3000/blog/<slug>` — strona artykułu z treścią
- [ ] `http://localhost:3000/api/news` — JSON z newsami (lub `[]` przy braku kluczy)
- [ ] Sekcja "Aktualności AI ze świata" widoczna na dole `/blog` z polskimi streszczeniami
- [ ] Hamburger menu na stronie głównej zawiera "Blog"
- [ ] Styl bloga: ciemne tło, dark nav, ciemne karty — spójny z resztą strony
- [ ] Artykuł dodany w Notion pojawia się po max 60 min bez deployowania
