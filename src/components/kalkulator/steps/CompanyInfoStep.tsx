'use client';

import { Building2, Mail } from 'lucide-react';
import type { CompanyProfile } from '@/lib/kalkulator/types';
import { INDUSTRIES, NATIONAL_AVG_SALARY, MIN_WAGE } from '@/lib/kalkulator/constants';
import RangeSlider from '../RangeSlider';

interface CompanyInfoStepProps {
  profile: CompanyProfile;
  onUpdate: (updates: Partial<CompanyProfile>) => void;
}

export default function CompanyInfoStep({ profile, onUpdate }: CompanyInfoStepProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0B0F2E' }}>
          Dane Twojej firmy
        </h2>
        <p className="text-sm" style={{ color: '#7B9BDB' }}>
          Opcjonalne informacje, które pozwolą lepiej dopasować kalkulację.
        </p>
      </div>

      <div
        className="rounded-2xl p-6 md:p-8 space-y-6"
        style={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          border: '2px solid rgba(228,230,221,0.3)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
        }}
      >
        {/* Nazwa firmy */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#0B0F2E' }}>
            <Building2 className="w-4 h-4" style={{ color: '#2E4AAD' }} />
            Nazwa firmy
            <span className="text-xs font-normal" style={{ color: '#999' }}>(opcjonalne)</span>
          </label>
          <input
            type="text"
            value={profile.companyName}
            onChange={(e) => onUpdate({ companyName: e.target.value })}
            placeholder="np. ABC Sp. z o.o."
            className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition-colors focus:border-[#2E4AAD]"
            style={{ borderColor: '#D6E4FF', color: '#0B0F2E' }}
          />
        </div>

        {/* Branża */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#0B0F2E' }}>
            Branża
          </label>
          <select
            value={profile.industry}
            onChange={(e) => onUpdate({ industry: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none bg-white transition-colors focus:border-[#2E4AAD]"
            style={{ borderColor: '#D6E4FF', color: profile.industry ? '#0B0F2E' : '#999' }}
          >
            <option value="">Wybierz branżę...</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Liczba pracowników */}
        <RangeSlider
          label="Łączna liczba pracowników w firmie"
          value={profile.totalEmployees}
          min={1}
          max={1000}
          step={1}
          onChange={(val) => onUpdate({ totalEmployees: val })}
        />

        {/* Średnie wynagrodzenie */}
        <RangeSlider
          label="Średnie wynagrodzenie brutto w firmie"
          value={profile.avgSalary}
          min={MIN_WAGE}
          max={25_000}
          step={250}
          suffix=" zł"
          onChange={(val) => onUpdate({ avgSalary: val })}
        />
        <p className="text-xs -mt-3" style={{ color: '#999' }}>
          Średnia krajowa: {NATIONAL_AVG_SALARY.toLocaleString('pl-PL')} zł (marzec 2026).
          Wartość domyślna — poszczególne działy mogą mieć inne stawki (konfiguracja w kroku 2).
        </p>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#0B0F2E' }}>
            <Mail className="w-4 h-4" style={{ color: '#2E4AAD' }} />
            E-mail do wysłania raportu
            <span className="text-xs font-normal" style={{ color: '#999' }}>(opcjonalne)</span>
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="jan@firma.pl"
            className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition-colors focus:border-[#2E4AAD]"
            style={{ borderColor: '#D6E4FF', color: '#0B0F2E' }}
          />
        </div>
      </div>
    </div>
  );
}
