'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  Lightbulb,
  ChevronDown
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
import StarBorder from '@/components/StarBorder';
import ClickSpark from '@/components/react-bits/ClickSpark';
import dynamic from 'next/dynamic';
const Background3D = dynamic(() => import('@/components/Background3D'), { ssr: false });
const HeroGlobe = dynamic(() => import('@/components/HeroGlobe'), { ssr: false });
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
    accentColor: '#4F6AE8',
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
const CHANNELS: { name: string; icon: string }[] = [
  { name: 'WhatsApp', icon: 'https://cdn.simpleicons.org/whatsapp' },
  { name: 'Telegram', icon: 'https://cdn.simpleicons.org/telegram' },
  { name: 'Slack', icon: '' },
  { name: 'Discord', icon: 'https://cdn.simpleicons.org/discord' },
  { name: 'Google Chat', icon: 'https://cdn.simpleicons.org/googlechat' },
  { name: 'Signal', icon: 'https://cdn.simpleicons.org/signal' },
  { name: 'iMessage', icon: 'https://cdn.simpleicons.org/imessage' },
  { name: 'MS Teams', icon: '' },
  { name: 'Matrix', icon: 'https://cdn.simpleicons.org/matrix' },
  { name: 'LINE', icon: 'https://cdn.simpleicons.org/line' },
  { name: 'Mattermost', icon: 'https://cdn.simpleicons.org/mattermost' },
  { name: 'Nextcloud', icon: 'https://cdn.simpleicons.org/nextcloud' },
  { name: 'Nostr', icon: '' },
  { name: 'Twitch', icon: 'https://cdn.simpleicons.org/twitch' },
  { name: 'Zalo', icon: '' },
  { name: 'WeChat', icon: 'https://cdn.simpleicons.org/wechat' },
  { name: 'WebChat', icon: '' },
  { name: 'IRC', icon: '' },
  { name: 'Feishu', icon: '' },
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

// OpenClaw quotes — rotating carousel
const QUOTE_AVATARS: Record<string, string> = {
  'Jensen Huang': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Jen-Hsun_Huang_2025.jpg/250px-Jen-Hsun_Huang_2025.jpg',
  'Sam Altman': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Sam_Altman_TechCrunch_SF_2019_Day_2_Oct_3_%28cropped_3%29.jpg/250px-Sam_Altman_TechCrunch_SF_2019_Day_2_Oct_3_%28cropped_3%29.jpg',
  'Peter Steinberger': 'https://steipete.me/peter-avatar.jpg',
  'Mustafa Suleyman': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Mustafa_Suleyman_photo_%28cropped%29.jpg/250px-Mustafa_Suleyman_photo_%28cropped%29.jpg',
};

const OPENCLAW_QUOTES = [
  {
    quote: 'OpenClaw to system operacyjny dla osobistego AI. To moment, na który branża czekała — początek nowego renesansu oprogramowania.',
    author: 'Jensen Huang',
    role: 'CEO NVIDIA'
  },
  {
    quote: 'Peter Steinberger to geniusz z niesamowitymi pomysłami na przyszłość inteligentnych agentów współpracujących ze sobą.',
    author: 'Sam Altman',
    role: 'CEO OpenAI'
  },
  {
    quote: 'OpenClaw przybliża ludzi do AI i pomaga budować świat, w którym każdy ma własnych agentów.',
    author: 'Peter Steinberger',
    role: 'Twórca OpenClaw'
  },
  {
    quote: 'OpenClaw otworzył nową granicę AI dla wszystkich i stał się najszybciej rosnącym projektem open source w historii.',
    author: 'Jensen Huang',
    role: 'CEO NVIDIA'
  },
  {
    quote: 'Claude Code i OpenClaw wywołały punkt przełomowy agentów — rozszerzając AI poza generowanie i rozumowanie, w stronę działania.',
    author: 'Jensen Huang',
    role: 'CEO NVIDIA'
  },
  {
    quote: 'AI nie zastąpi ludzi, ale ludzie korzystający z AI zastąpią tych, którzy tego nie robią.',
    author: 'Mustafa Suleyman',
    role: 'CEO Microsoft AI'
  },
  {
    quote: 'Chcę stworzyć agenta AI, którego nawet moja mama potrafi używać.',
    author: 'Peter Steinberger',
    role: 'Twórca OpenClaw'
  },
  {
    quote: 'Kocham ducha wszystkiego, co reprezentuje OpenClaw.',
    author: 'Sam Altman',
    role: 'CEO OpenAI'
  },
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
    <section
      className="flex flex-col relative overflow-hidden"
      style={{
        minHeight: 'calc(100vh + 250px)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black calc(100% - 250px), transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black calc(100% - 250px), transparent 100%)',
      }}
    >
      {/* Rotating globe video — blue-tinted */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.55) saturate(0.15) sepia(1) hue-rotate(190deg)' }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
          type="video/mp4"
        />
      </video>
      {/* Dark blue overlay for brand color matching */}
      <div className="absolute inset-0 bg-[#0B0F2E]/50 z-[1]" />

      {/* Fog layers at transition zone */}
      <div className="absolute inset-x-0 bottom-0 h-[300px] z-[3] pointer-events-none overflow-hidden">
        <div className="absolute w-[120%] h-[300px] left-[-10%]" style={{ background: 'radial-gradient(ellipse at center, rgba(46,74,173,0.15) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'fogDrift1 20s infinite alternate ease-in-out' }} />
        <div className="absolute w-[80%] h-[200px] right-[-10%] top-[20px]" style={{ background: 'radial-gradient(ellipse at center, rgba(123,155,219,0.1) 0%, transparent 60%)', filter: 'blur(40px)', animation: 'fogDrift2 25s infinite alternate-reverse ease-in-out' }} />
      </div>

      {/* All hero content pinned to first 100vh */}
      <div className="relative z-10 flex flex-col w-full" style={{ height: '100vh' }}>
        {/* Centered content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto px-6 pt-24 pb-12 text-center">
          <div className="text-[0.6rem] sm:text-xs md:text-sm lg:text-xl xl:text-2xl 2xl:text-2xl tracking-wider md:tracking-widest uppercase mb-4 px-4 text-[#8BB8E8] whitespace-nowrap" style={{ fontFamily: 'var(--font-geist)' }}>
            <SplitText
              text="Rewolucja AI już trwa — konkurencja nie śpi"
              tag="span"
              className="inline"
              duration={1}
              delay={40}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-5 leading-tight text-white" style={{ fontFamily: 'var(--font-geist)' }}>
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
            <p className="text-base md:text-lg xl:text-xl 2xl:text-2xl mb-7 max-w-lg xl:max-w-2xl mx-auto text-white/80 px-2">
              Wykorzystaj potęgę agentów AI OpenCLAW, aby zautomatyzować procesy, zwiększyć efektywność i skupić się na tym, co naprawdę napędza rozwój Twojej firmy.
            </p>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#kontakt" className="w-full sm:w-auto">
                <Ripple className="w-full px-6 py-3 md:px-8 md:py-4 xl:px-10 xl:py-5 text-white text-base md:text-lg xl:text-xl bg-[#2E4AAD] hover:bg-[#1A2461] btn-grain border-2 border-[#2E4AAD]">
                  Umów konsultację
                </Ripple>
              </a>
              <a href="/case-studies" className="px-6 py-3 md:px-8 md:py-4 xl:px-10 xl:py-5 border-2 rounded-full font-semibold text-base md:text-lg xl:text-xl transition-all flex items-center justify-center gap-2 border-white/30 text-white hover:bg-white/10">
                Dowiedz się więcej
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Bottom section — social icons left + quote centered */}
        <div className="px-6 md:px-12 lg:px-20 pb-8">
        {/* Social icons — bottom left */}
        <div className="liquid-glass flex gap-2 items-center rounded-full px-2 py-1.5 mx-auto md:mx-0 mb-5 md:mb-0 md:absolute md:bottom-8 md:left-[2em] w-fit" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
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
      {/* end 100vh wrapper */}
      </div>
    </section>

    </>
  );
}

function StatsSection() {
  return (
    <section className="pt-8 pb-16 -mt-[250px] relative z-[5]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#7B9BDB]" />
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 text-white">
                  {/^\d+$/.test(stat.value) ? (
                    <AnimatedCounter end={parseInt(stat.value)} suffix={stat.suffix} />
                  ) : (
                    <span>{stat.value}{stat.suffix}</span>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection2() {
  const matteGlow = 'rgba(79,106,232,0.3)';
  const matteGradient = 'linear-gradient(145deg, #0A1628 0%, #152040 100%)';
  const team = [
    { name: 'Cezary Gąsior', title: 'CEO & Founder', handle: 'ceo', avatar: '/images/cezary-gasior.jpg', bio: 'Wizjoner i strateg z doświadczeniem w AI i transformacji cyfrowej.', glow: matteGlow, gradient: matteGradient },
    { name: 'Krzysztof Stoczkowski', title: 'Co-Founder', handle: 'cofounder', avatar: 'https://i.pravatar.cc/400?img=52', bio: 'Współzałożyciel Infinity Tech, odpowiada za strategię i rozwój firmy.', glow: matteGlow, gradient: matteGradient },
    { name: 'Tomasz Pędzierski', title: 'Co-Founder', handle: 'bizdev', avatar: '/images/tomasz-pedzierski.jpg', bio: 'Współzałożyciel Infinity Tech, buduje relacje z klientami enterprise i rozwija nowe partnerstwa biznesowe.', glow: matteGlow, gradient: matteGradient },
    { name: 'Artur Seredziuk', title: 'Co-Founder', handle: 'account', avatar: '/images/artur-seredziuk.png', bio: 'Współzałożyciel Infinity Tech, odpowiada za sprzedaż i pozyskiwanie klientów.', glow: matteGlow, gradient: matteGradient, avatarStyle: { objectPosition: '50% 5%' } },
    { name: 'Tobias Guanyi Du', title: 'Developer', handle: 'dev', avatar: '/images/tobias-guanyi-du.jpg', bio: 'Odpowiada za implementację i rozwój techniczny agentów AI.', glow: matteGlow, gradient: matteGradient },
    { name: 'Kevin Kanak', title: 'Head of European Expansion', handle: 'expansion', avatar: '/images/kevin-kanak.png', bio: 'Odpowiada za ekspansję Infinity Tech na rynki Europy Centralnej.', glow: matteGlow, gradient: matteGradient },
  ];

  return (
    <section className="py-20">
      <div className="max-w-[82rem] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-center">
          {/* Left — cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {team.map((person, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <ProfileCard
                  name={person.name}
                  title={person.title}
                  handle={person.handle}
                  status="Infinity Tech"
                  avatarUrl={person.avatar}
                  showUserInfo={false}
                  enableTilt={true}
                  enableMobileTilt={false}
                  behindGlowEnabled={true}
                  behindGlowColor={person.glow}
                  innerGradient={person.gradient}
                  bio={person.bio}
                  contactText="Kontakt"
                  avatarStyle={(person as any).avatarStyle}
                />
              </FadeIn>
            ))}
          </div>

          {/* Right — motto */}
          <FadeIn delay={0.3}>
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-white">
                Nasz <span style={{ color: '#7B9BDB' }}>Zespół</span>
              </h2>
              <p className="text-white/50 text-xl mb-7">
                Ludzie, którzy stoją za Infinity Tech
              </p>
              <div className="h-px w-20 bg-[#7B9BDB]/30 mx-auto lg:mx-0 mb-7" />
              <p className="text-white/70 text-lg leading-relaxed">
                Łączymy ekspertyzę w AI, inżynierii oprogramowania i strategii biznesowej. Każdy z nas wnosi unikalne doświadczenie, ale łączy nas jedna misja — automatyzować firmy tak, by mogły rosnąć bez granic.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const cards = sectionRef.current?.querySelectorAll('.bento-card') as NodeListOf<HTMLElement>;
    if (!cards) return;
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
      const maxDist = 400;
      const intensity = Math.max(0, 1 - dist / maxDist);
      card.style.setProperty('--glow-x', `${x}%`);
      card.style.setProperty('--glow-y', `${y}%`);
      card.style.setProperty('--glow-intensity', intensity.toString());
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const cards = sectionRef.current?.querySelectorAll('.bento-card') as NodeListOf<HTMLElement>;
    if (!cards) return;
    cards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
  }, []);

  return (
    <section ref={sectionRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="pt-6 pb-24 relative overflow-hidden">
      {/* Bottom fade — disabled for transparent bg */}
      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob-1 absolute rounded-full" style={{ width: '300px', height: '300px', background: '#4F6AE8', opacity: 0.05, filter: 'blur(80px)', top: '10%', left: '-5%' }} />
        <div className="blob-2 absolute rounded-full" style={{ width: '250px', height: '250px', background: '#7B5CCC', opacity: 0.04, filter: 'blur(80px)', top: '50%', right: '-3%' }} />
        <div className="blob-3 absolute rounded-full" style={{ width: '280px', height: '280px', background: '#5B9BD5', opacity: 0.04, filter: 'blur(80px)', bottom: '-10%', left: '30%' }} />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Dlaczego <span style={{ color: '#7B9BDB' }}>Infinity Tech?</span>
            </h2>
            <p className="text-xl text-white/50">Dostarczamy rozwiązania dopasowane do Twojej firmy</p>
          </div>
        </FadeIn>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1 */}
          <FadeIn delay={0} className="md:col-span-2">
            <div className="bento-card relative overflow-hidden rounded-2xl p-8 shadow-md h-full" style={{ minHeight: '220px' }}>
              {/* Animated gears */}
              <div className="absolute top-4 right-4 bento-gear-1" style={{ width: '48px', height: '48px' }}>
                <Settings className="w-full h-full" style={{ color: '#6B8DE3', opacity: 0.45 }} />
              </div>
              <div className="absolute top-4 right-16 bento-gear-2" style={{ width: '32px', height: '32px' }}>
                <Settings className="w-full h-full" style={{ color: '#9B7CE8', opacity: 0.4 }} />
              </div>
              <div className="absolute top-12 right-8 bento-gear-3" style={{ width: '24px', height: '24px' }}>
                <Settings className="w-full h-full" style={{ color: '#7B9BDB', opacity: 0.45 }} />
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
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Poznaj Nasz Zespół</h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
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
    <section className="pt-24 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">Co <ShinyText text="robimy" /></h2>
            <p className="text-xl text-white/50">Cztery filary automatyzacji Twojej firmy</p>
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

function TechBentoSection() {
  const allChannels = [...CHANNELS, ...CHANNELS, ...CHANNELS];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">Nasz stack technologiczny</h2>
            <p style={{ color: '#7B9BDB' }}>Technologie i 23+ kanałów komunikacji</p>
          </div>
        </FadeIn>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Row 1: OpenClaw (2/3) + Hetzner (1/3) */}
          <FadeIn delay={0} className="md:col-span-2">
            <div className="tech-tile relative overflow-hidden rounded-2xl p-6 h-full" style={{ background: 'linear-gradient(135deg, #0f1729, #1a1f3a)', minHeight: '140px' }}>
              <div className="tech-blob-oc absolute rounded-full" style={{ width: '200px', height: '200px', background: 'radial-gradient(circle, #4F6AE8, #7B5CCC)', opacity: 0.15, filter: 'blur(60px)', top: '-30px', right: '-30px' }} />
              <span className="absolute top-5 right-5 text-4xl z-10">🦞</span>
              <div className="relative z-10 flex flex-col justify-end h-full">
                <h3 className="text-2xl font-bold text-white mb-1">OpenClaw</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>AI Agent Framework</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="tech-tile relative overflow-hidden rounded-2xl p-6 h-full" style={{ background: 'linear-gradient(135deg, #0f1729, #1a2040)', minHeight: '140px' }}>
              <div className="absolute top-5 right-5 z-10">
                <div className="tech-ping">
                  <div className="tech-ping-ring" />
                  <div className="tech-ping-dot" />
                </div>
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full">
                <h3 className="text-xl font-extrabold tracking-wide mb-1" style={{ color: '#D50C2D' }}>HETZNER</h3>
                <p className="text-white/60">Cloud Infrastructure</p>
              </div>
            </div>
          </FadeIn>

          {/* Row 2: Stripe + Vercel + MiniMax (1/3 each) */}
          <FadeIn delay={0.15}>
            <div className="tech-tile relative overflow-hidden rounded-2xl p-6 h-full" style={{ background: 'linear-gradient(135deg, #635BFF, #7A73FF)', minHeight: '140px' }}>
              <div className="tech-coins absolute pointer-events-none" style={{ right: '20px', top: '20px', width: '40px', height: '50px' }}>
                <span className="tech-coin tech-coin-1">$</span>
                <span className="tech-coin tech-coin-2">$</span>
                <span className="tech-coin tech-coin-3">$</span>
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full">
                <h3 className="text-2xl font-bold text-white mb-1" style={{ letterSpacing: '-0.02em' }}>stripe</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>Payments</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="tech-tile relative overflow-hidden rounded-2xl p-6 h-full flex flex-col justify-between" style={{ background: '#000', minHeight: '140px' }}>
              <div className="tech-vercel-logo absolute pointer-events-none" style={{ right: '20px', top: '20px', width: '40px', height: '40px' }}>
                <svg viewBox="0 0 76 65" fill="white" style={{ opacity: 0.15 }}><path d="M37.5 0L75 65H0L37.5 0z" /></svg>
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full">
                <h3 className="text-xl font-bold text-white mb-1">Vercel</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Hosting &amp; Deploy</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="tech-tile relative overflow-hidden rounded-2xl p-6 h-full" style={{ background: 'linear-gradient(135deg, #0f1729, #1a2461)', minHeight: '140px' }}>
              <div className="tech-neurons absolute pointer-events-none" style={{ right: '20px', top: '20px' }}>
                <div className="tech-neuron tech-neuron-1" />
                <div className="tech-neuron tech-neuron-2" />
                <div className="tech-neuron tech-neuron-3" />
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full">
                <h3 className="text-xl font-semibold text-white mb-1">MiniMax</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>AI Models</p>
              </div>
            </div>
          </FadeIn>

          {/* Row 3: Channels (full width) */}
          <FadeIn delay={0.3} className="md:col-span-3">
            <div className="tech-tile relative overflow-hidden rounded-2xl py-10" style={{ background: 'linear-gradient(135deg, #0f1729, #1a1f3a)' }}>
              <div className="px-8 mb-6 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">23+ kanałów komunikacji</h3>
                <p className="text-base text-white/60">Twój agent AI działa tam, gdzie Ty i Twoi klienci</p>
              </div>
              <Marquee speed={25} pauseOnHover={true} direction="right" className="py-2">
                {allChannels.map((ch, i) => (
                  <div key={i} className="flex items-center gap-2 mx-4 whitespace-nowrap">
                    {ch.name === 'Slack' ? (
                      <svg className="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="#7B9BDB"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.124 2.521a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312zm-2.521 10.124a2.528 2.528 0 0 1 2.521 2.52A2.528 2.528 0 0 1 15.166 24a2.528 2.528 0 0 1-2.521-2.522v-2.52h2.521zm0-1.271a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.521h6.312A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.521h-6.312z"/></svg>
                    ) : ch.name === 'MS Teams' ? (
                      <svg className="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="#7B9BDB"><path d="M20.625 8.5h-1.5V6.25a1.875 1.875 0 0 0-1.875-1.875h-.375a2.625 2.625 0 1 0-3.75-1.453V4.5H9.75A1.875 1.875 0 0 0 7.875 6.375V13.5a1.875 1.875 0 0 0 1.875 1.875h5.625A1.875 1.875 0 0 0 17.25 13.5v-.75h1.5a1.125 1.125 0 0 0 1.125-1.125v-2A1.125 1.125 0 0 0 20.625 8.5zM17.25 3.375a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25zM6 8.5H2.25A1.125 1.125 0 0 0 1.125 9.625v4.5A1.125 1.125 0 0 0 2.25 15.25h1.5v2.625a.375.375 0 0 0 .638.265L6.75 15.25H7.5V9.625A1.125 1.125 0 0 0 6 8.5z"/></svg>
                    ) : ch.icon ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={ch.icon} alt={ch.name} width={18} height={18} className="flex-shrink-0" />
                    ) : (
                      <span className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ backgroundColor: '#4F6AE8' }}>{ch.name.charAt(0)}</span>
                    )}
                    <span className="font-medium text-sm text-white/80">{ch.name}</span>
                  </div>
                ))}
              </Marquee>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

// Sekcja OpenClaw social proof — milestones + scrolling quotes
function OpenClawSection() {
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote(prev => (prev + 1) % OPENCLAW_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="text-center mb-8 md:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-white">Budujemy na technologii, która zmieniła reguły gry</h2>
            <p className="text-white/50">OpenClaw — od weekendowego projektu do #1 na GitHubie w 60 dni</p>
          </div>
        </FadeIn>

        {/* Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-10 items-stretch">
          <FadeIn delay={0} className="h-full">
            <div className="rc-card rc-glow-1 rounded-[20px] p-4 flex flex-col overflow-hidden h-full" style={{ background: 'rgba(15,20,45,0.9)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 0 0 1000px rgba(79,95,213,0.1)', maxHeight: '160px' }}>
              <div className="flex items-center gap-2 mb-2 relative z-[2]">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>★</span>
                <span className="text-white/60 font-medium text-xs">Developerów na GitHubie</span>
              </div>
              <div className="flex-1 flex items-center justify-center relative z-[2]">
                <span className="text-4xl font-extrabold rc-num">340k+</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="h-full">
            <div className="rc-card rc-glow-2 rounded-[20px] p-4 flex flex-col overflow-hidden h-full" style={{ background: 'rgba(15,20,45,0.9)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 0 0 1000px rgba(59,125,216,0.1)', maxHeight: '160px' }}>
              <div className="flex items-center gap-2 mb-2 relative z-[2]">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>👁</span>
                <span className="text-white/60 font-medium text-xs">Wyświetleń w social media</span>
              </div>
              <div className="flex-1 flex items-center justify-center relative z-[2]">
                <span className="text-4xl font-extrabold rc-num">500M+</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="h-full">
            <div className="rc-card rc-glow-3 rounded-[20px] p-4 flex flex-col overflow-hidden h-full" style={{ background: 'rgba(15,20,45,0.9)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 0 0 1000px rgba(91,79,207,0.1)', maxHeight: '160px' }}>
              <div className="flex items-center gap-2 mb-2 relative z-[2]">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>📈</span>
                <span className="text-white/60 font-medium text-xs">Od zera do #1 na świecie</span>
              </div>
              <div className="flex-1 flex items-center justify-center relative z-[2]">
                <span className="text-4xl font-extrabold rc-num">1 Tydzień</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Auto-scrolling quote carousel */}
        <FadeIn delay={0.5}>
          <div className="relative overflow-hidden rounded-2xl min-h-[200px] md:min-h-[240px]" style={{ background: 'rgba(15,20,45,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {OPENCLAW_QUOTES.map((item, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col items-center justify-start px-4 sm:px-8 md:px-16 pt-5 md:pt-8 pb-12 md:pb-16 text-center transition-all duration-700 ease-in-out"
                style={{
                  opacity: activeQuote === i ? 1 : 0,
                  transform: activeQuote === i ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
                  pointerEvents: activeQuote === i ? 'auto' : 'none',
                }}
              >
                <span className="text-2xl md:text-4xl leading-none select-none mb-2 md:mb-3" style={{ color: 'rgba(123,155,219,0.3)' }}>&ldquo;</span>
                <p className="italic text-sm md:text-lg leading-relaxed text-white/80 max-w-3xl">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={QUOTE_AVATARS[item.author] || ''}
                    alt={item.author}
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0 object-cover w-8 h-8 md:w-10 md:h-10"
                    style={{ border: '2px solid rgba(123,155,219,0.25)', filter: 'brightness(0.85) saturate(0.4) sepia(0.15) hue-rotate(190deg)' }}
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold text-white">{item.author}</span>
                    <span className="text-[11px] text-[#7B9BDB]">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Dot indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {OPENCLAW_QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuote(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: activeQuote === i ? '#7B9BDB' : 'rgba(255,255,255,0.15)',
                    transform: activeQuote === i ? 'scale(1.3)' : 'scale(1)',
                    boxShadow: activeQuote === i ? '0 0 8px rgba(123,155,219,0.5)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.7}>
          <p className="text-center text-sm text-white/40 mt-8">
            Infinity Tech jest oficjalnym partnerem wdrożeniowym OpenClaw w Polsce.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function TechnologySection() {
  return (
    <section className="py-12 md:py-24 text-white relative overflow-hidden">
      <Aurora colorStops={['#2E4AAD', '#7B9BDB', '#2E4AAD']} speed={0.8} blend={0.3} amplitude={1.2} />
      <Particles quantity={30} color="#7B9BDB" speed={0.5} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Częste <span style={{ color: '#7B9AFF' }}>Pytania</span>
            </h2>
            <p className="text-xl text-white/50">Odpowiedzi na najczęściej zadawane pytania</p>
          </div>
        </FadeIn>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <StarBorder color="#7B9AFF" speed="8s" thickness={1}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-white/[0.03]"
                >
                  <span className="font-medium text-white pr-4">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                    style={{ color: '#7B9AFF' }}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-5 pb-5 text-white/70 text-sm leading-relaxed">{item.answer}</p>
                </div>
              </StarBorder>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTASection() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });

  return (
    <section id="kontakt">

      <div>
        {/* Header */}
        <div className="text-center pt-20 pb-12 px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">Gotowy na Transformację?</h2>
            <p className="text-xl max-w-2xl mx-auto text-white/50">Dołącz do firm, które już oszczędzają czas i pieniądze z Infinity Tech</p>
          </FadeIn>
        </div>

        {/* Two columns: form + map */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
          <div className="grid lg:grid-cols-2 gap-5 items-stretch">
            {/* Left — Form */}
            <FadeIn delay={0.2} className="h-full">
              <div className="rounded-2xl overflow-hidden h-full flex flex-col" style={{ border: '1px solid rgba(123,155,219,0.15)' }}>
                <div className="px-6 py-3" style={{ backgroundColor: 'rgba(123,155,219,0.08)' }}>
                  <p className="text-[13px] uppercase tracking-widest text-[#7B9BDB]">Napisz do nas</p>
                </div>
                <div className="flex-1 p-4 flex flex-col" style={{ backgroundColor: 'rgba(10,22,40,0.8)' }}>
                  <form className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">Imię i nazwisko</label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm focus:border-[#2E4AAD] focus:ring-2 focus:ring-[#7B9BDB]/30 outline-none transition-all placeholder:text-white/30"
                        placeholder="Jan Kowalski"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">Email</label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm focus:border-[#2E4AAD] focus:ring-2 focus:ring-[#7B9BDB]/30 outline-none transition-all placeholder:text-white/30"
                        placeholder="jan@firma.pl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">Telefon (opcjonalnie)</label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm focus:border-[#2E4AAD] focus:ring-2 focus:ring-[#7B9BDB]/30 outline-none transition-all placeholder:text-white/30"
                        placeholder="+48 000 000 000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">Wiadomość</label>
                      <textarea
                        value={formState.message}
                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                        rows={2}
                        className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white focus:border-[#2E4AAD] focus:ring-2 focus:ring-[#7B9BDB]/30 outline-none transition-all resize-none placeholder:text-white/30"
                        style={{ minHeight: '50px', maxHeight: '50px' }}
                        placeholder="Opisz swój projekt..."
                      />
                    </div>
                    <Ripple className="w-full py-2.5 bg-[#2E4AAD] text-white text-sm font-medium flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Wyślij wiadomość
                    </Ripple>
                  </form>

                  {/* Contact info */}
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 flex-shrink-0 text-[#7B9BDB]" />
                        <span className="text-sm text-white/70">contact@infinityteam.io</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 flex-shrink-0 text-[#7B9BDB]" />
                        <span className="text-sm text-white/70">+48 123 456 789</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 flex-shrink-0 text-[#7B9BDB]" />
                        <span className="text-sm text-white/70">Zamość, woj. lubelskie, Polska</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md" style={{ backgroundColor: 'rgba(46,74,173,0.15)' }}>
                        <Shield className="w-3.5 h-3.5 text-[#7B9BDB]" />
                        <span className="text-[11px] font-medium text-[#7B9BDB]">SSL Secured</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md" style={{ backgroundColor: 'rgba(46,74,173,0.15)' }}>
                        <Shield className="w-3.5 h-3.5 text-[#7B9BDB]" />
                        <span className="text-[11px] font-medium text-[#7B9BDB]">RODO/GDPR</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md" style={{ backgroundColor: 'rgba(46,74,173,0.15)' }}>
                        <Shield className="w-3.5 h-3.5 text-[#7B9BDB]" />
                        <span className="text-[11px] font-medium text-[#7B9BDB]">ISO 27001</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right — Map */}
            <FadeIn delay={0.4} className="h-full">
              <div className="rounded-2xl overflow-hidden h-full flex flex-col" style={{ border: '1px solid rgba(123,155,219,0.15)' }}>
                <div className="px-6 py-3" style={{ backgroundColor: 'rgba(123,155,219,0.08)' }}>
                  <p className="text-[13px] uppercase tracking-widest text-[#7B9BDB]">Gdzie nas znajdziesz</p>
                </div>
                <div className="flex-1">
                  <iframe
                    src="https://maps.google.com/maps?ll=50.7167,23.2525&z=16&t=m&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '300px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokalizacja Infinity Tech"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold gradient-text mb-4">Infinity Tech</div>
            <p className="text-[#7B9BDB] mb-6">
              Tworzymy przyszłość biznesu z AI. Automatyzujemy, optymalizujemy, transformujemy.
            </p>
            <div className="flex gap-3">
              <a href="https://x.com/InfinityTech_PL" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <XIcon className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/infinitytechgroup/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:contact@infinityteam.io" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Na skróty</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[#7B9BDB]">
              <a href="#start" className="hover:text-white transition-colors text-sm">Start</a>
              <a href="/blog" className="hover:text-white transition-colors text-sm">Blog</a>
              <a href="#o-nas" className="hover:text-white transition-colors text-sm">O nas</a>
              <a href="/case-studies" className="hover:text-white transition-colors text-sm">Case Studies</a>
              <a href="#uslugi" className="hover:text-white transition-colors text-sm">Co robimy</a>
              <a href="/kalkulator" className="hover:text-white transition-colors text-sm">Kalkulator ROI</a>
              <a href="#faq" className="hover:text-white transition-colors text-sm">FAQ</a>
              <a href="#kontakt" className="hover:text-white transition-colors text-sm">Kontakt</a>
            </div>
          </div>
          
          {/* Usługi — ukryte, do przywrócenia */}
          {/*
          <div>
            <h4 className="font-semibold mb-4">Usługi</h4>
            <ul className="space-y-2 text-[#7B9BDB]">
              <li><a href="#" className="hover:text-white transition-colors">Starter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Professional</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Konsultacje</a></li>
            </ul>
          </div>
          */}
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-[#7B9BDB] mb-4">Zapisz się, aby otrzymywać najnowsze informacje o AI.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Twój email"
                className="flex-1 px-4 py-3 rounded-l-lg bg-white/5 border border-white/10 text-white outline-none focus:border-[#2E4AAD]"
              />
              <button className="px-4 py-3 bg-[#2E4AAD] rounded-r-lg hover:bg-[#1A2461] transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
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
    { label: 'Usługi', ariaLabel: 'Zobacz nasze usługi', link: '#uslugi' },
    { label: 'O nas', ariaLabel: 'Dowiedz się więcej o nas', link: '#o-nas' },
    { label: 'Kalkulator ROI', ariaLabel: 'Oblicz ROI automatyzacji', link: '/kalkulator' },
    { label: 'Kontakt', ariaLabel: 'Skontaktuj się z nami', link: '#kontakt' },
    { label: 'FAQ', ariaLabel: 'Częste pytania', link: '#faq' }
  ];

  const socialItems: { label: string; link: string }[] = [
    { label: 'X (Twitter)', link: 'https://x.com/InfinityTech_PL' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/company/infinitytechgroup/?viewAsMember=true' },
    { label: 'Email', link: 'mailto:contact@infinityteam.io' }
  ];

  return (
    <ClickSpark sparkColor="#7B9BDB" sparkSize={12} sparkRadius={20} sparkCount={8} duration={500}>
    <div className="min-h-screen text-white relative">
      {/* Full-page 3D background */}
      <Background3D />

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

      <main className="relative" style={{ zIndex: 1 }}>
        <div id="start">
          <HeroSection />
        </div>

        <StatsSection />

        <div id="uslugi">
          <ServicesSection />
        </div>

        <TeamSection2 />

        <div id="o-nas">
          <BenefitsSection />
        </div>

        <TechBentoSection />

        <OpenClawSection />

        <TechnologySection />

        <ContactCTASection />

        <div id="faq">
          <FAQSection />
        </div>
        <Footer />
      </main>

      <ChatWidget />

    </div>
    </ClickSpark>
  );
}
