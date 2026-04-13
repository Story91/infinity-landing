// src/components/AiNewsPage.tsx
'use client';

import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
  ExternalLink, Zap, Code, Globe, BookOpen, Cpu, Newspaper, TrendingUp,
  Search, Tag, Mail, Linkedin,
  ChevronDown,
} from 'lucide-react';

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import FadeIn from '@/components/react-bits/FadeIn';
import GlareHover from '@/components/GlareHover';
import BlurText from '@/components/BlurText';
import TextType from '@/components/react-bits/TextType';
import type { NewsItem } from '@/lib/newsCache';

function handleMailto(e: React.MouseEvent) {
  e.preventDefault();
  const email = 'contact@infinityteam.io';
  window.open(`mailto:${email}`, '_self');
  setTimeout(() => {
    if (!document.hidden) {
      navigator.clipboard.writeText(email).then(() => {
        alert(`Adres email skopiowany do schowka: ${email}`);
      }).catch(() => {
        prompt('Skopiuj adres email:', email);
      });
    }
  }, 500);
}

const SOURCE_META = {
  TechCrunch:  { label: 'TechCrunch', Icon: Zap,         color: '#7B9BDB' },
  TheVerge:    { label: 'The Verge',  Icon: Cpu,          color: '#7B9BDB' },
  Wired:       { label: 'Wired',      Icon: Newspaper,    color: '#7B9BDB' },
  DevTo:       { label: 'Dev.to',     Icon: Code,         color: '#7B9BDB' },
  Guardian:    { label: 'Guardian',   Icon: Globe,        color: '#7B9BDB' },
  Arxiv:       { label: 'Arxiv',      Icon: BookOpen,     color: '#7B9BDB' },
} as const;

const DEFAULT_META = { label: 'News', Icon: Globe, color: '#7B9BDB' };
function getMeta(source: string) {
  return (SOURCE_META as any)[source] ?? DEFAULT_META;
}

type SourceFilter = 'Wszystkie' | 'TechCrunch' | 'TheVerge' | 'Wired' | 'DevTo' | 'Guardian' | 'Arxiv';
const FILTERS: SourceFilter[] = ['Wszystkie', 'TechCrunch', 'TheVerge', 'Wired', 'DevTo', 'Guardian', 'Arxiv'];

const INITIAL_COUNT = 12;
const HERO_INTERVAL_MS = 8000;

interface AiNewsPageProps {
  initialNews: NewsItem[];
}

export default function AiNewsPage({ initialNews }: AiNewsPageProps) {
  const [news] = useState<NewsItem[]>(initialNews);
  const [activeFilter, setActiveFilter] = useState<SourceFilter>('Wszystkie');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

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
  const popularItems = news.slice(0, 5);

  // Newsletter submit
  const [email, setEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const handleNewsletter = useCallback(async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email) || !newsletterConsent) return;
    setEmailStatus('sending');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'swiat-ai-newsletter' }),
      });
      setEmailStatus(res.ok ? 'sent' : 'error');
    } catch { setEmailStatus('error'); }
  }, [email, newsletterConsent]);

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
      <div className="text-center pt-6 md:pt-10 pb-8 md:pb-12 px-4 md:px-6">
        <BlurText
          text="Świat AI"
          delay={150}
          animateBy="letters"
          direction="top"
          className="text-3xl md:text-5xl font-extrabold text-white mb-2 md:mb-3 tracking-tight"
          stepDuration={0.3}
        />
        <TextType
          texts={[
            'Najnowsze wiadomości ze świata sztucznej inteligencji',
            'Automatyczne newsy z TechCrunch, The Verge, Wired i więcej',
            'Codziennie świeże treści — przetłumaczone na polski',
          ]}
          speed={40}
          deleteSpeed={25}
          pauseDuration={3000}
          className="text-white text-base md:text-lg mb-14 md:mb-20 min-h-[32px] font-mono tracking-wide"
        />
        <div className="flex justify-center gap-1.5 md:gap-3 flex-wrap px-2">
          {Object.entries(SOURCE_META).map(([key, meta]) => {
            const Icon = meta.Icon;
            return (
              <span
                key={key}
                className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[9px] md:text-xs font-medium backdrop-blur-sm"
                style={{
                  background: `${meta.color}15`,
                  color: meta.color,
                  border: `1px solid ${meta.color}30`,
                }}
              >
                <Icon className="w-3 h-3" />
                {meta.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* HERO */}
      {heroItem && (
        <FadeIn>
          <section className="px-4 md:px-6 pb-6 md:pb-8 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch">
              {/* Big hero card */}
              <a
                href={heroItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-[2] bg-[#1A2461]/70 backdrop-blur-2xl p-5 md:p-8 rounded-2xl border border-[#7B9BDB]/20 relative overflow-hidden group shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] hover:border-[#4F6AE8]/50 hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.4),0_0_24px_rgba(79,106,232,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#4F6AE8]/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: `${getMeta(heroItem.source).color}20`,
                        color: getMeta(heroItem.source).color,
                        border: `1px solid ${getMeta(heroItem.source).color}40`,
                      }}
                    >
                      {React.createElement(getMeta(heroItem.source).Icon, { className: 'w-3 h-3' })}
                      {getMeta(heroItem.source).label}
                    </span>
                    <span className="text-[#4F6AE8] text-xs">
                      {new Date(heroItem.publishedAt).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-3xl font-bold text-white leading-tight mb-3 md:mb-4 group-hover:text-[#D6E4FF] transition-colors">
                    {heroItem.title}
                  </h2>
                  <p className="text-[#B8C9E8] text-sm md:text-base leading-relaxed mb-4 md:mb-6 max-w-2xl">
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

              {/* 2 smaller cards — hidden on mobile */}
              <div className="flex-1 hidden lg:flex flex-col gap-4">
                {news.slice(1, 3).filter(n => n !== heroItem).concat(news.slice(3)).slice(0, 2).map(item => {
                  const meta = getMeta(item.source);
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#1A2461]/70 backdrop-blur-xl p-5 rounded-xl border border-[#7B9BDB]/20 hover:border-[#4F6AE8]/50 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.4),0_0_24px_rgba(79,106,232,0.25)] hover:-translate-y-1 transition-all duration-400 group flex flex-col justify-between"
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
      <div className="border-y border-[#1A2461] py-3 md:py-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-between">
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
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap scrollbar-hide">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-[#2E4AAD] text-white shadow-lg shadow-[#2E4AAD]/30'
                    : 'bg-[#1A2461]/50 border border-[#2E4AAD]/40 hover:bg-[#1A2461] hover:border-[#4F6AE8]'
                }`}
                style={activeFilter === filter ? {} : { color: filter === 'Wszystkie' ? '#D6E4FF' : getMeta(filter).color ?? '#D6E4FF' }}
              >
                {filter === 'Wszystkie' ? 'Wszystkie' : getMeta(filter).label ?? filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT: Grid + Sidebar */}
      <section className="py-6 md:py-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8 md:gap-10">

          {/* Grid */}
          <div className="xl:w-3/4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2 text-white">
              <Tag className="w-6 h-6 text-[#7B9BDB]" />
              {activeFilter === 'Wszystkie' ? 'Wszystkie newsy' : getMeta(activeFilter).label ?? activeFilter}
              <span className="text-sm font-normal text-[#7B9BDB]">({filtered.length})</span>
            </h2>

            {visibleItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {visibleItems.map((item, index) => {
                    const meta = getMeta(item.source);
                    const Icon = meta.Icon;
                    return (
                      <FadeIn key={item.id} delay={index * 0.03}>
                        <GlareHover glareColor="#4F6AE8" glareOpacity={0.12} glareAngle={-30} glareSize={300} transitionDuration={800} className="rounded-2xl h-full">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex flex-col h-full rounded-2xl bg-[#1A2461]/70 backdrop-blur-xl border border-[#7B9BDB]/20 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] hover:border-[#4F6AE8]/50 hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.4),0_0_24px_rgba(79,106,232,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-400 overflow-hidden"
                        >
                          {/* Cover image or gradient placeholder */}
                          <div
                            className="h-32 md:h-36 flex items-center justify-center relative overflow-hidden"
                            style={item.image ? {} : { background: `linear-gradient(135deg, ${meta.color}15, ${meta.color}05)` }}
                          >
                            {item.image ? (
                              <img src={item.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                            ) : (
                              <Icon className="w-10 h-10 opacity-20" style={{ color: meta.color }} />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F2E]/60 via-transparent to-transparent" />
                            <div className="absolute top-3 left-3 flex items-center gap-2">
                              <span
                                className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm"
                                style={{ background: `${meta.color}30`, color: meta.color, border: `1px solid ${meta.color}40` }}
                              >
                                <Icon className="w-3 h-3" />
                                {meta.label}
                              </span>
                            </div>
                            <ExternalLink className="absolute top-3 right-3 w-3.5 h-3.5 text-[#7B9BDB] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-[#D6E4FF] transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-xs text-[#7B9BDB] leading-relaxed line-clamp-3 flex-1">
                              {item.excerpt}
                            </p>
                            <p className="text-[10px] text-[#2E4AAD] mt-3 pt-3 border-t border-[#2E4AAD]/25">
                              {new Date(item.publishedAt).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </a>
                        </GlareHover>
                      </FadeIn>
                    );
                  })}
                </div>

                {hasMore && (
                  <div className="text-center mt-6 md:mt-8">
                    <button
                      onClick={() => setShowAll(true)}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2E4AAD] to-[#4F6AE8] text-white w-full md:w-auto px-8 py-3 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-[#2E4AAD]/40 transition-all"
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
          <div className="xl:w-1/4 flex flex-col gap-4 md:gap-6">

            {/* Popularne */}
            <div className="w-full h-fit bg-[#1A2461]/70 backdrop-blur-xl rounded-2xl p-5 border border-[#7B9BDB]/20 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)]">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#2E4AAD]/25">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#2E4AAD] to-[#4F6AE8] flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="font-bold text-white text-sm">Popularne</h3>
              </div>
              <div className="space-y-2.5">
                {popularItems.map((item, i) => (
                  <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 group items-start">
                    <span className="text-[#2E4AAD] font-bold text-xs mt-0.5 w-4 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[11px] text-[#D6E4FF] group-hover:text-white transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[9px] text-[#7B9BDB] mt-0.5">{getMeta(item.source).label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="w-full h-fit bg-[#1A2461]/70 backdrop-blur-xl rounded-2xl p-6 border border-[#7B9BDB]/20 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] text-white">
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
                    disabled={emailStatus === 'sending' || !newsletterConsent}
                    className="w-full py-2.5 bg-[#2E4AAD] hover:bg-[#4F6AE8] disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    {emailStatus === 'sending' ? 'Wysyłanie...' : 'Zapisz się'}
                  </button>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newsletterConsent}
                      onChange={e => setNewsletterConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-[#2E4AAD] bg-[#0B0F2E]/60 accent-[#4F6AE8] flex-shrink-0"
                    />
                    <span className="text-[10px] text-[#7B9BDB] leading-snug">
                      Wyrażam zgodę na otrzymywanie informacji handlowych drogą elektroniczną od Infinity Tech. Zapoznałem/am się z{' '}
                      <a href="/polityka-prywatnosci" className="text-[#4F6AE8] hover:underline">Polityką Prywatności</a>.
                    </span>
                  </label>
                  {emailStatus === 'error' && <p className="text-red-400 text-xs">Błąd. Spróbuj ponownie.</p>}
                </div>
              )}
            </div>

            {/* Obserwuj nas */}
            <div className="w-full h-fit bg-[#1A2461]/70 backdrop-blur-xl rounded-2xl p-6 border border-[#7B9BDB]/20 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] text-white text-center">
              <h3 className="font-bold text-sm mb-1">Bądźmy w kontakcie</h3>
              <p className="text-[#7B9BDB] text-xs mb-4">Obserwuj nas lub napisz</p>
              <div className="flex justify-center gap-3">
                <a href="https://www.linkedin.com/company/infinitytechgroup/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0B0F2E]/60 border border-[#2E4AAD]/40 flex items-center justify-center hover:border-[#4F6AE8] hover:bg-[#2E4AAD]/20 transition-all">
                  <Linkedin className="w-4 h-4 text-[#7B9BDB]" />
                </a>
                <a href="https://x.com/InfinityTech_PL" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0B0F2E]/60 border border-[#2E4AAD]/40 flex items-center justify-center hover:border-[#4F6AE8] hover:bg-[#2E4AAD]/20 transition-all">
                  <XIcon className="w-4 h-4 text-[#7B9BDB]" />
                </a>
                <a href="mailto:contact@infinityteam.io" onClick={handleMailto} className="w-10 h-10 rounded-full bg-[#0B0F2E]/60 border border-[#2E4AAD]/40 flex items-center justify-center hover:border-[#4F6AE8] hover:bg-[#2E4AAD]/20 transition-all">
                  <Mail className="w-4 h-4 text-[#7B9BDB]" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
