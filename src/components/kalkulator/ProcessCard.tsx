'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
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
  index?: number;
}

export default function ProcessCard({ category, enabled, onToggle, index = 0 }: ProcessCardProps) {
  const IconComponent = ICON_MAP[category.icon] || Cpu;
  const [pulse, setPulse] = useState(false);

  const handleClick = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
    onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative text-left rounded-2xl p-5 flex flex-col h-[210px] overflow-hidden hover:translate-y-[-4px] hover:scale-[1.02] active:scale-[0.98]"
      style={{
        background: enabled ? 'rgba(10, 22, 40, 0.85)' : 'rgba(10, 22, 40, 0.4)',
        backdropFilter: 'blur(12px)',
        border: enabled ? `1px solid ${category.color}50` : '1px solid rgba(255,255,255,0.06)',
        boxShadow: enabled
          ? `0 0 25px ${category.color}12 inset, 0 12px 35px -10px ${category.color}25`
          : '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        animation: `cardEnter 0.6s ${index * 0.1}s both cubic-bezier(0.34, 1.56, 0.64, 1)`,
      }}
    >
      {/* Pulse ring on click */}
      {pulse && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: `2px solid ${category.color}`,
            animation: 'pulseRing 0.6s ease-out forwards',
          }}
        />
      )}

      {/* Subtle shimmer — visible on hover via CSS peer */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(105deg, transparent 35%, ${category.color}10 50%, transparent 65%)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 2.5s infinite',
          opacity: enabled ? 0.6 : undefined,
        }}
      />

      {/* Glow border for selected */}
      {enabled && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${category.color}40, transparent 40%, transparent 60%, ${category.color}20)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
            borderRadius: 'inherit',
          }}
        />
      )}

      <div className="flex justify-between items-start w-full relative z-10">
        {/* Ikona */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: enabled ? `${category.color}20` : `${category.color}10`,
            border: `1px solid ${category.color}${enabled ? '40' : '15'}`,
            boxShadow: enabled ? `0 0 12px ${category.color}20` : 'none',
          }}
        >
          <IconComponent
            className="w-5 h-5 transition-transform duration-300"
            style={{ color: category.color, transform: enabled ? 'scale(1.15)' : undefined }}
          />
        </div>

        {/* Checkbox */}
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: enabled ? category.color : 'rgba(255,255,255,0.03)',
            border: enabled ? `2px solid ${category.color}` : '2px solid rgba(255,255,255,0.12)',
            boxShadow: enabled ? `0 0 12px ${category.color}50` : 'none',
            transform: enabled ? 'scale(1)' : 'scale(0.9)',
          }}
        >
          {enabled && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
        </div>
      </div>

      {/* Treść */}
      <div className="mt-3.5 flex-grow relative z-10">
        <h3 className="text-[14px] font-bold text-white leading-tight mb-1 transition-colors">
          {category.name}
        </h3>
        <p className="text-[11px] leading-relaxed text-white/35 line-clamp-2">
          {category.description}
        </p>
      </div>

      {/* Kluczowa metryka */}
      <div className="mt-auto flex flex-col gap-1.5 relative z-10">
        <div
          className="inline-flex items-center py-1 px-2.5 rounded-md w-fit transition-all duration-300"
          style={{
            backgroundColor: enabled ? `${category.color}18` : `${category.color}08`,
            border: `1px solid ${category.color}${enabled ? '30' : '12'}`,
          }}
        >
          <span
            className="text-[10px] font-bold tracking-wide uppercase transition-opacity duration-300"
            style={{ color: category.color, opacity: enabled ? 1 : 0.7 }}
          >
            {category.keyMetric.label}: {category.keyMetric.value}
          </span>
        </div>
        <span className="text-[10px] text-white/20 font-medium">
          Śr. pensja: {category.avgMonthlySalary.toLocaleString('pl-PL')} zł / m-c
        </span>
      </div>
    </button>
  );
}
