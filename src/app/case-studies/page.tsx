'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import Footer from '@/components/Footer';
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
    logo: '/logo.png',
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
    logo: '/logo.png',
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
    logo: '/logo.png',
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
                src="/logo.png"
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
              className="flex items-center gap-2 text-[#1A2461] hover:text-[#2E4AAD] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Powrót do strony głównej</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <Aurora colorStops={['#2E4AAD', '#7B9BDB', '#2E4AAD']} speed={0.8} blend={0.3} amplitude={1.2} />
        <Particles quantity={30} color="#7B9BDB" speed={0.5} />
        
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
        <AnimatedGradient className="absolute inset-0" colors={['#0B0F2E', '#2E4AAD', '#1A2461', '#0B0F2E']} />
        
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
              className="inline-block px-8 py-4 bg-white text-[#2E4AAD] font-semibold rounded-xl hover:bg-[#D6E4FF] transition-colors"
            >
              Umów Konsultację
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-[#0B0F2E]">
        <Footer />
      </div>
    </div>
  );
}
