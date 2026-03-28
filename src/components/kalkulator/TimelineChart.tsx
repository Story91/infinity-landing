'use client';

import { useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';
import type { YearProjection } from '@/lib/kalkulator/types';
import { formatZl } from '@/lib/kalkulator/engine';

interface TimelineChartProps {
  years: YearProjection[];
  implementationCost: number;
}

export default function TimelineChart({ years, implementationCost }: TimelineChartProps) {
  const maxCumulative = Math.max(...years.map((y) => Math.abs(y.cumulative)), 1);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-6"
      style={{ background: 'linear-gradient(135deg, #0B0F2E 0%, #1A2461 100%)' }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-5 h-5" style={{ color: '#2E4AAD' }} />
        <span className="text-white/70 text-sm font-medium">
          Skumulowane oszczędności (5 lat)
        </span>
      </div>
      <div className="text-3xl font-bold text-white mb-2">
        {formatZl(years[4]?.cumulative ?? 0)}{' '}
        <span className="text-base font-normal text-white/50">zł</span>
      </div>
      <div className="text-xs text-white/40 mb-6">
        Koszt wdrożenia: {formatZl(implementationCost)} zł (rok 1)
      </div>

      {/* Wykres słupkowy */}
      <div className="flex items-end gap-3 mb-4" style={{ height: '200px' }}>
        {years.map((y) => {
          const ratio = maxCumulative > 0 ? Math.abs(y.cumulative) / maxCumulative : 0;
          const heightPx = animated ? Math.max(ratio * 160, 8) : 8;
          return (
            <div
              key={y.year}
              className="flex-1 flex flex-col items-center justify-end"
              style={{ height: '100%' }}
            >
              <span className="text-xs text-white/60 mb-1">
                {formatZl(y.cumulative)} zł
              </span>
              <div
                className="w-full rounded-t-lg transition-all ease-out"
                style={{
                  height: `${heightPx}px`,
                  transitionDuration: `${600 + y.year * 150}ms`,
                  background: `linear-gradient(180deg, #2E4AAD ${Math.max(100 - y.year * 15, 25)}%, #1A2461 100%)`,
                  opacity: 0.65 + y.year * 0.07,
                  minHeight: '8px',
                }}
              />
              <div className="text-center mt-2">
                <span className="text-xs text-white/50">Rok {y.year}</span>
                <div className="text-xs text-white/30 mt-0.5">
                  ×{y.efficiencyMultiplier.toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#2E4AAD' }} />
          <span className="text-xs text-white/40">
            +15% wzrost efektywności AI rocznie (compound)
          </span>
        </div>
      </div>
    </div>
  );
}
