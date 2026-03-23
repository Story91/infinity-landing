'use client';

import { useEffect, useRef, useState } from 'react';
import { Clock, TrendingUp, Calendar, Banknote, Users, Shield } from 'lucide-react';
import type { AggregateResults } from '@/lib/kalkulator/types';
import { formatZl } from '@/lib/kalkulator/engine';

interface ROISummaryCardsProps {
  results: AggregateResults;
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) {
      setDisplay(value);
      return;
    }
    animated.current = true;
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  if (suffix === ' zł') {
    return <span>{formatZl(display)} zł</span>;
  }
  return (
    <span>
      {display.toLocaleString('pl-PL')}{suffix}
    </span>
  );
}

export default function ROISummaryCards({ results }: ROISummaryCardsProps) {
  const cards = [
    {
      icon: Banknote,
      label: 'Roczne oszczędności netto',
      value: Math.round(results.totalAnnualSavings),
      suffix: ' zł',
      highlight: true,
    },
    {
      icon: TrendingUp,
      label: 'ROI (pierwszy rok)',
      value: results.roiPercent,
      suffix: '%',
      highlight: false,
    },
    {
      icon: Calendar,
      label: 'Zwrot inwestycji',
      value: results.paybackMonths,
      suffix: ' mies.',
      highlight: false,
    },
    {
      icon: Clock,
      label: 'Godziny zaoszczędzone / rok',
      value: Math.round(results.totalAnnualHoursSaved),
      suffix: 'h',
      highlight: false,
    },
    {
      icon: Users,
      label: 'Ekwiwalent etatów',
      value: results.fteEquivalent,
      suffix: '',
      highlight: false,
    },
    {
      icon: Shield,
      label: 'Ulga podatkowa (robotyzacja)',
      value: Math.round(results.taxRelief),
      suffix: ' zł',
      highlight: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card, i) => (
        <div
          key={i}
          className="rounded-2xl p-4 text-center transition-transform hover:scale-105"
          style={{
            background: card.highlight
              ? 'linear-gradient(135deg, #EC6B2D 0%, #d45a22 100%)'
              : 'rgba(255,255,255,0.8)',
            border: card.highlight ? 'none' : '1px solid rgba(228,230,221,0.5)',
            boxShadow: card.highlight
              ? '0 8px 30px rgba(236,107,45,0.25)'
              : '0 2px 10px rgba(0,0,0,0.04)',
          }}
        >
          <card.icon
            className="w-5 h-5 mx-auto mb-2"
            style={{ color: card.highlight ? 'rgba(255,255,255,0.8)' : '#EC6B2D' }}
          />
          <div
            className="text-xl md:text-2xl font-bold mb-1"
            style={{ color: card.highlight ? '#fff' : '#0D0F05' }}
          >
            <AnimatedNumber value={card.value} suffix={card.suffix} />
          </div>
          <div
            className="text-xs"
            style={{ color: card.highlight ? 'rgba(255,255,255,0.7)' : '#777870' }}
          >
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
}
