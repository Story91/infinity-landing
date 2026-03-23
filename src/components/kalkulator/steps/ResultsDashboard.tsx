'use client';

import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';
import type { AggregateResults, CompanyProfile } from '@/lib/kalkulator/types';
import { formatZl } from '@/lib/kalkulator/engine';
import ROISummaryCards from '../ROISummaryCards';
import SavingsBreakdownTable from '../SavingsBreakdownTable';
import ResultsChart from '../ResultsChart';
import TimelineChart from '../TimelineChart';
import ExportButton from '../ExportButton';

interface ResultsDashboardProps {
  results: AggregateResults;
  companyProfile: CompanyProfile;
}

export default function ResultsDashboard({ results, companyProfile }: ResultsDashboardProps) {
  return (
    <div className="space-y-8" id="kalkulator-results">
      {/* Nagłówek */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0D0F05' }}>
          {companyProfile.companyName
            ? `Raport ROI dla ${companyProfile.companyName}`
            : 'Twój raport ROI automatyzacji'}
        </h2>
        <p className="text-sm" style={{ color: '#777870' }}>
          Na podstawie rzeczywistych danych rynku polskiego (marzec 2026) i wybranych procesów
        </p>
      </div>

      {/* Karty KPI */}
      <ROISummaryCards results={results} />

      {/* Tabela rozbicia */}
      <SavingsBreakdownTable processes={results.processes} />

      {/* Wykresy */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Porównanie kosztów */}
        <ResultsChart processes={results.processes} />

        {/* Projekcja 5-letnia */}
        <TimelineChart
          years={results.compoundYears}
          implementationCost={results.estimatedImplementationCost}
        />
      </div>

      {/* Redukcja błędów */}
      <div
        className="rounded-2xl p-5 md:p-6"
        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
      >
        <h3 className="text-lg font-bold mb-4" style={{ color: '#0D0F05' }}>
          Redukcja błędów dzięki AI
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.processes.map((proc) => (
            <div key={proc.categoryId} className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: proc.categoryColor }}
                />
                <span className="text-sm font-medium" style={{ color: '#0D0F05' }}>
                  {proc.categoryName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Przed */}
                <div className="flex-1">
                  <div className="text-xs mb-1" style={{ color: '#999' }}>Błędy (ludzie)</div>
                  <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(proc.errorReduction.before * 10, 100)}%`,
                        backgroundColor: '#EF4444',
                        minWidth: '8px',
                      }}
                    />
                  </div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: '#EF4444' }}>
                    {proc.errorReduction.before}%
                  </div>
                </div>
                {/* Strzałka */}
                <ArrowRight className="w-4 h-4 flex-shrink-0 mt-3" style={{ color: '#ccc' }} />
                {/* Po */}
                <div className="flex-1">
                  <div className="text-xs mb-1" style={{ color: '#999' }}>Błędy (AI)</div>
                  <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(proc.errorReduction.after * 10, 100)}%`,
                        backgroundColor: '#22C55E',
                        minWidth: '4px',
                      }}
                    />
                  </div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: '#22C55E' }}>
                    {proc.errorReduction.after}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ulga podatkowa */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(236,107,45,0.05), rgba(236,107,45,0.12))',
          border: '2px solid rgba(236,107,45,0.2)',
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(236,107,45,0.15)' }}
          >
            <Shield className="w-6 h-6" style={{ color: '#EC6B2D' }} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1" style={{ color: '#0D0F05' }}>
              Ulga podatkowa na robotyzację — 50% odliczenia
            </h3>
            <p className="text-sm" style={{ color: '#777870' }}>
              Na podstawie ustawy obowiązującej w latach 2022–2026, możesz odliczyć 50% kosztów
              wdrożenia automatyzacji od podstawy opodatkowania.
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold" style={{ color: '#EC6B2D' }}>
              {formatZl(results.taxRelief)} zł
            </div>
            <div className="text-xs" style={{ color: '#777870' }}>
              szacowana ulga
            </div>
          </div>
        </div>
      </div>

      {/* Podsumowanie + CTA */}
      <div
        className="rounded-2xl p-6 md:p-8 text-center"
        style={{
          background: 'linear-gradient(135deg, #0D0F05 0%, #2a2a25 100%)',
        }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          Łączna roczna oszczędność netto
        </h3>
        <div className="text-4xl md:text-5xl font-bold mb-1" style={{ color: '#EC6B2D' }}>
          {formatZl(results.totalAnnualSavings)} zł
        </div>
        <p className="text-sm text-white/50 mb-6">
          + {formatZl(results.taxRelief)} zł ulgi podatkowej • ROI {results.roiPercent}% • zwrot w {results.paybackMonths} mies.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ExportButton />
          <Link
            href="/#kontakt"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{
              backgroundColor: '#EC6B2D',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(236,107,45,0.3)',
            }}
          >
            Umów bezpłatną konsultację
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center" style={{ color: '#999' }}>
        * Kalkulacje szacunkowe na podstawie średnich rynkowych dla Polski (marzec 2026).
        Dane: GUS, ZUS, Eurostat, badania branżowe. Koszt pracodawcy uwzględnia ZUS (20,48%).
        Realne wyniki mogą się różnić w zależności od specyfiki firmy. AI z czasem uczy się i optymalizuje — wyniki mogą być wyższe.
      </p>
    </div>
  );
}
