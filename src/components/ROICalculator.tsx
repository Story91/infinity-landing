'use client';

import { useState, useMemo } from 'react';
import { Clock, TrendingUp, Zap, Calendar, Banknote } from 'lucide-react';

interface ROICalculatorProps {
  className?: string;
}

const PLANS = [
  { id: 'starter', label: 'Starter', hoursPerEmployee: 6, baseMonthly: 149, perEmployee: 15, color: '#7B9BDB' },
  { id: 'professional', label: 'Professional', hoursPerEmployee: 14, baseMonthly: 799, perEmployee: 29, color: '#2E4AAD' },
  { id: 'enterprise', label: 'Enterprise', hoursPerEmployee: 24, baseMonthly: 3999, perEmployee: 49, color: '#0B0F2E' },
];

function formatZl(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace('.', ',') + ' mln';
  }
  if (abs >= 1_000) {
    return Math.round(value / 1_000).toLocaleString() + ' tys.';
  }
  return Math.round(value).toLocaleString();
}

export default function ROICalculator({ className = '' }: ROICalculatorProps) {
  const [employees, setEmployees] = useState(50);
  const [avgSalary, setAvgSalary] = useState(8000);
  const [planIndex, setPlanIndex] = useState(1);

  const plan = PLANS[planIndex];

  const results = useMemo(() => {
    const hourlyRate = avgSalary / 176;
    const monthlyHoursSaved = employees * plan.hoursPerEmployee;
    const monthlySavingsGross = monthlyHoursSaved * hourlyRate;
    const monthlyCost = plan.baseMonthly + (employees * plan.perEmployee);
    const annualCost = monthlyCost * 12;
    const annualSavingsGross = monthlySavingsGross * 12;
    const netAnnualSavings = annualSavingsGross - annualCost;
    const roiMonths = monthlySavingsGross > monthlyCost
      ? Math.ceil(monthlyCost / (monthlySavingsGross - monthlyCost))
      : 99;
    const roiPercent = annualCost > 0 ? Math.round((netAnnualSavings / annualCost) * 100) : 0;

    // Compound: AI uczy się i oszczędza coraz więcej (+15% rocznie)
    const compoundGrowth = 0.15;
    const years = Array.from({ length: 5 }, (_, i) => {
      const multiplier = Math.pow(1 + compoundGrowth, i);
      const yearSavingsGross = annualSavingsGross * multiplier;
      const yearNet = yearSavingsGross - annualCost;
      return { year: i + 1, savings: yearNet, cumulative: 0 };
    });

    let cumulative = 0;
    years.forEach(y => {
      cumulative += y.savings;
      y.cumulative = cumulative;
    });

    return {
      monthlyHoursSaved,
      monthlyCost,
      annualSavingsGross,
      netAnnualSavings,
      annualCost,
      roiMonths: Math.min(Math.max(roiMonths, 1), 99),
      roiPercent,
      years,
    };
  }, [employees, avgSalary, plan]);

  const maxCumulative = Math.max(...results.years.map(y => Math.abs(y.cumulative)), 1);

  return (
    <div className={`mt-16 ${className}`}>
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#0B0F2E' }}>Kalkulator ROI</h3>
        <p style={{ color: '#7B9BDB' }}>Sprawdź ile możesz zaoszczędzić z Infinity Tech</p>
      </div>

      {/* Plan selector */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {PLANS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setPlanIndex(i)}
            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
            style={{
              backgroundColor: planIndex === i ? '#2E4AAD' : 'rgba(255,255,255,0.7)',
              color: planIndex === i ? '#fff' : '#0B0F2E',
              border: planIndex === i ? '2px solid #2E4AAD' : '2px solid rgba(46,74,173,0.2)',
            }}
          >
            {p.label}
            <span className="block text-xs font-normal opacity-70">od {p.baseMonthly} zł/mies.</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left: Inputs + Stats */}
        <div className="space-y-6">
          <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
            <label className="block text-sm font-medium mb-3" style={{ color: '#0B0F2E' }}>
              Liczba pracowników: <span className="font-bold" style={{ color: '#2E4AAD' }}>{employees}</span>
            </label>
            <input
              type="range"
              min="5"
              max="500"
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: '#2E4AAD' }}
            />
            <div className="flex justify-between text-xs mt-2" style={{ color: '#7B9BDB' }}>
              <span>5</span>
              <span>500</span>
            </div>
          </div>

          <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
            <label className="block text-sm font-medium mb-3" style={{ color: '#0B0F2E' }}>
              Średnie wynagrodzenie: <span className="font-bold" style={{ color: '#2E4AAD' }}>{avgSalary.toLocaleString()} zł</span>
            </label>
            <input
              type="range"
              min="3500"
              max="25000"
              step="500"
              value={avgSalary}
              onChange={(e) => setAvgSalary(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: '#2E4AAD' }}
            />
            <div className="flex justify-between text-xs mt-2" style={{ color: '#7B9BDB' }}>
              <span>3 500 zł</span>
              <span>25 000 zł</span>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
              <Clock className="w-5 h-5 mb-2" style={{ color: '#2E4AAD' }} />
              <div className="text-2xl font-bold" style={{ color: '#0B0F2E' }}>
                {results.monthlyHoursSaved.toLocaleString()}
              </div>
              <div className="text-xs" style={{ color: '#7B9BDB' }}>godzin / miesiąc</div>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
              <Calendar className="w-5 h-5 mb-2" style={{ color: '#2E4AAD' }} />
              <div className="text-2xl font-bold" style={{ color: '#0B0F2E' }}>
                {results.roiMonths}
              </div>
              <div className="text-xs" style={{ color: '#7B9BDB' }}>miesięcy do zwrotu</div>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
              <Banknote className="w-5 h-5 mb-2" style={{ color: '#2E4AAD' }} />
              <div className="text-2xl font-bold" style={{ color: '#0B0F2E' }}>
                {formatZl(results.netAnnualSavings)}
              </div>
              <div className="text-xs" style={{ color: '#7B9BDB' }}>zł netto / rok</div>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
              <TrendingUp className="w-5 h-5 mb-2" style={{ color: '#2E4AAD' }} />
              <div className="text-2xl font-bold" style={{ color: '#0B0F2E' }}>
                {results.roiPercent}%
              </div>
              <div className="text-xs" style={{ color: '#7B9BDB' }}>ROI w pierwszym roku</div>
            </div>
          </div>
        </div>

        {/* Right: Compound growth chart */}
        <div>
          <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #0B0F2E 0%, #1A2461 100%)' }}>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5" style={{ color: '#2E4AAD' }} />
              <span className="text-white/70 text-sm font-medium">Skumulowane oszczędności (5 lat)</span>
            </div>
            <div className="text-3xl font-bold text-white mb-6">
              {formatZl(results.years[4]?.cumulative)} <span className="text-base font-normal text-white/50">zł</span>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-3 mb-4" style={{ height: '192px' }}>
              {results.years.map((y) => {
                const ratio = maxCumulative > 0 ? Math.abs(y.cumulative) / maxCumulative : 0;
                const heightPx = Math.max(ratio * 140, 8);
                return (
                  <div key={y.year} className="flex-1 flex flex-col items-center justify-end" style={{ height: '100%' }}>
                    <span className="text-xs text-white/60 mb-1">
                      {formatZl(y.cumulative)}
                    </span>
                    <div
                      className="w-full rounded-t-lg"
                      style={{
                        height: `${heightPx}px`,
                        background: `linear-gradient(180deg, #2E4AAD ${Math.max(100 - y.year * 15, 25)}%, #1A2461 100%)`,
                        opacity: 0.65 + y.year * 0.07,
                        transition: 'height 0.5s ease',
                        minHeight: '8px',
                      }}
                    />
                    <span className="text-xs text-white/50 mt-2">Rok {y.year}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-white/10">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#2E4AAD' }} />
              <span className="text-xs text-white/40">+15% wzrost efektywności AI rocznie (compound)</span>
            </div>
          </div>

          {/* Bottom highlight */}
          <div className="mt-4 rounded-2xl p-5 text-white" style={{ background: 'linear-gradient(135deg, #2E4AAD 0%, #1A2461 100%)' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/80 text-sm">Roczna oszczędność netto</div>
                <div className="text-3xl font-bold">{formatZl(results.netAnnualSavings)} zł</div>
              </div>
              <div className="text-right">
                <div className="text-white/80 text-sm">Koszt wdrożenia</div>
                <div className="text-xl font-bold">{formatZl(results.annualCost)} zł/rok</div>
              </div>
            </div>
          </div>
          <p className="text-xs mt-5 text-center" style={{ color: '#7B9BDB' }}>
            * Kalkulacje szacunkowe. AI z czasem uczy się i optymalizuje — realne wyniki mogą być wyższe.
          </p>
        </div>
      </div>
    </div>
  );
}
