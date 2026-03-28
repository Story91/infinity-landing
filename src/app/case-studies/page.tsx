'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, DollarSign, TrendingUp, Users, Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Send, Github } from 'lucide-react';
import FadeIn from '@/components/react-bits/FadeIn';
import AnimatedGradient from '@/components/react-bits/AnimatedGradient';
import Aurora from '@/components/react-bits/Aurora';
import Particles from '@/components/react-bits/Particles';
import Marquee from '@/components/react-bits/Marquee';
import CaseStudyCard from '@/components/CaseStudyCard';

// Sample case studies data
const CASE_STUDIES = [
  {
    id: 'techcorp',
    company: 'TechCorp Polska',
    industry: 'Technologia',
    logo: '/logo.jpg',
    coverImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Wdrożenie AI do automatyzacji procesów HR i obsługi klienta w firmie technologicznej z 500 pracownikami.',
    challenge: 'Firma borykała się z wolnym czasem odpowiedzi na aplikacje kandydatów (średnio 5 dni) i niską efektywnością działu HR.',
    solution: 'Zaimplementowaliśmy AI HR Agenta, który automatycznie筛選 aplikacje, przeprowadza wstępne rozmowy kwalifikacyjne i umawia spotkania.',
    results: [
      { label: 'Czas rekrutacji', value: '-70%', icon: 'time' as const },
      { label: 'Oszczędności', value: '2.4mln PLN', icon: 'money' as const },
      { label: 'Efektywność', value: '+300%', icon: 'efficiency' as const }
    ],
    testimonial: {
      name: 'Anna Kowalska',
      role: 'CEO TechCorp Polska',
      quote: 'Infinity Tech completely transformed our HR processes. We now hire 3x faster with better candidates.'
    }
  },
  {
    id: 'mediamax',
    company: 'MediaMax',
    industry: 'Marketing',
    logo: '/logo.jpg',
    coverImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Optymalizacja kampanii marketingowych i automatyzacja tworzenia treści dla agencji marketingowej.',
    challenge: 'Zespół marketingu spędzał 80% czasu na zadaniach administracyjnych zamiast na strategicznych działaniach.',
    solution: 'Stworzyliśmy AI Marketing Asystenta, który automatycznie generuje treści, optymalizuje kampanie i analizuje wyniki.',
    results: [
      { label: 'Treści miesięcznie', value: '5x więcej', icon: 'efficiency' as const },
      { label: 'ROI reklam', value: '+180%', icon: 'money' as const },
      { label: 'Czas oszczędzony', value: '160h/mies', icon: 'time' as const }
    ],
    testimonial: {
      name: 'Piotr Nowak',
      role: 'Dyrektor Marketingu',
      quote: 'Nasz zespół tworzy teraz 5 razy więcej treści. AI przejął nudne zadania.'
    }
  },
  {
    id: 'financehub',
    company: 'FinanceHub',
    industry: 'Finanse',
    logo: '/logo.jpg',
    coverImage: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'AI asystent sprzedaży dla firmy fintech obsługującej 100k+ klientów.',
    challenge: 'Długi czas odpowiedzi na zapytania klientów (4+ godziny) i niska konwersja leadów.',
    solution: 'Wdrożyliśmy AI Sales Agenta, który natychmiast odpowiada na pytania, kwalifikuje lejdy i umawia spotkania.',
    results: [
      { label: 'Czas odpowiedzi', value: '30 sek', icon: 'time' as const },
      { label: 'Konwersja', value: '+150%', icon: 'efficiency' as const },
      { label: 'Przychody', value: '+2mln PLN', icon: 'money' as const }
    ],
    testimonial: {
      name: 'Maria Wiśniewska',
      role: 'Head of Sales',
      quote: 'Konwersja wzrosła o 150%. Lead response time skrócił się z 4h do 30 sekund.'
    }
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#D6E4FF]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 py-1">
              <Image
                src="/-2147483648_-211442.png"
                alt="Infinity Tech Logo"
                width={42}
                height={42}
                className="object-contain"
              />
              <span className="text-xl md:text-2xl font-bold" style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #4a4a6a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                INFINITY TECH
              </span>
            </Link>
            <Link 
              href="/"
              className="flex items-center gap-2 text-[#1A2461] hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Powrót do strony głównej</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <Aurora colorStops={['#3A29FF', '#FF94B4', '#6366f1']} speed={0.8} blend={0.3} amplitude={1.2} />
        <Particles quantity={30} color="#6366f1" speed={0.5} />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#0B0F2E]">
              Case Studies
            </h1>
            <p className="text-xl text-[#7B9BDB] max-w-2xl mx-auto">
              Zobacz, jak pomagamy firmom transformować się z AI. Historie sukcesu naszych klientów.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((caseStudy, index) => (
              <FadeIn key={caseStudy.id} delay={index * 0.1}>
                <CaseStudyCard caseStudy={caseStudy} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <AnimatedGradient className="absolute inset-0" colors={['#6366f1', '#a855f7', '#ec4899', '#6366f1']} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Chcesz podobne rezultaty?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Umów bezpłatną konsultację i dowiedz się, jak możemy pomóc Twojej firmie.
            </p>
            <Link 
              href="/#kontakt"
              className="inline-block px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
            >
              Umów Konsultację
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#0B0F2E] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold gradient-text mb-4">Infinity Tech</div>
              <p className="text-[#7B9BDB] mb-6">
                Tworzymy przyszłość biznesu z AI. Automatyzujemy, optymalizujemy, transformujemy.
              </p>
              <div className="flex gap-4">
                <a href="https://linkedin.com/company/infinitytech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://x.com/infinitytech_pl" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-black transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/@infinitytech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://wa.me/infinitytech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-500 transition-colors">
                  <Send className="w-5 h-5" />
                </a>
                <a href="https://t.me/infinitytech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition-colors">
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Na skróty</h4>
              <ul className="space-y-2 text-[#7B9BDB]">
                <li><a href="/" className="hover:text-white transition-colors">Start</a></li>
                <li><a href="/#o-nas" className="hover:text-white transition-colors">O nas</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="/#kontakt" className="hover:text-white transition-colors">Kontakt</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Usługi</h4>
              <ul className="space-y-2 text-[#7B9BDB]">
                <li><a href="/agents" className="hover:text-white transition-colors">AI Agenci</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Automatyzacja</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consulting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integracje</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-[#7B9BDB]">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contact@infinityteam.io
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +48 123 456 789
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Warszawa, Polska
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-[#7B9BDB]">
            <p>&copy; {new Date().getFullYear()} Infinity Tech. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
