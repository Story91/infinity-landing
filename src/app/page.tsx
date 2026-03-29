'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2,
  Menu,
  X,
  Cpu,
  Users,
  Building2,
  Clock,
  DollarSign,
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Bot,
  Brain,
  Globe,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Send,
  Youtube,
  Wand2,
  BookOpen,
  Instagram,
  Download,
  Settings,
  Lightbulb
} from 'lucide-react';

import SplitText from '@/components/react-bits/SplitText';
import FadeIn from '@/components/react-bits/FadeIn';
import { Ripple } from '@/components/react-bits/Ripple';
import AnimatedGradient from '@/components/react-bits/AnimatedGradient';
import Beams from '@/components/react-bits/Beams';
import Aurora from '@/components/react-bits/Aurora';
import Particles from '@/components/react-bits/Particles';
import SpotlightCard from '@/components/react-bits/SpotlightCard';
import TiltedCard from '@/components/react-bits/TiltedCard';
import ProfileCard from '@/components/react-bits/ProfileCard';
import Accordion from '@/components/react-bits/Accordion';
import ShinyText from '@/components/react-bits/ShinyText';
import TextType from '@/components/react-bits/TextType';
import GlowBorder from '@/components/react-bits/GlowBorder';
import Marquee from '@/components/react-bits/Marquee';
import AnimatedCounter from '@/components/react-bits/AnimatedCounter';
import ROICalculator from '@/components/ROICalculator';
import ChatWidget from '@/components/ChatWidget';
import ClickSpark from '@/components/react-bits/ClickSpark';
import dynamic from 'next/dynamic';
const StaggeredMenu = dynamic(() => import('@/components/StaggeredMenu'), { ssr: false });

// X (Twitter) icon
function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Dane zespołu
const TEAM_MEMBERS = [
  {
    name: 'Jan Kowalski',
    role: 'CEO & Founder',
    bio: 'Ekspert AI z 10-letnim doświadczeniem w transformacji cyfrowej przedsiębiorstw.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Anna Nowak',
    role: 'CTO',
    bio: 'Specjalistka ds. uczenia maszynowego i architektury systemów AI.',
    image: 'https://images.pexels.com/photos/3183190/pexels-photo-3183190.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Piotr Wiśniewski',
    role: 'AI Engineer',
    bio: 'Inżynier OpenCLAW z certyfikacją w zakresie agentów AI.',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Maria Lewandowska',
    role: 'Business Development',
    bio: 'Ekspertka ds. transformacji cyfrowej z doświadczeniem w enterprise.',
    image: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: 'https://linkedin.com'
  }
];

// FAQ
const FAQ_ITEMS = [
  {
    question: 'Ile kosztuje wdrożenie rozwiązań AI?',
    answer: 'Ceny zaczynają się od 5000 PLN dla małych firm. Każde wdrożenie jest wyceniane indywidualnie na podasie potrzeb Twojej organizacji. Oferujemy bezpłatną konsultację, podczas której przygotujemy wycenę.'
  },
  {
    question: 'Jak długo trwa wdrożenie?',
    answer: 'Typowe wdrożenie dla małych firm trwa 2-4 tygodnie. Średnie i duże przedsiębiorstwa wdrażamy w ciągu 1-3 miesięcy, w zależności od skali i złożoności integracji.'
  },
  {
    question: 'Czy moje dane są bezpieczne?',
    answer: 'Tak. Wszystkie dane są przechowywane na serwerach w Polsce, zgodnie z RODO. Stosujemy szyfrowanie end-to-end i najwyższe standardy bezpieczeństwa. Jesteśmy certyfikowani w zakresie ISO 27001.'
  },
  {
    question: 'Jakie firmy obsugujecie?',
    answer: 'Obsługujemy firmy każdej wielkości - od małych startupów po duże korporacje. Mamy doświadczenie w branżach: finansowej, produkcyjnej, e-commerce, usługowej i IT.'
  },
  {
    question: 'Czy oferujecie wsparcie po wdrożeniu?',
    answer: 'Tak, oferujemy pakiety supportu: podstawowy (8h/miesiąc), rozszerzony (20h/miesiąc) i premium (non-stop). Wszystkie pakiety obejmują monitoring i aktualizacje systemu.'
  },
  {
    question: 'Czy mogę zintegrować AI z moim obecnym systemem?',
    answer: 'Tak, nasze rozwiązania integrują się z większością popularnych systemów: SAP, Oracle, Salesforce, Microsoft 365, Slack, Teams i wieloma innymi. Oferujemy również customowe integracje API.'
  }
];

// Co robimy — filary
const SERVICES = [
  {
    title: 'OpenClaw Wrapper',
    tierLabel: 'WRAPPER',
    description: 'To nasz główny produkt — gotowy agent AI „pod klucz" dla firm. Wdrażamy w 2-4 tygodnie kompletnego agenta AI, który pracuje autonomicznie 24/7 na dedykowanym serwerze, zintegrowanego z kanałami które już używasz — WhatsApp, Telegram, Slack, Discord i 20+ innych.',
    price: '',
    features: [],
    accentColor: '#7B9BDB',
    featured: false
  },
  {
    title: 'Automatyzacja procesów',
    tierLabel: 'AUTOMATYZACJA',
    description: 'Indywidualne wdrożenia AI pod konkretne procesy Twojej firmy — HR, sprzedaż, obsługa klienta, screening kandydatów, lead generation. Analizujemy Twoje procesy, znajdujemy wąskie gardła i wdrażamy automatyzację, która pracuje za Twój zespół.',
    price: '',
    features: [],
    accentColor: '#2E4AAD',
    featured: false
  },
  {
    title: 'AI Consulting',
    tierLabel: 'CONSULTING',
    description: 'Konsultacje, audyt procesów i strategia AI dla firm, które chcą zacząć ale nie wiedzą od czego. Pokażemy Ci gdzie AI zaoszczędzi Ci czas i pieniądze, oszacujemy ROI i przygotujemy plan wdrożenia krok po kroku.',
    price: '',
    features: [],
    accentColor: '#0B0F2E',
    featured: false
  },
  {
    title: 'Desktop App',
    tierLabel: 'DESKTOP APP',
    description: 'Aplikacja na desktop — wkrótce dostępna. Zapisz się na listę oczekujących, aby otrzymać dostęp jako pierwszy.',
    price: '',
    features: [],
    accentColor: '#7B9BDB',
    featured: true,
    badgeText: 'Wkrótce',
    buttonText: 'Zapisz się na waitlist'
  }
];

// Technologie, na których budujemy
const TECH_STACK = [
  { name: 'OpenClaw', desc: 'AI Agent Framework' },
  { name: 'Hetzner', desc: 'Cloud Infrastructure' },
  { name: 'Stripe', desc: 'Payment Processing' },
  { name: 'Vercel', desc: 'Hosting & Deploy' },
  { name: 'MiniMax', desc: 'AI Models' },
];

// Kanały integracji
const CHANNELS = [
  'WhatsApp', 'Telegram', 'Discord', 'Slack', 'Signal',
  'iMessage', 'Microsoft Teams', 'Google Chat', 'Matrix',
  'WebChat', 'LINE', 'Nostr', 'Zalo', 'Nextcloud Talk', 'Mattermost',
];

// Referencje/Testimonials (wyłączone — do użycia gdy będą prawdziwe referencje)
/*
const TESTIMONIALS = [
  {
    name: 'Anna Kowalska',
    role: 'CEO',
    company: 'TechCorp Polska',
    avatar: 'https://images.pexels.com/photos/3183190/pexels-photo-3183190.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Dzięki Infinity Tech zautomatyzowaliśmy 70% procesów HR. Oszczędzamy 40 godzin tygodniowo.',
    result: '40h/tydzień'
  },
  {
    name: 'Piotr Nowak',
    role: 'Dyrektor Marketingu',
    company: 'MediaMax',
    avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Nasz zespół marketingu teraz tworzy 5x więcej treści. AI przejął nudne zadania.',
    result: '5x więcej treści'
  },
  {
    name: 'Maria Wiśniewska',
    role: 'Head of Sales',
    company: 'FinanceHub',
    avatar: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Konwersja wzrosła o 150%. Lead response time skrócił się z 4h do 30 sekund.',
    result: '+150% konwersji'
  },
  {
    name: 'Jan Lewandowski',
    role: 'COO',
    company: 'LogiTrans',
    avatar: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'ROI osiągnęliśmy w 3 miesiące. System sam obsługuje 80% zapytań klientów.',
    result: 'ROI w 3 miesiące'
  }
];
*/

// OpenClaw community quotes
const OPENCLAW_QUOTES = [
  {
    quote: 'After years of AI hype, I thought nothing could faze me. Then I installed OpenClaw. AI as teammate, not tool. The endgame of digital employees is here.',
    author: '@lycfyi'
  },
  {
    quote: 'The fact that it\'s hackable and hostable on-prem will make sure tech like this DOMINATES conventional SaaS.',
    author: '@rovensky'
  },
  {
    quote: 'Just shipped my first personal AI assistant. On WhatsApp. Memory moves across agents. Personal AI is getting real.',
    author: '@christinetyip'
  }
];

// Stats
const STATS = [
  { value: '78', suffix: '%', label: 'firm w Polsce nie korzysta jeszcze z AI', icon: Building2 },
  { value: '300', suffix: '%', label: 'średni wzrost efektywności z agentami AI', icon: Zap },
  { value: '2-4', suffix: ' tyg.', label: 'czas pełnego wdrożenia', icon: Clock },
  { value: '24/7', suffix: '', label: 'autonomiczna praca agentów AI', icon: Bot },
];

// Benefits
const BENEFITS = [
  {
    icon: Zap,
    title: 'Szybka Automatyzacja',
    description: 'Algorytmy AI przejmują monotonne zadania, zwiększając efektywność Twojego zespołu nawet o 300%.'
  },
  {
    icon: Clock,
    title: 'Szybka Implementacja',
    description: 'Wdrażamy rozwiązania w tygodnie, nie miesiące. Pierwsze rezultaty widoczne od pierwszego dnia.'
  },
  {
    icon: Shield,
    title: 'Bezpieczeństwo Danych',
    description: 'Twoje dane pozostają w Polsce. Gwarantujemy pełną zgodność z RODO i certyfikację ISO.'
  },
  {
    icon: BarChart3,
    title: 'Mierzalne Wyniki',
    description: 'Śledź ROI w czasie rzeczywistym. Widoczny wzrost produktywności od pierwszego miesiąca.'
  }
];

// Główne sekcje
function HeroSection() {
  return (
    <>
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'hue-rotate(120deg) saturate(1.4) brightness(0.7)' }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
          type="video/mp4"
        />
      </video>

      {/* Blue overlay */}
      <div className="absolute inset-0 bg-[#0B0F2E]/60 mix-blend-multiply z-[1]" />

      {/* Centered content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-6 py-12 text-center">
        <div className="text-xs sm:text-sm md:text-xl tracking-wider md:tracking-widest uppercase mb-4 px-2 text-[#8BB8E8]" style={{ fontFamily: 'var(--font-geist)' }}>
          <SplitText
            text="Rewolucja AI już trwa — Twoja konkurencja nie śpi"
            tag="span"
            className="inline"
            duration={1}
            delay={40}
          />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight text-white" style={{ fontFamily: 'var(--font-geist)' }}>
          <SplitText
            text="Zautomatyzuj firmę"
            tag="span"
            className="block mb-2"
            duration={1}
            delay={80}
          />
          <ShinyText text="z agentami AI" />
        </h1>

        <FadeIn delay={0.5}>
          <p className="text-base md:text-lg mb-7 max-w-lg mx-auto text-white/80 px-2">
            Wykorzystaj potęgę agentów AI OpenCLAW, aby zautomatyzować procesy, zwiększyć efektywność i skupić się na tym, co naprawdę napędza rozwój Twojej firmy.
          </p>
        </FadeIn>

        <FadeIn delay={0.7}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#kontakt" className="w-full sm:w-auto">
              <Ripple className="w-full px-6 py-3 md:px-8 md:py-4 text-white text-base md:text-lg bg-[#2E4AAD] hover:bg-[#1A2461] btn-grain border-2 border-[#2E4AAD]">
                Umów konsultację
              </Ripple>
            </a>
            <a href="/case-studies" className="px-6 py-3 md:px-8 md:py-4 border-2 rounded-full font-semibold text-base md:text-lg transition-all flex items-center justify-center gap-2 border-white/30 text-white hover:bg-white/10">
              Dowiedz się więcej
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </FadeIn>

      </div>

      {/* Bottom section — social icons left + quote centered */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-8">
        {/* Social icons — bottom left */}
        <div className="liquid-glass flex gap-2 items-center rounded-full px-2 py-1.5 mb-4 md:mb-0 md:absolute md:bottom-8 md:left-[2em] w-fit" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
          <a href="https://x.com/InfinityTech_PL" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all">
            <XIcon className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/company/infinitytechgroup/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:contact@infinityteam.io" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all">
            <Mail className="w-4 h-4" />
          </a>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xs tracking-widest uppercase text-white/50">Innowacyjne Rozwiązania</p>
          <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed">
            &ldquo;Automatyzujemy procesy, aby Twój biznes mógł <span className="italic text-white/80">rosnąć bez granic.</span>&rdquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-white/20" />
            <span className="text-xs tracking-widest uppercase text-white/50">Infinity Team</span>
            <div className="h-px w-12 bg-white/20" />
          </div>
        </div>
      </div>
    </section>

    {/* Ambient transition */}
    <div className="h-24 bg-gradient-to-b from-[#0B0F2E] to-white" />
    </>
  );
}

function StatsSection() {
  return (
    <section className="pt-8 pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#2E4AAD]" />
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
                  {/^\d+$/.test(stat.value) ? (
                    <AnimatedCounter end={parseInt(stat.value)} suffix={stat.suffix} />
                  ) : (
                    <span>{stat.value}{stat.suffix}</span>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-[#7B9BDB]">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="pt-6 pb-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #D6E4FF 0%, #c8d4f0 100%)' }}>
      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob-1 absolute rounded-full" style={{ width: '450px', height: '450px', background: '#4F6AE8', opacity: 0.08, filter: 'blur(100px)', top: '10%', left: '-5%' }} />
        <div className="blob-2 absolute rounded-full" style={{ width: '350px', height: '350px', background: '#7B5CCC', opacity: 0.06, filter: 'blur(120px)', top: '50%', right: '-3%' }} />
        <div className="blob-3 absolute rounded-full" style={{ width: '400px', height: '400px', background: '#5B9BD5', opacity: 0.07, filter: 'blur(90px)', bottom: '-10%', left: '30%' }} />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#0B0F2E' }}>
              Dlaczego <span style={{ color: '#4F6AE8' }}>Infinity Tech?</span>
            </h2>
            <p className="text-xl" style={{ color: '#7B9BDB' }}>Dostarczamy rozwiązania dopasowane do Twojej firmy</p>
          </div>
        </FadeIn>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1 */}
          <FadeIn delay={0} className="md:col-span-2">
            <div className="bento-card relative overflow-hidden rounded-2xl p-8 shadow-md h-full" style={{ minHeight: '220px' }}>
              {/* Animated gears */}
              <div className="bento-anim">
                <div className="bento-gear-1 absolute" style={{ width: '80px', height: '80px', right: '0', bottom: '0' }}>
                  <Settings className="w-full h-full" style={{ color: '#6B8DE3', opacity: 0.35 }} />
                </div>
                <div className="bento-gear-2 absolute" style={{ width: '50px', height: '50px', right: '60px', bottom: '40px' }}>
                  <Settings className="w-full h-full" style={{ color: '#9B7CE8', opacity: 0.4 }} />
                </div>
                <div className="bento-gear-3 absolute" style={{ width: '35px', height: '35px', right: '20px', bottom: '70px' }}>
                  <Settings className="w-full h-full" style={{ color: '#7B9BDB', opacity: 0.45 }} />
                </div>
              </div>
              <div className="relative z-10">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, #4F6AE8, #7B5CCC)' }}>
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Szybka Automatyzacja</h3>
                <p className="text-base leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.7)' }}>Algorytmy AI przejmują monotonne zadania, zwiększając efektywność Twojego zespołu nawet o 300%.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bento-card relative overflow-hidden rounded-2xl p-8 shadow-md h-full" style={{ minHeight: '220px' }}>
              {/* Animated clock */}
              <div className="bento-anim-top" style={{ width: '70px', height: '70px' }}>
                <div className="rounded-full border-2 w-full h-full" style={{ borderColor: 'rgba(107,141,227,0.3)' }} />
                <div className="bento-clock-hand absolute top-1/2 left-1/2" style={{ width: '2px', height: '28px', background: '#6B8DE3', opacity: 0.5, transformOrigin: 'bottom center', marginLeft: '-1px', marginTop: '-28px' }} />
              </div>
              <div className="relative z-10">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, #4F6AE8, #7B5CCC)' }}>
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Szybka Implementacja</h3>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>Wdrażamy rozwiązania w tygodnie, nie miesiące. Pierwsze rezultaty widoczne od pierwszego dnia.</p>
              </div>
            </div>
          </FadeIn>

          {/* Row 2 */}
          <FadeIn delay={0.3}>
            <div className="bento-card relative overflow-hidden rounded-2xl p-8 shadow-md h-full" style={{ minHeight: '220px' }}>
              {/* Animated shield */}
              <div className="bento-anim-top bento-shield">
                <Shield className="w-16 h-16" style={{ color: '#6B8DE3', opacity: 0.4 }} />
              </div>
              <div className="relative z-10">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, #4F6AE8, #7B5CCC)' }}>
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Bezpieczeństwo Danych</h3>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>Twoje dane pozostają w Polsce. Gwarantujemy pełną zgodność z RODO i certyfikację ISO.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.45} className="md:col-span-2">
            <div className="bento-card relative overflow-hidden rounded-2xl p-8 shadow-md h-full" style={{ minHeight: '220px' }}>
              {/* Animated bar chart */}
              <div className="bento-anim flex items-end gap-2" style={{ height: '80px' }}>
                <div className="bento-bar rounded-t" style={{ width: '14px', background: 'linear-gradient(180deg, #6B8DE3, #9B7CE8)', opacity: 0.35 }} />
                <div className="bento-bar rounded-t" style={{ width: '14px', background: 'linear-gradient(180deg, #6B8DE3, #9B7CE8)', opacity: 0.4 }} />
                <div className="bento-bar rounded-t" style={{ width: '14px', background: 'linear-gradient(180deg, #6B8DE3, #9B7CE8)', opacity: 0.45 }} />
                <div className="bento-bar rounded-t" style={{ width: '14px', background: 'linear-gradient(180deg, #7B9BDB, #9B7CE8)', opacity: 0.5 }} />
              </div>
              <div className="relative z-10">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, #4F6AE8, #7B5CCC)' }}>
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Mierzalne Wyniki</h3>
                <p className="text-base leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.7)' }}>Śledź ROI w czasie rzeczywistym. Widoczny wzrost produktywności od pierwszego miesiąca.</p>
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0B0F2E]">Poznaj Nasz Zespół</h2>
            <p className="text-xl text-[#7B9BDB] max-w-2xl mx-auto">
              Eksperci AI z wieloletnim doświadczeniem w transformacji cyfrowej przedsiębiorstw
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <ProfileCard
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
                linkedin={member.linkedin}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="pt-24 pb-6" style={{ backgroundColor: '#D6E4FF' }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#0B0F2E' }}>Co <ShinyText text="robimy" /></h2>
            <p className="text-xl" style={{ color: '#7B9BDB' }}>Cztery filary automatyzacji Twojej firmy</p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SERVICES.map((service, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <TiltedCard
                tierLabel={service.tierLabel}
                title={service.title}
                description={service.description}
                price={service.price}
                features={service.features}
                accentColor={service.accentColor}
                featured={service.featured}
                badgeText={(service as any).badgeText}
                buttonText={(service as any).buttonText}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  const allTech = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <section className="py-20 overflow-hidden" style={{ backgroundColor: '#0B0F2E' }}>
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Technologie, na których budujemy</h2>
          </div>
        </FadeIn>
      </div>

      <div className="w-full">
        <Marquee speed={25} pauseOnHover={true} className="py-4">
          {allTech.map((tech, i) => (
            <div key={i} className="flex flex-col items-center px-8 mx-4 py-4 rounded-2xl transition-colors min-w-[180px]" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <h3 className="font-bold text-white text-base">{tech.name}</h3>
              <p className="text-xs" style={{ color: '#7B9BDB' }}>{tech.desc}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function ChannelsSection() {
  const allChannels = [...CHANNELS, ...CHANNELS, ...CHANNELS];

  return (
    <section className="py-16 overflow-hidden" style={{ backgroundColor: '#D6E4FF' }}>
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#0B0F2E' }}>Integracja z 20+ kanałami</h2>
            <p style={{ color: '#7B9BDB' }}>Twój agent AI działa tam, gdzie Ty i Twoi klienci</p>
          </div>
        </FadeIn>
      </div>

      <div className="w-full">
        <Marquee speed={20} pauseOnHover={true} className="py-4">
          {allChannels.map((channel, i) => (
            <div key={i} className="flex items-center justify-center px-10 mx-4 py-3 rounded-xl transition-all min-w-[160px] border" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(46,74,173,0.15)' }}>
              <span className="font-semibold text-sm" style={{ color: '#0B0F2E' }}>
                {channel}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

// Sekcja OpenClaw social proof
function OpenClawSection() {
  return (
    <section className="py-24" style={{ backgroundColor: '#D6E4FF' }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0B0F2E' }}>Budujemy na technologii, której ufa 339 000+ developerów</h2>
            <p style={{ color: '#7B9BDB' }}>OpenClaw — najszybciej rosnący open-source framework agentów AI na świecie</p>
          </div>
        </FadeIn>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {[
            { value: '339 000+', label: 'GitHub Stars' },
            { value: '50+', label: 'Integracji z aplikacjami' },
            { value: '100+', label: 'Community Skills na ClawHub' },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="rounded-2xl p-6 text-center border" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(46,74,173,0.12)' }}>
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#2E4AAD' }}>{stat.value}</div>
                <p style={{ color: '#7B9BDB' }}>{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {OPENCLAW_QUOTES.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="rounded-2xl p-6 hover:shadow-lg transition-shadow border h-full flex flex-col" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(46,74,173,0.12)' }}>
                <p className="mb-4 italic flex-1" style={{ color: '#0B0F2E' }}>&ldquo;{item.quote}&rdquo;</p>
                <p className="text-sm font-semibold" style={{ color: '#2E4AAD' }}>{item.author}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center text-sm" style={{ color: '#7B9BDB' }}>
            Infinity Tech jest oficjalnym partnerem wdrożeniowym OpenClaw w Polsce.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function TechnologySection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0B0F2E] via-[#1A2461] to-[#0B0F2E] text-white relative overflow-hidden">
      <Aurora colorStops={['#2E4AAD', '#7B9BDB', '#2E4AAD']} speed={0.8} blend={0.3} amplitude={1.2} />
      <Particles quantity={30} color="#7B9BDB" speed={0.5} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="inline-block px-4 py-2 rounded-full bg-[#7B9BDB]/20 text-[#D6E4FF] text-sm font-medium mb-4">
              Nasz silnik AI
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Technologia OpenCLAW</h2>
            <p className="text-xl text-slate-300 mb-8">
              Wykorzystujemy OpenCLAW - otwarty framework agentów AI, który łączy komunikację 
              z potężnymi modelami językowymi, zapewniając autonomiczne działanie 24/7.
            </p>
            
            <div className="space-y-4">
              {[
                'Autonomiczne działanie 24/7',
                'Integracja z 15+ platformami',
                'Modele: ChatGPT, Claude, Gemini',
                'Pełna kontrola i bezpieczeństwo',
                'Self-hosted rozwiązania'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="rounded-3xl overflow-hidden border border-white/10">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-white/40 font-mono">openclaw-agent.ts</span>
              </div>

              {/* Terminal body */}
              <div className="p-4 md:p-6 font-mono text-xs md:text-sm space-y-3" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#2E4AAD' }}>▸</span>
                  <span className="text-white/50">Inicjalizacja agenta...</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#2E4AAD' }}>▸</span>
                  <span className="text-white/50">Łączenie z GPT-4o + Claude...</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#2E4AAD' }}>▸</span>
                  <span className="text-white/50">Integracja: Slack, Teams, CRM...</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#2E4AAD' }}>▸</span>
                  <span className="text-white/50">Agent aktywny — tryb 24/7</span>
                  <span className="text-green-400">✓</span>
                </div>

                <div className="pt-3 mt-3 border-t border-white/10 space-y-2">
                  <div className="text-white/30 text-xs">{/* live stats */}</div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Obsłużone zapytania</span>
                    <span className="font-bold" style={{ color: '#2E4AAD' }}>12 847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Średni czas odpowiedzi</span>
                    <span className="font-bold" style={{ color: '#2E4AAD' }}>1.2s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Zadowolenie klientów</span>
                    <span className="font-bold" style={{ color: '#2E4AAD' }}>97.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Uptime</span>
                    <span className="font-bold text-green-400">99.99%</span>
                  </div>
                </div>

                <div className="pt-3 mt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs">Agent działa — wszystkie systemy operacyjne</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-24 bg-[#D6E4FF]">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#0B0F2E]">Częste Pytania</h2>
            <p className="text-xl text-[#7B9BDB]">Odpowiedzi na najczęściej zadawane pytania</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Accordion items={FAQ_ITEMS} />
        </FadeIn>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });

  return (
    <section id="kontakt" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#0B0F2E]">Porozmawiajmy o Twoim projekcie</h2>
            <p className="text-xl text-[#7B9BDB] mb-8">
              Skontaktuj się z nami, a przygotujemy darmową wycenę w ciągu 24 godzin.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D6E4FF] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#2E4AAD]" />
                </div>
                <div>
                  <p className="text-sm text-[#7B9BDB]">Email</p>
                  <p className="font-medium text-[#0B0F2E]">contact@infinityteam.io</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D6E4FF] flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#2E4AAD]" />
                </div>
                <div>
                  <p className="text-sm text-[#7B9BDB]">Telefon</p>
                  <p className="font-medium text-[#0B0F2E]">+48 123 456 789</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D6E4FF] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#2E4AAD]" />
                </div>
                <div>
                  <p className="text-sm text-[#7B9BDB]">Lokalizacja</p>
                  <p className="font-medium text-[#0B0F2E]">Zamość, Polska</p>
                </div>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-[#D6E4FF]">
              <p className="text-sm text-[#7B9BDB] mb-4">Zaufali nam:</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#D6E4FF] rounded-lg">
                  <Shield className="w-5 h-5 text-[#2E4AAD]" />
                  <span className="text-xs text-[#1A2461]">SSL Secured</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#D6E4FF] rounded-lg">
                  <Shield className="w-5 h-5 text-[#2E4AAD]" />
                  <span className="text-xs text-[#1A2461]">RODO/GDPR</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#D6E4FF] rounded-lg">
                  <Shield className="w-5 h-5 text-[#7B9BDB]" />
                  <span className="text-xs text-[#1A2461]">ISO 27001</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <form className="glass rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#0B0F2E] mb-2">Imię i nazwisko</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-[#D6E4FF] focus:border-[#2E4AAD] focus:ring-2 focus:ring-[#7B9BDB] outline-none transition-all"
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B0F2E] mb-2">Email</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-[#D6E4FF] focus:border-[#2E4AAD] focus:ring-2 focus:ring-[#7B9BDB] outline-none transition-all"
                    placeholder="jan@firma.pl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B0F2E] mb-2">Telefon (opcjonalnie)</label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({...formState, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-[#D6E4FF] focus:border-[#2E4AAD] focus:ring-2 focus:ring-[#7B9BDB] outline-none transition-all"
                    placeholder="+48 000 000 000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B0F2E] mb-2">Wiadomość</label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-[#D6E4FF] focus:border-[#2E4AAD] focus:ring-2 focus:ring-[#7B9BDB] outline-none transition-all resize-none"
                    placeholder="Opisz swój projekt..."
                  />
                </div>
                    <Ripple className="w-full py-4 bg-[#2E4AAD] text-white text-lg flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Wyślij wiadomość
                </Ripple>
              </div>
            </form>
          </FadeIn>
        </div>
        
        {/* Google Maps */}
        <div className="mt-12">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://maps.google.com/maps?q=Rynek+Wielki+Zamość&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokalizacja Infinity Tech"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <AnimatedGradient className="absolute inset-0" colors={['#0B0F2E', '#2E4AAD', '#1A2461', '#0B0F2E']} />
      <Aurora colorStops={['#2E4AAD', '#7B9BDB', '#2E4AAD']} speed={1} blend={0.2} amplitude={0.8} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">Gotowy na Transformację?</h2>
          <p className="text-xl text-white/80 mb-8">Dołącz do firm, które już oszczędzają czas i pieniądze z Infinity Tech</p>
          <a href="#kontakt">
            <Ripple className="px-10 py-5 bg-[#D6E4FF] text-[#0B0F2E] text-lg font-semibold">
              Umów Bezpłatną Konsultację
            </Ripple>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 bg-[#0B0F2E] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold gradient-text mb-4">Infinity Tech</div>
            <p className="text-[#7B9BDB] mb-6">
              Tworzymy przyszłość biznesu z AI. Automatyzujemy, optymalizujemy, transformujemy.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/infinitytechgroup/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1A2461] flex items-center justify-center hover:bg-[#2E4AAD] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/InfinityTech_PL" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1A2461] flex items-center justify-center hover:bg-[#2E4AAD] transition-colors">
                <XIcon className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@infinitytech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1A2461] flex items-center justify-center hover:bg-[#2E4AAD] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://wa.me/infinitytech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1A2461] flex items-center justify-center hover:bg-[#2E4AAD] transition-colors">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://t.me/infinitytech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1A2461] flex items-center justify-center hover:bg-[#2E4AAD] transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Na skróty</h4>
            <ul className="space-y-2 text-[#7B9BDB]">
              <li><a href="#start" className="hover:text-white transition-colors">Start</a></li>
              <li><a href="#o-nas" className="hover:text-white transition-colors">O nas</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#kontakt" className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Usługi</h4>
            <ul className="space-y-2 text-[#7B9BDB]">
              <li><a href="#" className="hover:text-white transition-colors">Starter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Professional</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Konsultacje</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-[#7B9BDB] mb-4">Zapisz się, aby otrzymywać najnowsze informacje o AI.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Twój email"
                className="flex-1 px-4 py-3 rounded-l-lg bg-[#1A2461] border border-[#1A2461] text-white outline-none focus:border-[#2E4AAD]"
              />
              <button className="px-4 py-3 bg-[#2E4AAD] rounded-r-lg hover:bg-[#1A2461] transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#1A2461] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#7B9BDB] text-sm">© 2026 Infinity Tech. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6 text-sm text-[#7B9BDB]">
            <a href="#" className="hover:text-white transition-colors">Polityka Prywatności</a>
            <a href="#" className="hover:text-white transition-colors">Regulamin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: { label: string; ariaLabel: string; link: string }[] = [
    { label: 'Start', ariaLabel: 'Przejdź do sekcji start', link: '#start' },
    { label: 'O nas', ariaLabel: 'Dowiedz się więcej o nas', link: '#o-nas' },
    { label: 'Agenci AI', ariaLabel: 'Zobacz naszych agentów AI', link: '/agents' },
    { label: 'Usługi', ariaLabel: 'Zobacz nasze usługi', link: '#uslugi' },
    { label: 'Blog', ariaLabel: 'Przeczytaj naszego bloga', link: '/blog' },
    { label: 'Case Studies', ariaLabel: 'Zobacz case studies', link: '/case-studies' },
    { label: 'Kalkulator ROI', ariaLabel: 'Oblicz ROI automatyzacji', link: '/kalkulator' },
    { label: 'FAQ', ariaLabel: 'Częste pytania', link: '#faq' },
    { label: 'Kontakt', ariaLabel: 'Skontaktuj się z nami', link: '#kontakt' }
  ];

  const socialItems: { label: string; link: string }[] = [
    { label: 'LinkedIn', link: 'https://www.linkedin.com/company/infinitytechgroup/?viewAsMember=true' },
    { label: 'Twitter', link: 'https://x.com/InfinityTech_PL' },
    { label: 'GitHub', link: 'https://github.com' }
  ];

  return (
    <ClickSpark sparkColor="#7B9BDB" sparkSize={12} sparkRadius={20} sparkCount={8} duration={500}>
    <div className="min-h-screen bg-white text-[#0B0F2E]">
      {/* Navigation - StaggeredMenu */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, pointerEvents: 'none' }}>
        <StaggeredMenu
          isFixed={true}
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ffffff"
          changeMenuColorOnOpen={true}
          colors={['#0B0F2E', '#1A2461', '#2E4AAD']}
          logoUrl="/logo.png"
          accentColor="#2E4AAD"
          className=""
          onMenuOpen={() => {}}
          onMenuClose={() => {}}
        />
      </div>

      <main>
        <div id="start">
          <HeroSection />
        </div>
        
        <StatsSection />

        <div id="uslugi">
          <ServicesSection />
        </div>

        <div id="o-nas">
          <BenefitsSection />
        </div>
        
        {/* TODO: włącz Video Demo Section gdy będzie gotowe prawdziwe wideo */}
        {/*
        <section className="py-24 bg-[#D6E4FF]">
          <div className="max-w-6xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0B0F2E]">Zobacz jak działamy</h2>
                <p className="text-[#7B9BDB]">Krótki film prezentujący nasze rozwiązania AI</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-[#0B0F2E]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0"
                  title="Infinity Tech Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </FadeIn>
          </div>
        </section>
        */}
        
        {/* TODO: włącz TeamSection gdy będą gotowe prawdziwe dane zespołu */}
        {/* <TeamSection /> */}
        
        <TechStackSection />

        <ChannelsSection />
        
        <OpenClawSection />
        
        <TechnologySection />
        
        <div id="faq">
          <FAQSection />
        </div>
        
        <ContactSection />
        
        <CTASection />
      </main>

      <Footer />
      
      <ChatWidget />
    </div>
    </ClickSpark>
  );
}
