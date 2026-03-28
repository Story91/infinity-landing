'use client';

import { CheckCircle2 } from 'lucide-react';
import {
  Wallet, UsersRound, Headset, TrendingUp, Megaphone,
  FileText, Server, Truck, Scale, BarChart3, Cpu,
} from 'lucide-react';
import type { ProcessCategory } from '@/lib/kalkulator/types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Wallet, UsersRound, Headset, TrendingUp, Megaphone,
  FileText, Server, Truck, Scale, BarChart3, Cpu,
};

interface ProcessCardProps {
  category: ProcessCategory;
  enabled: boolean;
  onToggle: () => void;
}

export default function ProcessCard({ category, enabled, onToggle }: ProcessCardProps) {
  const IconComponent = ICON_MAP[category.icon] || Cpu;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative group text-left rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: enabled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)',
        border: enabled ? `2px solid ${category.color}` : '2px solid rgba(228,230,221,0.5)',
        boxShadow: enabled
          ? `0 8px 30px ${category.color}20, 0 0 0 1px ${category.color}30`
          : '0 2px 10px rgba(0,0,0,0.04)',
      }}
    >
      {/* Checkbox w rogu */}
      <div
        className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          backgroundColor: enabled ? category.color : 'transparent',
          border: enabled ? `2px solid ${category.color}` : '2px solid #D6E4FF',
        }}
      >
        {enabled && <CheckCircle2 className="w-4 h-4" style={{ color: '#fff' }} />}
      </div>

      {/* Ikona */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors"
        style={{
          backgroundColor: enabled ? `${category.color}15` : '#F5F5F0',
        }}
      >
        <IconComponent
          className="w-5 h-5"
          style={{ color: enabled ? category.color : '#7B9BDB' }}
        />
      </div>

      {/* Treść */}
      <h3
        className="text-sm font-bold mb-1 transition-colors"
        style={{ color: enabled ? '#0B0F2E' : '#0B0F2E' }}
      >
        {category.name}
      </h3>
      <p className="text-xs leading-relaxed mb-3" style={{ color: '#7B9BDB' }}>
        {category.description}
      </p>

      {/* Kluczowa metryka */}
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
        style={{
          backgroundColor: `${category.color}12`,
          color: category.color,
        }}
      >
        {category.keyMetric.label}: {category.keyMetric.value}
      </div>

      {/* Średnie wynagrodzenie */}
      <div className="mt-2 text-xs" style={{ color: '#999' }}>
        Śr. wynagrodzenie: {category.avgMonthlySalary.toLocaleString('pl-PL')} zł
      </div>
    </button>
  );
}
