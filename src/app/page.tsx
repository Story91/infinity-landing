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
  Download
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

// Usługi z cenami
const SERVICES = [
  {
    title: 'Starter',
    tierLabel: 'STARTER',
    description: 'Dla firm, które chcą zacząć automatyzację',
    price: '149',
    features: [
      'Jeden agent AI (np. chatbot)',
      'Automatyzacja do 3 procesów',
      'Integracja z e-mail i CRM',
      'Podstawowe raporty',
      'Wsparcie e-mail',
      'Panel zarządzania',
      'Aktualizacje co miesiąc'
    ],
    accentColor: '#7B9BDB',
    featured: false
  },
  {
    title: 'Pro',
    tierLabel: 'PRO',
    description: 'Pełna automatyzacja dla rosnących zespołów',
    price: '799',
    features: [
      'Wszystko ze Starter',
      'Do 5 agentów AI',
      'Automatyzacja HR i sprzedaży',
      'Zaawansowane analytics',
      'Integracja API (Slack, Teams)',
      'Dedykowany opiekun',
      'Priorytetowy support'
    ],
    accentColor: '#2E4AAD',
    featured: true
  },
  {
    title: 'Firma',
    tierLabel: 'FIRMA',
    description: 'Rozwiązania enterprise bez limitów',
    price: '3999',
    features: [
      'Wszystko z Pro',
      'Nielimitowani agenci AI',
      'Custom AI development',
      'Predictive analytics',
      'On-premise / dedykowany cloud',
      '24/7 support z SLA',
      'Szkolenia dla zespołu'
    ],
    accentColor: '#0B0F2E',
    featured: false
  }
];

// Partnerzy/Technologie
const PARTNERS = [
  { name: 'OpenCLAW', icon: Bot, desc: 'AI Agent Framework' },
  { name: 'ChatGPT', icon: Brain, desc: 'LLM Integration' },
  { name: 'Claude', icon: Sparkles, desc: 'AI Assistant' },
  { name: 'Google', icon: Globe, desc: 'Cloud & AI' }
];

// Nasi klienci - loga firm ktore korzystaja z uslug
const CLIENTS = [
  { name: 'PKO BP', color: 'bg-[#1A2461]' },
  { name: 'Orlen', color: 'bg-[#0B0F2E]' },
  { name: 'PepsiCo', color: 'bg-[#2E4AAD]' },
  { name: 'LPP', color: 'bg-[#0B0F2E]' },
  { name: 'CCC', color: 'bg-[#1A2461]' },
  { name: 'mBank', color: 'bg-[#2E4AAD]' },
  { name: 'Play', color: 'bg-[#1A2461]' },
  { name: 'Orange', color: 'bg-[#7B9BDB]' },
];

// Referencje/Testimonials
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

// Stats
const STATS = [
  { value: '2700000', suffix: '+', label: 'Firm w Polsce', icon: Building2 },
  { value: '6500000', suffix: '+', label: 'Pracowników', icon: Users },
  { value: '1250', suffix: 'h', label: 'Oszczędzone godziny/miesiąc', icon: Clock },
  { value: '180', suffix: 'mln', label: 'Zaoszczędzonych PLN rocznie', icon: DollarSign },
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

      {/* Top bar — social icons */}
      <div className="relative z-10 flex items-center px-6 md:px-12 lg:px-20 pt-6 ml-8 lg:ml-10">
        <div className="liquid-glass rounded-full px-3 py-2 flex items-center gap-2">
          {[
            { Icon: Twitter, href: '#' },
            { Icon: Linkedin, href: '#' },
            { Icon: Instagram, href: '#' },
          ].map(({ Icon, href }, i) => (
            <a key={i} href={href} className="text-white hover:text-white/80 transition-colors">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </span>
            </a>
          ))}
          <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </span>
        </div>
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight text-white" style={{ fontFamily: 'var(--font-geist)' }}>
          <SplitText
            text="Asystujemy Firmy"
            tag="span"
            className="block mb-2"
            duration={1}
            delay={80}
          />
          <ShinyText text="z AI Nowej Generacji" />
        </h1>

        <FadeIn delay={0.5}>
          <p className="text-lg mb-7 max-w-lg mx-auto text-white/80">
            Wykorzystujemy potęgę agentów AI OpenCLAW, aby zautomatyzować Twoją firmę
            i pozwolić skupić się na tym, co najważniejsze - rozwoju biznesu.
          </p>
        </FadeIn>

        <FadeIn delay={0.7}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#kontakt" className="w-full sm:w-auto">
              <Ripple className="w-full px-8 py-4 text-white text-lg bg-[#2E4AAD] hover:bg-[#1A2461] btn-grain border-2 border-[#2E4AAD]">
                Umów konsultację
              </Ripple>
            </a>
            <a href="/case-studies" className="px-8 py-4 border-2 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2 border-white/30 text-white hover:bg-white/10">
              Dowiedz się więcej
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </FadeIn>

      </div>

      {/* Bottom section — quote centered */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-8">
        <div className="text-center space-y-2">
          <p className="text-xs tracking-widest uppercase text-white/50">Innowacyjne Rozwiązania</p>
          <p className="text-white text-base lg:text-lg leading-relaxed">
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
  );
}

function StatsSection() {
  return (
    <section className="py-20 bg-white border-y border-[#D6E4FF]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#2E4AAD]" />
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  <AnimatedCounter end={parseInt(stat.value.replace(/[^0-9]/g, ''))} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-[#7B9BDB]">{stat.label}</div>
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
    <section className="py-24" style={{ backgroundColor: '#D6E4FF' }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0B0F2E' }}>
              Dlaczego <ShinyText text="Infinity Tech?" />
            </h2>
            <p className="text-xl" style={{ color: '#7B9BDB' }}>Dostarczamy rozwiązania dopasowane do Twojej firmy</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {BENEFITS.map((benefit, i) => (
            <FadeIn key={i} delay={i * 0.1} className="h-full">
              <SpotlightCard spotlightColor="rgba(46, 74, 173, 0.18)">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: '#2E4AAD' }}>
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold" style={{ color: '#0B0F2E' }}>{benefit.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1A2461' }}>{benefit.description}</p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <ROICalculator />
        </FadeIn>
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
    <section className="py-24" style={{ backgroundColor: '#D6E4FF' }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0B0F2E' }}>Nasze Rozwiązania</h2>
            <p className="text-xl" style={{ color: '#7B9BDB' }}>Wybierz plan dopasowany do Twojej firmy</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
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
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const allPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  
  return (
    <section className="py-20 overflow-hidden" style={{ backgroundColor: '#0B0F2E' }}>
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Technologie, których używamy</h2>
            <p style={{ color: '#7B9BDB' }}>Współpracujemy z najlepszymi dostawcami AI na rynku</p>
          </div>
        </FadeIn>
      </div>

      <div className="w-full">
        <Marquee speed={25} pauseOnHover={true} className="py-4">
          {allPartners.map((partner, i) => (
            <div key={i} className="flex flex-col items-center px-8 mx-4 py-4 rounded-2xl transition-colors min-w-[180px]" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <partner.icon className="w-10 h-10 mb-2" style={{ color: '#2E4AAD' }} />
              <h3 className="font-bold text-white text-sm">{partner.name}</h3>
              <p className="text-xs" style={{ color: '#7B9BDB' }}>{partner.desc}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

// Nasi klienci - sekcja z logami
function ClientsSection() {
  const allClients = [...CLIENTS, ...CLIENTS];
  
  return (
    <section className="py-16 overflow-hidden" style={{ backgroundColor: '#D6E4FF' }}>
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#0B0F2E' }}>Zaufały nam wiodące firmy</h2>
            <p style={{ color: '#7B9BDB' }}>Doświadczenie w obsłudze firm każdej wielkości</p>
          </div>
        </FadeIn>
      </div>

      <div className="w-full">
        <Marquee speed={20} pauseOnHover={true} className="py-4">
          {allClients.map((client, i) => (
            <div key={i} className="flex items-center justify-center px-10 mx-6 py-3 rounded-xl transition-all min-w-[160px] border" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(46,74,173,0.15)' }}>
              <span className="font-bold text-sm" style={{ color: '#0B0F2E' }}>
                {client.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

// Sekcja referencji/testimonials
function TestimonialsSection() {
  return (
    <section className="py-24" style={{ backgroundColor: '#D6E4FF' }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0B0F2E' }}>Co mówią klienci</h2>
            <p style={{ color: '#7B9BDB' }}>Historie sukcesu naszych partnerów biznesowych</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="rounded-2xl p-6 hover:shadow-lg transition-shadow border" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(46,74,173,0.12)' }}>
                <div className="flex items-start gap-4 mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold" style={{ color: '#0B0F2E' }}>{testimonial.name}</h4>
                    <p className="text-sm" style={{ color: '#7B9BDB' }}>{testimonial.role} @ {testimonial.company}</p>
                  </div>
                </div>
                <p className="mb-4 italic" style={{ color: '#333' }}>{`"${testimonial.quote}"`}</p>
                <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: 'rgba(46,74,173,0.12)', color: '#2E4AAD' }}>
                  {testimonial.result}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Technologia OpenCLAW</h2>
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
              <div className="p-6 font-mono text-sm space-y-3" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0B0F2E]">Częste Pytania</h2>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0B0F2E]">Porozmawiajmy o Twoim projekcie</h2>
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
                  <p className="font-medium text-[#0B0F2E]">Warszawa, Polska</p>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.7888888888887!2d21.0122!3d52.2297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c92692e0d%3A0xc332c2dcd9e3c8!2sWarsaw%2C%20Poland!5e0!3m2!1sen!2sus!4v1635959482000!5m2!1sen!2sus"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Gotowy na Transformację?</h2>
          <p className="text-xl text-white/80 mb-8">Dołącz do firm, które już oszczędzają czas i pieniądze z Infinity Tech</p>
          <Ripple className="px-10 py-5 bg-[#D6E4FF] text-[#0B0F2E] text-lg font-semibold">
            Umów Bezpłatną Konsultację
          </Ripple>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 bg-[#0B0F2E] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold gradient-text mb-4">Infinity Tech</div>
            <p className="text-[#7B9BDB] mb-6">
              Tworzymy przyszłość biznesu z AI. Automatyzujemy, optymalizujemy, transformujemy.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com/company/infinitytech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1A2461] flex items-center justify-center hover:bg-[#2E4AAD] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/infinitytech_pl" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1A2461] flex items-center justify-center hover:bg-[#2E4AAD] transition-colors">
                <Twitter className="w-5 h-5" />
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
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'Twitter', link: 'https://twitter.com' },
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
        
        <div id="uslugi">
          <ServicesSection />
        </div>
        
        <PartnersSection />
        
        <ClientsSection />
        
        <TestimonialsSection />
        
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
