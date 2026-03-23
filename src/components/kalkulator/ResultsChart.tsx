'use client';

import { useEffect, useRef, useState } from 'react';
import type { ProcessResult } from '@/lib/kalkulator/types';
import { formatZl } from '@/lib/kalkulator/engine';

interface ResultsChartProps {
  processes: ProcessResult[];
}

export default function ResultsChart({ processes }: ResultsChartProps) {
  const sorted = [...processes].sort((a, b) => b.annualSavings - a.annualSavings);
  const maxCost = Math.max(...sorted.map((p) => p.currentMonthlyCost * 12), 1);
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
      className="rounded-2xl p-5 md:p-6"
      style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
    >
      <h3 className="text-lg font-bold mb-1" style={{ color: '#0D0F05' }}>
        Obecne koszty vs. po automatyzacji
      </h3>
      <p className="text-xs mb-6" style={{ color: '#777870' }}>
        Porównanie rocznych kosztów roboczogodzin per proces
      </p>

      <div className="space-y-5">
        {sorted.map((proc) => {
          const currentAnnual = proc.currentMonthlyCost * 12;
          const afterAnnual = currentAnnual - proc.annualSavings;
          const currentWidth = animated ? (currentAnnual / maxCost) * 100 : 0;
          const afterWidth = animated ? (afterAnnual / maxCost) * 100 : 0;

          return (
            <div key={proc.categoryId}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: proc.categoryColor }}
                  />
                  <span className="text-sm font-medium" style={{ color: '#0D0F05' }}>
                    {proc.categoryName}
                  </span>
                </div>
                <span className="text-xs font-semibold" style={{ color: '#EC6B2D' }}>
                  -{proc.automationPercentage}%
                </span>
              </div>

              {/* Obecne koszty */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs w-16 text-right flex-shrink-0" style={{ color: '#999' }}>
                  Teraz
                </span>
                <div className="flex-1 h-5 rounded-md bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-md transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                    style={{
                      width: `${currentWidth}%`,
                      backgroundColor: '#777870',
                      minWidth: currentWidth > 0 ? '60px' : '0',
                    }}
                  >
                    <span className="text-xs text-white font-medium whitespace-nowrap">
                      {formatZl(currentAnnual)} zł
                    </span>
                  </div>
                </div>
              </div>

              {/* Po automatyzacji */}
              <div className="flex items-center gap-2">
                <span className="text-xs w-16 text-right flex-shrink-0" style={{ color: '#999' }}>
                  Z AI
                </span>
                <div className="flex-1 h-5 rounded-md bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-md transition-all duration-1000 ease-out delay-300 flex items-center justify-end pr-2"
                    style={{
                      width: `${afterWidth}%`,
                      backgroundColor: '#EC6B2D',
                      minWidth: afterWidth > 0 ? '60px' : '0',
                    }}
                  >
                    <span className="text-xs text-white font-medium whitespace-nowrap">
                      {formatZl(afterAnnual)} zł
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-6 pt-4" style={{ borderTop: '1px solid #E4E6DD' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#777870' }} />
          <span className="text-xs" style={{ color: '#777870' }}>Obecne koszty</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#EC6B2D' }} />
          <span className="text-xs" style={{ color: '#777870' }}>Po automatyzacji AI</span>
        </div>
      </div>
    </div>
  );
}
