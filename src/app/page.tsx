'use client';

import { useState } from 'react';
import Image from 'next/image';
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
  Send
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
    description: 'Idealne dla małych firm rozpoczynających przygodę z AI',
    price: '999',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Automatyzacja fakturowania',
      'Chatbot wsparcia',
      'Inteligentny CRM',
      'Podstawowe analizy',
      'E-mail support',
      'Dostęp do API',
      'Raporty miesięczne'
    ],
    accentColor: '#10b981',
    featured: false
  },
  {
    title: 'Professional',
    description: 'Dla firm gotowych na kompleksową transformację',
    price: '2999',
    image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Wszystko ze Starter',
      'Zaawansowane Analytics AI',
      'Integracja API',
      'Automatyzacja HR',
      'Dedykowany opiekun',
      'Priorytetowy support',
      'Raporty tygodniowe'
    ],
    accentColor: '#6366f1',
    featured: true
  },
  {
    title: 'Enterprise',
    description: 'Najpotężniejsze rozwiązania dla dużych organizacji',
    price: '9999',
    image: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Wszystko z Professional',
      'Korporacyjne AI Agents',
      'Predictive Analytics',
      'Custom AI Development',
      'On-premise opcje',
      '24/7 Dedicated Support',
      'SLA gwarancje'
    ],
    accentColor: '#a855f7',
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
      <Beams color="#6366f1" density={20} speed={4} />
      <Particles quantity={25} color="#818cf8" speed={0.8} />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeIn direction="down" delay={0.2}>
              <div className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
                Przyszłość Biznesu
              </div>
            </FadeIn>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-slate-900">
              <SplitText 
                text="Przekształcamy Firmy" 
                tag="span"
                className="block mb-2"
                duration={1}
                delay={80}
              />
              <ShinyText text="z AI Nowej Generacji" />
            </h1>
            
            <FadeIn delay={0.5}>
              <p className="text-xl text-slate-600 mb-8 max-w-xl">
                Wykorzystujemy potęgę agentów AI OpenCLAW, aby zautomatyzować Twoją firmę 
                i pozwolić skupić się na tym, co najważniejsze - rozwoju biznesu.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.7}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Ripple className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg">
                  Rozpocznij Transformację
                </Ripple>
                <button className="px-8 py-4 bg-white border-2 border-slate-200 rounded-full font-semibold text-lg hover:border-indigo-300 transition-all flex items-center justify-center gap-2 text-slate-700">
                  Dowiedz się więcej
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={0.9}>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-medium">
                      {i}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">500+</span> zadowolonych firm
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square">
              <Image
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="AI Technology"
                fill
                className="object-cover rounded-3xl"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-slate-700">AI Agent aktywny</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2">
          <div className="w-1 h-3 bg-slate-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-indigo-600" />
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  <AnimatedCounter end={parseInt(stat.value.replace(/[^0-9]/g, ''))} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
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
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Dlaczego Infinity Tech?</h2>
            <p className="text-xl text-slate-500">Dostarczamy rozwiązania dopasowane do Twojej firmy</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <SpotlightCard
                title={benefit.title}
                description={benefit.description}
                icon={benefit.icon}
              />
            </FadeIn>
          ))}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Poznaj Nasz Zespół</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
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
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Nasze Rozwiązania</h2>
            <p className="text-xl text-slate-500">Wybierz plan dopasowany do Twojej firmy</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {SERVICES.map((service, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <TiltedCard
                image={service.image}
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
    <section className="py-20 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">Technologie, których używamy</h2>
            <p className="text-slate-500">Współpracujemy z najlepszymi dostawcami AI na rynku</p>
          </div>
        </FadeIn>
      </div>

      <div className="w-full">
        <Marquee speed={25} pauseOnHover={true} className="py-4">
          {allPartners.map((partner, i) => (
            <div key={i} className="flex flex-col items-center px-8 mx-4 py-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors min-w-[180px]">
              <partner.icon className="w-10 h-10 text-indigo-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">{partner.name}</h3>
              <p className="text-xs text-slate-500">{partner.desc}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function TechnologySection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      <Aurora colorStops={['#3A29FF', '#FF94B4', '#6366f1']} speed={0.8} blend={0.3} amplitude={1.2} />
      <Particles quantity={30} color="#6366f1" speed={0.5} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
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
            <div className="glass rounded-3xl p-8 bg-white/5 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[1,2,3,4,5,6,7,8,9].map((i) => (
                  <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-indigo-400" />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">OpenCLAW</div>
                <div className="text-sm text-slate-400">AI Agent Framework</div>
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
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Częste Pytania</h2>
            <p className="text-xl text-slate-500">Odpowiedzi na najczęściej zadawane pytania</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Porozmawiajmy o Twoim projekcie</h2>
            <p className="text-xl text-slate-500 mb-8">
              Skontaktuj się z nami, a przygotujemy darmową wycenę w ciągu 24 godzin.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium text-slate-900">contact@infinityteam.io</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Telefon</p>
                  <p className="font-medium text-slate-900">+48 123 456 789</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Lokalizacja</p>
                  <p className="font-medium text-slate-900">Warszawa, Polska</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <form className="glass rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Imię i nazwisko</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="jan@firma.pl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Telefon (opcjonalnie)</label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({...formState, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="+48 000 000 000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Wiadomość</label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                    placeholder="Opisz swój projekt..."
                  />
                </div>
                <Ripple className="w-full py-4 bg-indigo-600 text-white text-lg flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Wyślij wiadomość
                </Ripple>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <AnimatedGradient className="absolute inset-0" colors={['#6366f1', '#a855f7', '#ec4899', '#6366f1']} />
      <Aurora colorStops={['#6366f1', '#a855f7', '#ec4899']} speed={1} blend={0.2} amplitude={0.8} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Gotowy na Transformację?</h2>
          <p className="text-xl text-white/80 mb-8">Dołącz do firm, które już oszczędzają czas i pieniądze z Infinity Tech</p>
          <Ripple className="px-10 py-5 bg-white text-indigo-600 text-lg">
            Umów Bezpłatną Konsultację
          </Ripple>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold gradient-text mb-4">Infinity Tech</div>
            <p className="text-slate-400 mb-6">
              Tworzymy przyszłość biznesu z AI. Automatyzujemy, optymalizujemy, transformujemy.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Na skróty</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#start" className="hover:text-white transition-colors">Start</a></li>
              <li><a href="#o-nas" className="hover:text-white transition-colors">O nas</a></li>
              <li><a href="#uslugi" className="hover:text-white transition-colors">Usługi</a></li>
              <li><a href="#kontakt" className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Usługi</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Starter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Professional</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Konsultacje</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-slate-400 mb-4">Zapisz się, aby otrzymywać najnowsze informacje o AI.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Twój email"
                className="flex-1 px-4 py-3 rounded-l-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-indigo-500"
              />
              <button className="px-4 py-3 bg-indigo-600 rounded-r-lg hover:bg-indigo-700 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 Infinity Tech. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6 text-sm text-slate-500">
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

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold gradient-text">Infinity Tech</div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#start" className="text-slate-700 hover:text-indigo-600 transition-colors">Start</a>
              <a href="#o-nas" className="text-slate-700 hover:text-indigo-600 transition-colors">O nas</a>
              <a href="/agents" className="text-slate-700 hover:text-indigo-600 transition-colors">Agenci AI</a>
              <a href="#uslugi" className="text-slate-700 hover:text-indigo-600 transition-colors">Usługi</a>
              <a href="#faq" className="text-slate-700 hover:text-indigo-600 transition-colors">FAQ</a>
              <a href="#kontakt" className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                Kontakt
              </a>
            </div>

            <button 
              className="md:hidden p-2 text-slate-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 mt-4">
              <div className="flex flex-col gap-4">
                <a href="#start" onClick={() => setMobileMenuOpen(false)}>Start</a>
                <a href="#o-nas" onClick={() => setMobileMenuOpen(false)}>O nas</a>
                <a href="/agents" onClick={() => setMobileMenuOpen(false)}>Agenci AI</a>
                <a href="#uslugi" onClick={() => setMobileMenuOpen(false)}>Usługi</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <a href="#kontakt" onClick={() => setMobileMenuOpen(false)} className="px-5 py-2 bg-indigo-600 text-white rounded-full text-center">
                  Kontakt
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main>
        <div id="start">
          <HeroSection />
        </div>
        
        <StatsSection />
        
        <div id="o-nas">
          <BenefitsSection />
        </div>
        
        <TeamSection />
        
        <div id="uslugi">
          <ServicesSection />
        </div>
        
        <PartnersSection />
        
        <TechnologySection />
        
        <div id="faq">
          <FAQSection />
        </div>
        
        <ContactSection />
        
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
