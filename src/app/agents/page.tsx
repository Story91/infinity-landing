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
  Send,
  TrendingUp,
  Target,
  UsersRound,
  Megaphone,
  Wallet,
  AlertCircle,
  CheckCircle,
  FileText,
  Calendar,
  Bell,
  BarChart,
  MessageCircle,
  Eye,
  CalendarDays,
  PhoneCall,
  Building,
  ArrowDown
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
import Accordion from '@/components/react-bits/Accordion';
import ShinyText from '@/components/react-bits/ShinyText';
import AnimatedCounter from '@/components/react-bits/AnimatedCounter';
import { cn } from '@/lib/utils';

// Agent Stats Data
const AGENT_STATS = {
  hr: {
    title: 'Dział HR',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-500',
    stats: [
      { value: 70, suffix: '%', label: 'oszczędności czasu' },
      { value: -94, suffix: '%', label: 'czasu selekcji CV' },
      { value: '24/7', suffix: '', label: 'dostępność' },
    ]
  },
  marketing: {
    title: 'Marketing',
    color: '#ec4899',
    gradient: 'from-pink-500 to-purple-500',
    stats: [
      { value: 5, suffix: 'x', label: 'więcej treści' },
      { value: 60, suffix: '%', label: 'oszczędności czasu' },
      { value: 150, suffix: '%', label: 'wzrost konwersji' },
    ]
  },
  sales: {
    title: 'Sprzedaż',
    color: '#10b981',
    gradient: 'from-green-500 to-emerald-500',
    stats: [
      { value: 3, suffix: 'x', label: 'więcej leadów' },
      { value: 80, suffix: '%', label: 'wzrost przychodów' },
      { value: 21, suffix: 'x', label: 'wyższa konwersja' },
    ]
  }
};

const HR_AUTOMATION = [
  { area: 'Administracja i dokumentacja', time: '30-40%', potential: 'Bardzo wysoki' },
  { area: 'Rekrutacja i selekcja CV', time: '20-25%', potential: 'Wysoki' },
  { area: 'Obsługa zapytań pracowników', time: '15-20%', potential: 'Bardzo wysoki' },
  { area: 'Rozliczenia i raportowanie', time: '10-15%', potential: 'Wysoki' },
];

const HR_FEATURES = [
  { title: 'Wstępna selekcja CV', desc: 'Agent analizuje setki aplikacji, ocenia kompetencje bez uprzedzeń i przekazuje HR tylko najlepszych kandydatów.', stats: ['-94% czasu', '0% bias'], color: 'blue' },
  { title: 'Obsługa FAQ pracowników', desc: 'Odpowiedzi na pytania o urlopy, wypłaty, procedury - natychmiast, 24/7.', stats: ['24/7', '<1 min odpowiedź'], color: 'blue' },
  { title: 'Automatyczny onboarding', desc: 'Automatyczne nadawanie uprawnień, wysyłanie dokumentów, prowadzenie nowego pracownika.', stats: ['0 błędów', 'Spójny proces'], color: 'blue' },
  { title: 'Generowanie dokumentów', desc: 'Umowy, aneksy, zaświadczenia tworzone bez błędów w minuty zamiast godzin.', stats: ['-95% błędów', 'Minuty'], color: 'blue' },
  { title: 'Pilnowanie terminów', desc: 'Badania lekarskie, szkolenia BHP, końce umów - zero przegapionych deadline\'ów.', stats: ['0 przegapień', 'Auto-alerty'], color: 'blue' },
  { title: 'Automatyczne raportowanie', desc: 'Raporty headcount, rotacji, absencji dla zarządu - generowane automatycznie.', stats: ['Real-time', 'Dashboardy'], color: 'blue' },
];

const HR_RESULTS = [
  { label: 'Czas na administrację', value: 62, before: '40% dnia', after: '15% dnia' },
  { label: 'Czas odpowiedzi na pytania', value: 99, before: '4-24 godziny', after: '<1 minuta' },
  { label: 'Czas selekcji 100 CV', value: 94, before: '8 godzin', after: '30 minut' },
  { label: 'Błędy w dokumentacji', value: 95, before: '5-10%', after: '<0.5%' },
  { label: 'Przegapione terminy', value: 100, before: '8-12/rok', after: '0' },
];

const HR_TRANSFORMATION = [
  { before: 'Administrator dokumentów', after: 'Strateg HR' },
  { before: 'Przeglądacz CV', after: 'Talent Scout' },
  { before: 'Odpowiadacz na maile', after: 'Partner biznesowy' },
  { before: 'Pilnujący terminów', after: 'Architekt kultury' },
];

const MARKETING_METRICS = [
  { metric: 'Czas tworzenia kampanii', before: '5-7 dni', after: '1-2 dni', change: '-70%' },
  { metric: 'Warianty treści na kampanię', before: '3-5', after: '20-50', change: '+900%' },
  { metric: 'Open rate emaili', before: '18%', after: '32%', change: '+78%' },
  { metric: 'CTR kampanii', before: '2.1%', after: '4.8%', change: '+129%' },
  { metric: 'Koszt pozyskania leada (CPL)', before: '120 zł', after: '65 zł', change: '-46%' },
  { metric: 'ROI z content marketingu', before: '180%', after: '420%', change: '+133%' },
];

const SALES_FUNCTIONS = [
  { icon: CheckCircle2, title: 'Kwalifikacja leadów' },
  { icon: Calendar, title: 'Umawianie spotkań' },
  { icon: PhoneCall, title: 'Follow-upy' },
  { icon: MessageCircle, title: 'Odpowiedzi FAQ' },
  { icon: Eye, title: 'Monitoring zachowań' },
];

// Hero
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
      <Beams color="#6366f1" density={20} speed={4} />
      <Particles quantity={25} color="#818cf8" speed={0.8} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <FadeIn direction="down" delay={0.2}>
          <div className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            Agent AI dla Twojej firmy
          </div>
        </FadeIn>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-[#0B0F2E]">
          <SplitText 
            text="Przyszłość Twojego Biznesu" 
            tag="span"
            className="block mb-2"
            duration={1}
            delay={80}
          />
          <ShinyText text="Z Agentami AI" />
        </h1>
        
        <FadeIn delay={0.5}>
          <p className="text-xl text-[#1A2461] mb-8 max-w-3xl mx-auto">
            Kompleksowa analiza korzyści biznesowych i potencjału wzrostu dla Twojej firmy 
            w działach HR, Marketingu i Sprzedaży.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.7}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Ripple className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg">
              Poznaj Korzyści
            </Ripple>
            <button className="px-8 py-4 bg-white border-2 border-[#D6E4FF] rounded-full font-semibold text-lg hover:border-indigo-300 transition-all flex items-center justify-center gap-2 text-slate-700">
              Skontaktuj się
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.9}>
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: UsersRound, title: 'HR', value: '70% oszcz.', color: 'blue' },
              { icon: Megaphone, title: 'Marketing', value: '5x więcej', color: 'pink' },
              { icon: Target, title: 'Sprzedaż', value: '3x leadów', color: 'green' },
            ].map((dept, i) => (
              <div key={i} className={`p-6 rounded-2xl bg-${dept.color}-50 border border-${dept.color}-200`}>
                <dept.icon className={`w-8 h-8 mx-auto mb-2 text-${dept.color}-600`} />
                <div className={`text-2xl font-bold text-${dept.color}-600`}>{dept.value}</div>
                <div className="text-sm text-[#1A2461]">{dept.title}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2">
          <div className="w-1 h-3 bg-slate-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}

// Stats Overview
function StatsOverview() {
  return (
    <section className="py-16 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(AGENT_STATS).map(([key, dept], i) => (
            <FadeIn key={key} delay={i * 0.1}>
              <div className="rounded-2xl p-6" style={{ background: `linear-gradient(135deg, ${dept.color}20, transparent)` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${dept.gradient} flex items-center justify-center`}>
                    {key === 'hr' && <UsersRound className="w-5 h-5 text-white" />}
                    {key === 'marketing' && <Megaphone className="w-5 h-5 text-white" />}
                    {key === 'sales' && <Target className="w-5 h-5 text-white" />}
                  </div>
                  <h3 className="text-xl font-bold">{dept.title}</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {dept.stats.map((stat, j) => (
                    <div key={j} className="text-center">
                      <div className="text-2xl font-bold" style={{ color: dept.color }}>
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-xs text-[#7B9BDB]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// HR Section - Full
function HRSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
              <UsersRound className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F2E]">Agent AI w Dziale HR</h2>
              <p className="text-[#7B9BDB]">Kompleksowa automatyzacja procesów kadrowych</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Problem */}
          <FadeIn>
            <div className="bg-red-50 rounded-2xl p-6 border-l-4 border-red-400">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-red-800">Problem</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Specjaliści HR spędzają nawet <strong>40% swojego czasu</strong> na zadaniach administracyjnych i powtarzalnych czynnościach.
              </p>
              
              <div className="overflow-hidden rounded-xl border border-red-200">
                <table className="w-full text-sm">
                  <thead className="bg-red-100">
                    <tr>
                      <th className="text-left p-3 text-red-800">Obszar</th>
                      <th className="text-center p-3 text-red-800">% czasu</th>
                      <th className="text-center p-3 text-red-800">Potencjał AI</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {HR_AUTOMATION.map((item, i) => (
                      <tr key={i} className="border-t border-red-100">
                        <td className="p-3 text-slate-700">{item.area}</td>
                        <td className="p-3 text-center text-[#1A2461]">{item.time}</td>
                        <td className="p-3 text-center">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                            {item.potential}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* Solution */}
          <FadeIn delay={0.2}>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-bold text-blue-800">Rozwiązanie</h3>
              </div>
              <p className="text-slate-700 mb-6">
                Agent AI przejmuje odpowiedzialność za powtarzalne zadania, pozwalając zespołowi HR skupić się na strategii i ludziach.
              </p>

              <div className="space-y-4">
                {[
                  'Automatyczna selekcja CV według kryteriów',
                  'Odpowiedzi na pytania pracowników 24/7',
                  'Automatyczne generowanie umów i dokumentów',
                  'Planowanie szkoleń i terminów',
                  'Raporty i analizy w czasie rzeczywistym',
                  'Onboarding nowych pracowników'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* HR Features Grid */}
        <FadeIn>
          <h3 className="text-xl font-bold text-[#0B0F2E] mb-6">Co Agent AI może zrobić:</h3>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {HR_FEATURES.map((feature, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 hover:shadow-md transition-shadow h-full">
                <div className={`w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4`}>
                  {i === 0 && <FileText className="w-6 h-6 text-blue-600" />}
                  {i === 1 && <MessageCircle className="w-6 h-6 text-blue-600" />}
                  {i === 2 && <Users className="w-6 h-6 text-blue-600" />}
                  {i === 3 && <FileText className="w-6 h-6 text-blue-600" />}
                  {i === 4 && <CalendarDays className="w-6 h-6 text-blue-600" />}
                  {i === 5 && <BarChart className="w-6 h-6 text-blue-600" />}
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{feature.title}</h4>
                <p className="text-[#1A2461] text-sm mb-3">{feature.desc}</p>
                <div className="flex items-center gap-2 text-xs">
                  {feature.stats.map((stat, j) => (
                    <span key={j} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{stat}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Timeline */}
        <FadeIn>
          <div className="bg-[#D6E4FF] rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Agent AI w akcji: Przykładowy proces rekrutacji
            </h3>
            
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              <div className="space-y-4">
                {[
                  { time: '09:00', event: '150 CV wpływa na ogłoszenie o pracę', color: 'bg-blue-600' },
                  { time: '09:30', event: 'Agent analizuje wszystkie CV, ocenia kompetencje', color: 'bg-blue-500' },
                  { time: '09:35', event: 'Agent wysyła 15 najlepszym kandydatom zaproszenie', color: 'bg-blue-400' },
                  { time: '10:00', event: 'Agent przeprowadza rozmowy kwalifikacyjne przez chat', color: 'bg-cyan-500' },
                  { time: '11:00', event: 'Agent umawia 5 finalistów na spotkania z HR', color: 'bg-cyan-400' },
                  { time: '11:05', event: 'HR dostaje gotowy raport z 5 kandydatami', highlight: true },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className={`w-16 h-16 ${step.color || 'bg-blue-600'} rounded-full flex items-center justify-center text-white font-bold text-xs z-10 flex-shrink-0`}>
                      {step.time}
                    </div>
                    <div className={`flex-1 rounded-xl p-4 shadow-sm ${step.highlight ? 'bg-white border-2 border-green-300' : 'bg-white'}`}>
                      <p className="text-slate-700">{step.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-600">Tradycyjnie</div>
                <div className="text-red-700">2-3 dni pracy HR</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">Z Agent AI</div>
                <div className="text-green-700">2 godziny (automatycznie)</div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FadeIn>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
              <h4 className="font-semibold text-blue-800 mb-4">Wyniki po wdrożeniu:</h4>
              <div className="space-y-4">
                {HR_RESULTS.map((result, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#1A2461] text-sm">{result.label}</span>
                      <span className="font-bold text-blue-600">-{result.value}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${result.value}%` }}></div>
                    </div>
                    <div className="text-xs text-[#7B9BDB] mt-1">{result.before} → {result.after}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6">
              <h4 className="font-semibold text-blue-800 mb-4">Na co HR przeznaczy zaoszczędzony czas?</h4>
              <p className="text-[#1A2461] text-sm mb-4">Agent AI przejmuje 60-70% powtarzalnych zadań:</p>
              
              <div className="space-y-3">
                {[
                  { emoji: '🎯', title: 'Budowanie kultury organizacyjnej', desc: 'Wartości, zaangażowanie' },
                  { emoji: '⭐', title: 'Rozwój talentów', desc: 'Ścieżki kariery, mentoring' },
                  { emoji: '📈', title: 'Planowanie sukcesji', desc: 'Identyfikacja liderów' },
                  { emoji: '🤝', title: 'Relacje z pracownikami', desc: 'Rozwiązywanie konfliktów' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <div className="font-semibold text-slate-800">{item.title}</div>
                      <div className="text-xs text-[#7B9BDB]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border-2 border-blue-200">
                <p className="text-center text-slate-700"><strong>Efekt:</strong> Specjalista HR odzyskuje <span className="text-blue-600 font-bold text-xl">15-20 godzin</span> tygodniowo</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Transformation Table */}
        <FadeIn>
          <div className="mt-8 overflow-hidden rounded-xl border border-blue-200">
            <div className="bg-blue-600 text-white p-4 text-center">
              <h4 className="font-bold">TRANSFORMACJA ROLI HR</h4>
            </div>
            <table className="w-full">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-4 text-left text-blue-800">Z (przed AI)</th>
                  <th className="p-4 text-center text-blue-800">→</th>
                  <th className="p-4 text-left text-blue-800">NA (z AI)</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {HR_TRANSFORMATION.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'border-b border-blue-100' : 'border-b border-blue-100 bg-blue-50'}>
                    <td className="p-4 text-[#1A2461]">{item.before}</td>
                    <td className="p-4 text-center text-blue-500">→</td>
                    <td className="p-4 text-slate-800 font-semibold">{item.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Marketing Section
function MarketingSection() {
  return (
    <section className="py-24 bg-[#D6E4FF]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-pink-600 rounded-2xl flex items-center justify-center">
              <Megaphone className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F2E]">Agent AI w Marketingu</h2>
              <p className="text-[#7B9BDB]">Twórz więcej treści przy mniejszym wysiłku</p>
            </div>
          </div>
        </FadeIn>

        {/* Stats Header */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { title: 'więcej treści', value: '5x', color: 'pink' },
            { title: 'oszczędności czasu', value: '60%', color: 'purple' },
            { title: 'wzrost konwersji', value: '+150%', color: 'rose' },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={`bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-4 text-center`}>
                <div className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                <div className="text-sm text-[#1A2461]">{stat.title}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <FadeIn>
            <h3 className="font-semibold text-slate-700 mb-4">Co Agent AI przejmuje od marketingu:</h3>
            <ul className="space-y-3">
              {[
                'Generowanie treści - posty, opisy, nagłówki A/B',
                'Personalizacja na skalę - tysiące emaili',
                'Analiza danych - automatyczne raporty',
                'SEO i content - optymalizacja treści',
                'Social listening - monitoring 24/7',
                'Planowanie kampanii - rekomendacje'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-[#1A2461]">{feature}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
              <h4 className="font-semibold text-purple-800 mb-4">Przykładowy scenariusz: Kampania produktowa</h4>
              <div className="space-y-2 text-sm">
                {[
                  { time: '08:00', event: 'Agent analizuje dane sprzedażowe' },
                  { time: '08:05', event: 'Generowanie 20 wariantów nagłówków' },
                  { time: '08:10', event: 'Spersonalizowane treści dla 5 segmentów' },
                  { time: '08:30', event: 'Kompletna kampania gotowa!' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-white rounded-lg">
                    <span className="text-purple-600 font-mono">{step.time}</span>
                    <span className="text-[#1A2461]">{step.event}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-purple-100 rounded-lg text-center">
                <span className="text-purple-700 text-sm">Tradycyjnie: <strong>2-3 dni</strong> → Z Agent AI: <strong>30 minut</strong></span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Metrics Table */}
        <FadeIn>
          <div className="mt-8 overflow-hidden rounded-xl border border-purple-200">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="text-left p-4">Metryka</th>
                  <th className="text-center p-4">Przed</th>
                  <th className="text-center p-4">Po wdrożeniu</th>
                  <th className="text-center p-4">Zmiana</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {MARKETING_METRICS.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'border-b border-purple-100' : 'border-b border-purple-100 bg-purple-50'}>
                    <td className="p-4 text-slate-700">{row.metric}</td>
                    <td className="p-4 text-center text-[#7B9BDB]">{row.before}</td>
                    <td className="p-4 text-center text-slate-700">{row.after}</td>
                    <td className="p-4 text-center font-bold text-green-600">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* ROI Box */}
        <FadeIn>
          <div className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
            <h4 className="font-bold text-lg mb-4 text-center">Oszczędności dla zespołu 5-osobowego</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { value: '400 h', label: 'zaoszczędzony czas / mies.' },
                { value: '40 000 zł', label: 'ekwiwalent kosztowy / mies.' },
                { value: '+45 000 zł', label: 'wzrost efektywności / mies.' },
                { value: '1 080 000 zł', label: 'łączna wartość dodana / rok' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-sm text-purple-200">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Sales Section
function SalesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F2E]">Agent AI w Sprzedaży</h2>
              <p className="text-[#7B9BDB]">Zwiększ przychody bez zwiększania zespołu</p>
            </div>
          </div>
        </FadeIn>

        {/* Highlight */}
        <FadeIn>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 text-center">
            <div className="text-5xl font-extrabold text-green-600 mb-2">21x</div>
            <p className="text-slate-700">Kontakt z leadem w ciągu <strong>5 minut</strong> zwiększa szanse konwersji 21-krotnie.</p>
            <p className="text-green-600 font-semibold mt-2">Agent AI odpowiada w ciągu 30 sekund - zawsze.</p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <FadeIn>
            <div>
              <h3 className="font-semibold text-slate-700 mb-4">Co Agent AI robi przez całą dobę:</h3>
              <div className="space-y-2">
                {[
                  { time: '22:00', event: 'Lead wypełnia formularz kontaktowy' },
                  { time: '22:01', event: 'Agent wysyła spersonalizowaną odpowiedź' },
                  { time: '22:03', event: 'Agent zadaje pytania kwalifikujące (BANT)' },
                  { time: '22:30', event: 'Agent proponuje termin spotkania' },
                  { time: '06:00', event: 'Handlowiec budzi się z umówionym spotkaniem!', highlight: true },
                ].map((step, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${step.highlight ? 'bg-green-100 rounded-lg border-2 border-green-300' : 'bg-green-50'}`}>
                    <span className="text-green-600 font-mono text-sm">{step.time}</span>
                    <span className={`text-sm ${step.highlight ? 'text-slate-700 font-semibold' : 'text-[#1A2461]'}`}>{step.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6">
              <h4 className="font-semibold text-green-800 mb-4">Wyniki po wdrożeniu:</h4>
              <div className="space-y-4">
                {[
                  { label: 'Czas reakcji na lead', value: 99 },
                  { label: 'Leady obsłużone dziennie', value: 75 },
                  { label: 'Przychód na handlowca', value: 80 },
                ].map((result, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#1A2461] text-sm">{result.label}</span>
                      <span className="font-bold text-green-600">+{result.value}%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${result.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl text-center">
                  <div className="text-2xl font-bold text-green-600">100 000 zł</div>
                  <div className="text-xs text-[#7B9BDB]">przed / mies.</div>
                </div>
                <div className="p-4 bg-white rounded-xl text-center">
                  <div className="text-2xl font-bold text-green-600">180 000 zł</div>
                  <div className="text-xs text-[#7B9BDB]">po / mies.</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Sales Functions */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {SALES_FUNCTIONS.map((func, i) => (
              <div key={i} className="bg-green-50 rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <func.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm font-semibold text-slate-700">{func.title}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Summary Section
function SummarySection() {
  return (
    <section className="py-24 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Dlaczego warto działać teraz?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 rounded-xl p-6">
            <ul className="space-y-4">
              {[
                'Konkurencja już wdraża rozwiązania AI',
                'Im szybciej wdrożysz, tym szybciej zbierasz korzyści',
                'Pracownicy odciążeni od monotonii są bardziej zaangażowani',
                'Dane pozwalają na ciągłą optymalizację'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold text-white mb-4">Następny krok</h3>
            <p className="text-blue-100 mb-6">Umów się na bezpłatną konsultację</p>
            <Ripple className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold">
              Umów konsultację →
            </Ripple>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 bg-[#0B0F2E] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Infinity Tech</div>
          <div className="flex gap-6 text-[#7B9BDB]">
            <a href="/polityka-prywatnosci" className="hover:text-white">Polityka Prywatności</a>
            <a href="/regulamin" className="hover:text-white">Regulamin</a>
            <a href="mailto:contact@infinityteam.io" className="hover:text-white">contact@infinityteam.io</a>
          </div>
        </div>
        <div className="text-center text-[#7B9BDB] text-sm mt-8 pt-8 border-t border-slate-800">
          © 2026 Infinity Tech. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
}

export default function AgentsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#0B0F2E]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#D6E4FF]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 py-1">
              <Image 
                src="/logo.png" 
                alt="Infinity Tech Logo" 
                width={42} 
                height={42}
                className="object-contain"
              />
              <span className="text-xl md:text-2xl font-bold logo-text" style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #4a4a6a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>INFINITY TECH</span>
            </a>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">Start</a>
              <a href="/agents" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">Agenci AI</a>
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
        </div>
      </nav>

      <main>
        <HeroSection />
        <StatsOverview />
        <HRSection />
        <MarketingSection />
        <SalesSection />
        <SummarySection />
      </main>

      <Footer />
    </div>
  );
}
