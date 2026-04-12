# Świat AI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zamienić sekcję "Blog" na automatyczną stronę newsów AI "/swiat-ai" z hero rotacją, filtrami źródeł, wyszukiwarką, gridem 12 kart + "pokaż więcej" i sidebarem.

**Architecture:** Server Component `swiat-ai/page.tsx` z ISR renderuje shell (nav, metadata, footer). Client Component `AiNewsPage.tsx` fetchuje `/api/news`, obsługuje hero rotację, filtry, search, grid z "pokaż więcej" i sidebar. Pipeline newsów (`newsCache.ts`) i endpoint (`/api/news`) bez zmian.

**Tech Stack:** Next.js 14 App Router, Tailwind CSS, lucide-react, istniejące komponenty react-bits (FadeIn, Particles)

---

## File Map

| Plik | Akcja | Odpowiedzialność |
|---|---|---|
| `src/components/AiNewsPage.tsx` | CREATE | Client component: hero z rotacją, search, filtry, grid 12 kart + "pokaż więcej", sidebar (popularne, newsletter, obserwuj nas) |
| `src/app/swiat-ai/page.tsx` | CREATE | Server Component z ISR, metadata SEO, nav, footer, import AiNewsPage |
| `src/app/page.tsx` | EDIT | menuItems: "Blog" → "Świat AI", footer: "Blog" → "Świat AI" |
| `src/app/blog/page.tsx` | DELETE | Zastąpiony przez /swiat-ai |
| `src/app/blog/[slug]/page.tsx` | DELETE | Nie potrzebny |
| `src/components/blog/BlogContent.tsx` | DELETE | Zastąpiony przez AiNewsPage |
| `src/components/NewsSection.tsx` | DELETE | Wchłonięty do AiNewsPage |
| `src/lib/notion.ts` | DELETE | Brak integracji Notion |
| `package.json` | EDIT | Usunięcie nieużywanych zależności |

---

## Task 1: Usuń stare pliki blogowe i zależności

**Files:**
- Delete: `src/app/blog/page.tsx`
- Delete: `src/app/blog/[slug]/page.tsx`
- Delete: `src/components/blog/BlogContent.tsx`
- Delete: `src/components/NewsSection.tsx`
- Delete: `src/lib/notion.ts`
- Modify: `package.json`

- [ ] **Krok 1: Usuń pliki**

```bash
cd "C:/Users/nadru/OneDrive/Dokumenty/Infinity Org/infinity-landing"
rm -rf src/app/blog
rm src/components/blog/BlogContent.tsx
rmdir src/components/blog
rm src/components/NewsSection.tsx
rm src/lib/notion.ts
```

- [ ] **Krok 2: Odinstaluj nieużywane zależności**

```bash
npm uninstall @notionhq/client notion-to-md react-markdown
```

Uwaga: `@tailwindcss/typography` zostawiamy — jest devDependency i nie szkodzi, a może się przydać w przyszłości.

- [ ] **Krok 3: Sprawdź TypeScript**

```bash
npx tsc --noEmit
```

Oczekiwane: błędy w `src/app/page.tsx` (referencja do "Blog" w menu — naprawimy w Task 4). Brak błędów w pozostałych plikach.

- [ ] **Krok 4: Commit**

```bash
git add -A
git commit -m "chore: remove blog files, Notion integration and unused dependencies"
```

---

## Task 2: Utwórz `src/components/AiNewsPage.tsx`

Client component obsługujący całą interaktywną część strony: hero z auto-rotacją, wyszukiwarka, filtry źródeł, grid 12 kart + "pokaż więcej", sidebar.

**Files:**
- Create: `src/components/AiNewsPage.tsx`

- [ ] **Krok 1: Utwórz plik**

```typescript
// src/components/AiNewsPage.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ExternalLink, TrendingUp, Code, Globe, BookOpen,
  Search, Tag, Mail, Linkedin, Twitter, Youtube,
  ChevronDown,
} from 'lucide-react';
import FadeIn from '@/components/react-bits/FadeIn';
import type { NewsItem } from '@/lib/newsCache';

const SOURCE_META = {
  HackerNews: { label: 'HackerNews', Icon: TrendingUp, color: '#FF6600' },
  DevTo:       { label: 'Dev.to',     Icon: Code,        color: '#7B9BDB' },
  Guardian:    { label: 'Guardian',   Icon: Globe,       color: '#4F6AE8' },
  Arxiv:       { label: 'Arxiv',      Icon: BookOpen,    color: '#059669' },
} as const;

type SourceFilter = 'Wszystkie' | 'HackerNews' | 'DevTo' | 'Guardian' | 'Arxiv';
const FILTERS: SourceFilter[] = ['Wszystkie', 'HackerNews', 'DevTo', 'Guardian', 'Arxiv'];

const INITIAL_COUNT = 12;
const HERO_INTERVAL_MS = 8000;

export default function AiNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<SourceFilter>('Wszystkie');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  // Fetch news
  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then((data: NewsItem[]) => { setNews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Hero auto-rotation
  useEffect(() => {
    if (news.length < 2) return;
    const timer = setInterval(() => {
      setHeroIndex(prev => {
        const max = Math.min(news.length, 5);
        return (prev + 1) % max;
      });
    }, HERO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [news]);

  // Filter + search
  const filtered = news.filter(item => {
    const matchesSource = activeFilter === 'Wszystkie' || item.source === activeFilter;
    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSource && matchesSearch;
  });

  const heroItem = news[heroIndex] ?? news[0];
  const gridItems = filtered.filter(item => item !== heroItem);
  const visibleItems = showAll ? gridItems : gridItems.slice(0, INITIAL_COUNT);
  const hasMore = gridItems.length > INITIAL_COUNT && !showAll;

  // Top 3 for sidebar (first 3 from HackerNews — community-ranked)
  const popularItems = news.filter(n => n.source === 'HackerNews').slice(0, 3);

  // Newsletter submit
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const handleNewsletter = useCallback(async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return;
    setEmailStatus('sending');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'swiat-ai-newsletter' }),
      });
      setEmailStatus(res.ok ? 'sent' : 'error');
    } catch { setEmailStatus('error'); }
  }, [email]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-[#7B9BDB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[#7B9BDB] text-lg">Brak newsów do wyświetlenia. Spróbuj ponownie później.</p>
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <div className="text-center pt-28 pb-6 px-6">
        <div className="inline-flex items-center gap-2 bg-[#1A2461]/80 px-4 py-1.5 rounded-full border border-[#2E4AAD] mb-4">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_6px_#4ade80]" />
          <span className="text-[#D6E4FF] text-sm font-semibold tracking-wide">LIVE</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">Świat AI</h1>
        <p className="text-[#7B9BDB] text-base md:text-lg mb-4">Najnowsze wiadomości ze świata sztucznej inteligencji</p>
        <div className="flex justify-center gap-4 flex-wrap text-xs">
          {Object.entries(SOURCE_META).map(([key, meta]) => (
            <span key={key} style={{ color: meta.color }} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color }} />
              {meta.label}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      {heroItem && (
        <FadeIn>
          <section className="px-6 pb-8 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              {/* Big hero card */}
              <a
                href={heroItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-[2] bg-gradient-to-br from-[#1A2461]/90 to-[#2E4AAD]/60 p-8 rounded-2xl border border-[#4F6AE8]/40 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#4F6AE8]/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: `${SOURCE_META[heroItem.source].color}20`,
                        color: SOURCE_META[heroItem.source].color,
                        border: `1px solid ${SOURCE_META[heroItem.source].color}40`,
                      }}
                    >
                      {React.createElement(SOURCE_META[heroItem.source].Icon, { className: 'w-3 h-3' })}
                      {SOURCE_META[heroItem.source].label}
                    </span>
                    <span className="text-[#4F6AE8] text-xs">
                      {new Date(heroItem.publishedAt).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4 group-hover:text-[#D6E4FF] transition-colors">
                    {heroItem.title}
                  </h2>
                  <p className="text-[#B8C9E8] text-base leading-relaxed mb-6 max-w-2xl">
                    {heroItem.excerpt}
                  </p>
                  <span className="text-[#4F6AE8] text-sm font-medium group-hover:text-white transition-colors">
                    Czytaj oryginał →
                  </span>
                </div>
                {/* Rotation dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {Array.from({ length: Math.min(news.length, 5) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.preventDefault(); setHeroIndex(i); }}
                      className={`h-1 rounded-full transition-all ${i === heroIndex ? 'w-5 bg-[#4F6AE8]' : 'w-2 bg-[#2E4AAD]'}`}
                    />
                  ))}
                </div>
              </a>

              {/* 2 smaller cards */}
              <div className="flex-1 flex flex-col gap-4">
                {news.slice(1, 3).filter(n => n !== heroItem).concat(news.slice(3)).slice(0, 2).map(item => {
                  const meta = SOURCE_META[item.source];
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#1A2461]/60 p-5 rounded-xl border border-[#2E4AAD]/40 hover:border-[#4F6AE8] hover:bg-[#1A2461] transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: `${meta.color}20`, color: meta.color, border: `1px solid ${meta.color}30` }}
                          >
                            {meta.label}
                          </span>
                          <span className="text-[#2E4AAD] text-[10px]">
                            {new Date(item.publishedAt).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-[#D6E4FF] transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#7B9BDB] leading-relaxed line-clamp-3">{item.excerpt}</p>
                      </div>
                      <span className="text-[#4F6AE8] text-xs mt-3 group-hover:text-white transition-colors">Czytaj →</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* SEARCH + FILTERS */}
      <div className="border-y border-[#1A2461] py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B9BDB]" />
            <input
              type="text"
              placeholder="Szukaj newsów..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A2461]/50 border border-[#2E4AAD]/40 text-white text-sm placeholder-[#7B9BDB] focus:border-[#4F6AE8] focus:ring-1 focus:ring-[#4F6AE8] outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap overflow-x-auto">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-[#2E4AAD] text-white shadow-lg shadow-[#2E4AAD]/30'
                    : 'bg-[#1A2461]/50 border border-[#2E4AAD]/40 hover:bg-[#1A2461] hover:border-[#4F6AE8]'
                }`}
                style={activeFilter === filter ? {} : { color: filter === 'Wszystkie' ? '#D6E4FF' : SOURCE_META[filter]?.color ?? '#D6E4FF' }}
              >
                {filter === 'Wszystkie' ? 'Wszystkie' : SOURCE_META[filter]?.label ?? filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT: Grid + Sidebar */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-10">

          {/* Grid */}
          <div className="xl:w-3/4">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
              <Tag className="w-6 h-6 text-[#7B9BDB]" />
              {activeFilter === 'Wszystkie' ? 'Wszystkie newsy' : SOURCE_META[activeFilter]?.label ?? activeFilter}
              <span className="text-sm font-normal text-[#7B9BDB]">({filtered.length})</span>
            </h2>

            {visibleItems.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {visibleItems.map((item, index) => {
                    const meta = SOURCE_META[item.source];
                    const Icon = meta.Icon;
                    return (
                      <FadeIn key={item.id} delay={index * 0.03}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col h-full p-5 rounded-xl bg-[#1A2461]/40 border border-[#2E4AAD]/30 hover:border-[#4F6AE8] hover:bg-[#1A2461]/70 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: `${meta.color}20`, color: meta.color, border: `1px solid ${meta.color}30` }}
                            >
                              <Icon className="w-3 h-3" />
                              {meta.label}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#7B9BDB] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-[#D6E4FF] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#7B9BDB] leading-relaxed line-clamp-4 flex-1">
                            {item.excerpt}
                          </p>
                          <p className="text-[10px] text-[#2E4AAD] mt-3 pt-3 border-t border-[#2E4AAD]/25">
                            {new Date(item.publishedAt).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </a>
                      </FadeIn>
                    );
                  })}
                </div>

                {hasMore && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setShowAll(true)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2E4AAD] to-[#4F6AE8] text-white px-8 py-3 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-[#2E4AAD]/40 transition-all"
                    >
                      Pokaż więcej newsów <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-[#1A2461]/20 rounded-2xl border border-[#2E4AAD]/30">
                <p className="text-[#7B9BDB] text-lg">Nie znaleziono newsów spełniających kryteria.</p>
                <button
                  onClick={() => { setActiveFilter('Wszystkie'); setSearchQuery(''); }}
                  className="mt-4 text-[#4F6AE8] font-medium hover:underline"
                >
                  Wyczyść filtry
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="xl:w-1/4 space-y-6">

            {/* Popularne */}
            <div className="bg-[#1A2461]/40 rounded-xl p-5 border border-[#2E4AAD]/30">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#2E4AAD]/25">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2E4AAD] to-[#4F6AE8] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Popularne</h3>
                  <p className="text-[10px] text-[#7B9BDB]">Najczęściej klikane</p>
                </div>
              </div>
              <div className="space-y-4">
                {popularItems.map(item => (
                  <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="flex gap-3 group">
                    <div className="w-16 h-12 rounded-lg bg-[#2E4AAD]/20 border border-[#2E4AAD]/30 flex items-center justify-center flex-shrink-0">
                      {React.createElement(SOURCE_META[item.source].Icon, { className: 'w-4 h-4', style: { color: SOURCE_META[item.source].color } })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs text-[#D6E4FF] group-hover:text-white transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#7B9BDB] mt-1">{SOURCE_META[item.source].label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#1A2461]/40 rounded-xl p-6 border border-[#2E4AAD]/30 text-white">
              <div className="w-10 h-10 rounded-lg bg-[#2E4AAD]/40 flex items-center justify-center mb-3">
                <Mail className="w-5 h-5 text-[#7B9BDB]" />
              </div>
              <h3 className="text-lg font-bold mb-1">Newsletter</h3>
              <p className="text-[#7B9BDB] text-xs mb-5">Bądź na bieżąco z nowinkami AI. Zero spamu.</p>
              {emailStatus === 'sent' ? (
                <p className="text-green-400 text-sm font-medium">Zapisano! Sprawdź email.</p>
              ) : (
                <div className="space-y-2.5">
                  <input
                    type="email"
                    placeholder="Twój adres email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F2E]/60 border border-[#2E4AAD]/40 text-white text-sm placeholder-[#7B9BDB] focus:outline-none focus:border-[#4F6AE8] transition-colors"
                  />
                  <button
                    onClick={handleNewsletter}
                    disabled={emailStatus === 'sending'}
                    className="w-full py-2.5 bg-[#2E4AAD] hover:bg-[#4F6AE8] disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    {emailStatus === 'sending' ? 'Wysyłanie...' : 'Zapisz się'}
                  </button>
                  {emailStatus === 'error' && <p className="text-red-400 text-xs">Błąd. Spróbuj ponownie.</p>}
                </div>
              )}
            </div>

            {/* Obserwuj nas */}
            <div className="bg-[#1A2461]/40 rounded-xl p-6 border border-[#2E4AAD]/30 text-white text-center">
              <h3 className="font-bold text-sm mb-1">Obserwuj nas</h3>
              <p className="text-[#7B9BDB] text-xs mb-4">Dołącz do społeczności AI</p>
              <div className="flex justify-center gap-3">
                {[
                  { Icon: Linkedin, href: '#' },
                  { Icon: Twitter, href: '#' },
                  { Icon: Youtube, href: '#' },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-10 h-10 rounded-full bg-[#0B0F2E]/60 border border-[#2E4AAD]/40 flex items-center justify-center hover:border-[#4F6AE8] hover:bg-[#2E4AAD]/20 transition-all"
                  >
                    <Icon className="w-4 h-4 text-[#7B9BDB]" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
```

Uwaga: ten plik importuje `React` z `createElement` — dodaj import na górze:

```typescript
import React from 'react';
```

Dodaj go jako pierwszą linię po `'use client';`.

- [ ] **Krok 2: Sprawdź TypeScript**

```bash
npx tsc --noEmit
```

Oczekiwane: zero błędów w tym pliku (mogą być w page.tsx z powodu starego "Blog").

- [ ] **Krok 3: Commit**

```bash
git add src/components/AiNewsPage.tsx
git commit -m "feat(swiat-ai): add AiNewsPage client component with hero rotation, filters, grid and sidebar"
```

---

## Task 3: Utwórz `src/app/swiat-ai/page.tsx`

Server component z ISR, SEO metadata, nawigacją i footerem.

**Files:**
- Create: `src/app/swiat-ai/page.tsx`

- [ ] **Krok 1: Utwórz katalog i plik**

```bash
mkdir -p "src/app/swiat-ai"
```

```typescript
// src/app/swiat-ai/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';
import AiNewsPage from '@/components/AiNewsPage';

export const revalidate = 7200; // 2h — synced z news cache TTL

export const metadata: Metadata = {
  title: 'Świat AI | Infinity Tech',
  description: 'Najnowsze wiadomości ze świata sztucznej inteligencji. Automatyczny feed z HackerNews, Dev.to, The Guardian i Arxiv.',
  openGraph: {
    title: 'Świat AI | Infinity Tech',
    description: 'Najnowsze wiadomości ze świata AI — automatycznie, po polsku.',
    type: 'website',
  },
};

export default function SwiatAiPage() {
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

      {/* AI News Content */}
      <AiNewsPage />

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
                <li><Link href="/swiat-ai" className="hover:text-white transition-colors">Świat AI</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Usługi</h4>
              <ul className="space-y-2 text-[#7B9BDB]">
                <li><a href="#" className="hover:text-white transition-colors">AI Agenci</a></li>
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

Oczekiwane: zero błędów.

- [ ] **Krok 3: Commit**

```bash
git add src/app/swiat-ai/page.tsx
git commit -m "feat(swiat-ai): add server component page with ISR, SEO metadata, nav and footer"
```

---

## Task 4: Zaktualizuj nawigację na stronie głównej

**Files:**
- Modify: `src/app/page.tsx` (linie ~1426-1434 i ~1348)

- [ ] **Krok 1: Zmień menuItems**

W `src/app/page.tsx` znajdź (linia ~1431):

```typescript
    { label: 'Blog', ariaLabel: 'Przejdź do bloga', link: '/blog' },
```

Zamień na:

```typescript
    { label: 'Świat AI', ariaLabel: 'Przejdź do newsów AI', link: '/swiat-ai' },
```

- [ ] **Krok 2: Zmień footer**

W `src/app/page.tsx` znajdź (linia ~1348):

```html
<a href="/blog" className="hover:text-white transition-colors text-sm">Blog</a>
```

Zamień na:

```html
<a href="/swiat-ai" className="hover:text-white transition-colors text-sm">Świat AI</a>
```

- [ ] **Krok 3: Sprawdź TypeScript**

```bash
npx tsc --noEmit
```

Oczekiwane: zero błędów.

- [ ] **Krok 4: Zweryfikuj w przeglądarce**

Otwórz `http://localhost:3001`:
- [ ] Menu hamburger zawiera "Świat AI"
- [ ] Kliknięcie "Świat AI" prowadzi do `/swiat-ai`
- [ ] Footer zawiera "Świat AI"

Otwórz `http://localhost:3001/swiat-ai`:
- [ ] Strona renderuje newsy
- [ ] Hero sekcja z auto-rotacją
- [ ] Filtry źródeł działają
- [ ] Wyszukiwarka działa
- [ ] Grid 12 kart + "Pokaż więcej"
- [ ] Sidebar: Popularne, Newsletter, Obserwuj nas
- [ ] Newsletter "Zapisz się" wysyła request do `/api/waitlist`

- [ ] **Krok 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(swiat-ai): update main nav and footer links from Blog to Świat AI"
```

---

## Task 5: Tło 3D (AIDesigner)

**Files:**
- Modify: `src/app/swiat-ai/page.tsx` lub `src/components/AiNewsPage.tsx`

- [ ] **Krok 1: Wygeneruj tło przez AIDesigner**

Użyj AIDesigner skill (`aidesigner-frontend`) do wygenerowania animowanego tła 3D:
- Motyw: AI/tech/kosmiczny, ciemny
- Inne niż na stronie głównej
- Subtelne, nie przytłaczające contentu
- Warstwa pod całą treścią (position absolute, z-index 0)

- [ ] **Krok 2: Zintegruj tło ze stroną**

Dodaj wygenerowany komponent tła do `src/app/swiat-ai/page.tsx` jako warstwa pod `<AiNewsPage />`.

- [ ] **Krok 3: Sprawdź w przeglądarce**

- [ ] Tło widoczne za contentem
- [ ] Content czytelny (tło nie przytłacza)
- [ ] Animacja płynna

- [ ] **Krok 4: Commit**

```bash
git add -A
git commit -m "feat(swiat-ai): add 3D animated background via AIDesigner"
```
