'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, ArrowRight, Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Send, Search, TrendingUp, Eye, Heart, Share2, Tag } from 'lucide-react';
import FadeIn from '@/components/react-bits/FadeIn';
import Aurora from '@/components/react-bits/Aurora';
import Particles from '@/components/react-bits/Particles';
import SpotlightCard from '@/components/react-bits/SpotlightCard';
import TextType from '@/components/react-bits/TextType';

// Blog post data
const BLOG_POSTS = [
  {
    id: 'openclaw-ai-agents-2025',
    title: 'OpenCLAW - Przyszłość AI Agents w 2025 roku',
    excerpt: 'Odkryj najnowsze trendy w rozwoju otwartych frameworków AI Agentów i jak OpenCLAW zmienia krajobraz automatyzacji biznesowej.',
    category: 'OpenCLAW',
    date: '2025-03-08',
    readTime: '8 min',
    author: 'Infinity Tech Team',
    authorImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100',
    coverImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    views: 1250,
    likes: 89,
    featured: true
  },
  {
    id: 'ai-w-marketingu',
    title: 'Jak AI zmienia marketing w 2025',
    excerpt: 'Sztuczna inteligencja rewolucjonizuje sposób tworzenia kampanii marketingowych. Dowiedz się, jak wykorzystać AI w swojej strategii.',
    category: 'AI',
    date: '2025-03-05',
    readTime: '6 min',
    author: 'Anna Kowalska',
    authorImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100',
    coverImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    views: 890,
    likes: 45,
    featured: false
  },
  {
    id: 'automatyzacja-hr-ai',
    title: 'AI w HR: Automatyzacja rekrutacji i onboarding',
    excerpt: 'Przedstawiamy jak AI Agents transformują dział HR - od screeningu kandydatów po automatyczny onboarding nowych pracowników.',
    category: 'AI Agents',
    date: '2025-03-01',
    readTime: '7 min',
    author: 'Piotr Nowak',
    authorImage: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=100',
    coverImage: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=800',
    views: 720,
    likes: 38,
    featured: false
  },
  {
    id: 'llm-w-biznesie',
    title: 'Wdrożenie LLM w przedsiębiorstwie - best practices',
    excerpt: 'Praktyczny przewodnik po wdrażaniu Large Language Models w firmie. Od wyboru modelu po integrację z systemami.',
    category: 'Technologie',
    date: '2025-02-25',
    readTime: '10 min',
    author: 'Maria Wiśniewska',
    authorImage: 'https://images.pexels.com/photos/3183190/pexels-photo-3183190.jpeg?auto=compress&cs=tinysrgb&w=100',
    coverImage: 'https://images.pexels.com/photos/3183190/pexels-photo-3183190.jpeg?auto=compress&cs=tinysrgb&w=800',
    views: 1100,
    likes: 67,
    featured: false
  },
  {
    id: 'ai-w-sprzedazy',
    title: 'AI Sales Agent - asystent, który sprzedaje 24/7',
    excerpt: 'Dowiedz się, jak AI Agent może przejąć obsługę lejdu sprzedażowego i zwiększyć konwersję o 150%.',
    category: 'AI Agents',
    date: '2025-02-20',
    readTime: '5 min',
    author: 'Jan Lewandowski',
    authorImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100',
    coverImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    views: 950,
    likes: 52,
    featured: false
  },
  {
    id: 'bezpieczenstwo-ai',
    title: 'Bezpieczeństwo AI w erze cyberzagrożeń',
    excerpt: 'Jak chronić swoje systemy AI przed atakami? Przegląd najnowszych metod zabezpieczeń i najlepszych praktyk.',
    category: 'Bezpieczeństwo',
    date: '2025-02-15',
    readTime: '9 min',
    author: 'Infinity Tech Team',
    authorImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100',
    coverImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    views: 680,
    likes: 41,
    featured: false
  }
];

const CATEGORIES = ['Wszystkie', 'OpenCLAW', 'AI', 'AI Agents', 'Technologie', 'Bezpieczeństwo'];

const CATEGORY_COLORS: Record<string, string> = {
  'OpenCLAW': 'from-purple-600 to-indigo-600',
  'AI': 'from-blue-600 to-cyan-600',
  'AI Agents': 'from-green-600 to-emerald-600',
  'Technologie': 'from-orange-600 to-amber-600',
  'Bezpieczeństwo': 'from-red-600 to-rose-600',
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];
  
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'Wszystkie' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && !post.featured;
  });

  const popularPosts = [...BLOG_POSTS].sort((a, b) => b.views - a.views).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 py-1">
              <Image
                src="/-2147483648_-211442.png"
                alt="Infinity Tech"
                width={42}
                height={42}
                className="object-contain"
              />
              <span className="text-xl md:text-2xl font-bold logo-text" style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #4a4a6a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                INFINITY TECH
              </span>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Powrót</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Featured Post - Full Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[85vh] flex items-center">
        
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Featured Post Content */}
            <FadeIn>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-white/90 text-sm font-medium">Najnowszy artykuł</span>
                </div>
                
                <span className={`inline-block px-5 py-2 bg-gradient-to-r ${CATEGORY_COLORS[featuredPost.category]} text-white text-sm font-bold rounded-full`}>
                  {featuredPost.category}
                </span>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  {featuredPost.title}
                </h1>
                
                <p className="text-xl text-white/80 leading-relaxed max-w-xl">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-6 text-white/70 pt-4">
                  <div className="flex items-center gap-2">
                    <Image src={featuredPost.authorImage} alt={featuredPost.author} width={40} height={40} className="rounded-full ring-2 ring-white/30" />
                    <span className="font-medium text-white">{featuredPost.author}</span>
                  </div>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Link 
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:scale-105 transition-transform shadow-xl"
                  >
                    Czytaj artykuł <ArrowRight className="w-5 h-5" />
                  </Link>
                  <div className="flex items-center gap-4 text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-5 h-5" /> {featuredPost.views}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-5 h-5" /> {featuredPost.likes}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Featured Post Image */}
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50"></div>
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
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Szukaj artykułów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Full Width Layout */}
      <section className="py-16 pb-20">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col xl:flex-row gap-12">
            {/* Blog Posts - Main Area */}
            <div className="xl:w-3/4">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Tag className="w-7 h-7 text-indigo-600" />
                {selectedCategory === 'Wszystkie' ? 'Wszystkie artykuły' : selectedCategory}
                <span className="text-base font-normal text-slate-500">({filteredPosts.length})</span>
              </h2>
              
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <FadeIn key={post.id} delay={index * 0.1}>
                    <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group h-full flex flex-col">
                      <div className="relative h-64 flex-shrink-0">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <span className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${CATEGORY_COLORS[post.category]} text-white text-xs font-semibold rounded-full`}>
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-3 text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500 border-t pt-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" /> {post.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {post.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </FadeIn>
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-16 bg-slate-50 rounded-2xl">
                  <p className="text-slate-500 text-lg">Nie znaleziono artykułów spełniających kryteria.</p>
                  <button 
                    onClick={() => {setSelectedCategory('Wszystkie'); setSearchQuery('');}}
                    className="mt-4 text-indigo-600 font-medium hover:underline"
                  >
                    Wyczyść filtry
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar - Right Panel */}
            <div className="xl:w-1/4 space-y-8">
              {/* Popular Posts - Professional Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Popularne</h3>
                    <p className="text-xs text-slate-500">Najczęściej czytane</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {popularPosts.map((post, index) => (
                    <Link key={post.id} href={`/blog/${post.id}`} className="flex gap-4 group">
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {post.views}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter - with logo background */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src="/logo.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>
                </div>
                <div className="relative z-10 p-8 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Newsletter</h3>
                  <p className="text-white/70 text-sm mb-6">
                    Bądź na bieżąco z nowinkami AI i technologii. Zero spamu.
                  </p>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="Twój adres email" 
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                    />
                    <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-white/90 transition-colors">
                      Zapisz się
                    </button>
                  </div>
                  <p className="text-xs text-white/50 mt-4 text-center">
                    Możesz się wypisać w każdej chwili
                  </p>
                </div>
              </div>

              {/* Social Follow - Black bg with white icons */}
              <div className="bg-slate-900 rounded-2xl p-8 text-white text-center">
                <h3 className="font-bold mb-2">Obserwuj nas</h3>
                <p className="text-white/60 text-sm mb-6">Dołącz do społeczności AI</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold gradient-text mb-4">Infinity Tech</div>
              <p className="text-slate-400 mb-6">
                Tworzymy przyszłość biznesu z AI.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-black transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Na skróty</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="/" className="hover:text-white transition-colors">Start</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Usługi</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="/agents" className="hover:text-white transition-colors">AI Agenci</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Automatyzacja</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consulting</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> contact@infinityteam.io
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +48 123 456 789
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Warszawa, Polska
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} Infinity Tech.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
