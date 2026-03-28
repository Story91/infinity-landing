'use client';

import { useState } from 'react';
import {
  ChevronDown, ChevronUp, Users, Clock, CheckSquare,
  Wallet, UsersRound, Headset, TrendingUp, Megaphone,
  FileText, Server, Truck, Scale, BarChart3, Cpu,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Wallet, UsersRound, Headset, TrendingUp, Megaphone,
  FileText, Server, Truck, Scale, BarChart3, Cpu,
};
import type { ProcessSelection, AggregateResults } from '@/lib/kalkulator/types';
import { PROCESS_CATEGORIES } from '@/lib/kalkulator/constants';
import { formatZl } from '@/lib/kalkulator/engine';
import RangeSlider from '../RangeSlider';

interface ProcessConfigStepProps {
  selections: ProcessSelection[];
  onUpdate: (categoryId: string, updates: Partial<ProcessSelection>) => void;
  results: AggregateResults;
}

export default function ProcessConfigStep({
  selections,
  onUpdate,
  results,
}: ProcessConfigStepProps) {
  const enabledSelections = selections.filter((s) => s.enabled);
  const [expandedId, setExpandedId] = useState<string | null>(
    enabledSelections[0]?.categoryId ?? null
  );

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Lewa kolumna: konfiguracja procesów */}
      <div className="lg:col-span-2 space-y-3">
        <div className="text-center lg:text-left mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0B0F2E' }}>
            Skonfiguruj szczegóły
          </h2>
          <p className="text-sm" style={{ color: '#7B9BDB' }}>
            Dla każdego procesu podaj liczbę pracowników i czas poświęcany tygodniowo.
          </p>
        </div>

        {enabledSelections.map((selection) => {
          const category = PROCESS_CATEGORIES.find(
            (c) => c.id === selection.categoryId
          )!;
          const isExpanded = expandedId === category.id;
          const IconComponent = ICON_MAP[category.icon] || Cpu;

          return (
            <div
              key={category.id}
              className="rounded-2xl overflow-hidden transition-all"
              style={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                border: isExpanded
                  ? `2px solid ${category.color}30`
                  : '2px solid rgba(228,230,221,0.3)',
              }}
            >
              {/* Nagłówek */}
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : category.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <IconComponent className="w-4 h-4" style={{ color: category.color }} />
                  </div>
                  <div>
                    <span className="font-bold text-sm" style={{ color: '#0B0F2E' }}>
                      {category.name}
                    </span>
                    <div className="flex items-center gap-3 text-xs" style={{ color: '#7B9BDB' }}>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {selection.employeeCount} os.
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {selection.hoursPerWeek}h/tydz.
                      </span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5" style={{ color: '#7B9BDB' }} />
                ) : (
                  <ChevronDown className="w-5 h-5" style={{ color: '#7B9BDB' }} />
                )}
              </button>

              {/* Treść rozwinięta */}
              {isExpanded && (
                <div className="px-4 pb-5 space-y-5 border-t" style={{ borderColor: '#D6E4FF' }}>
                  {/* Liczba pracowników */}
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4" style={{ color: category.color }} />
                      <span className="text-sm font-medium" style={{ color: '#0B0F2E' }}>
                        Liczba pracowników
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdate(category.id, {
                            employeeCount: Math.max(1, selection.employeeCount - 1),
                          })
                        }
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold border"
                        style={{ borderColor: '#D6E4FF', color: '#7B9BDB' }}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={500}
                        value={selection.employeeCount}
                        onChange={(e) =>
                          onUpdate(category.id, {
                            employeeCount: Math.min(500, Math.max(1, Number(e.target.value) || 1)),
                          })
                        }
                        className="w-20 text-center py-1.5 rounded-lg text-sm font-bold border"
                        style={{ borderColor: '#D6E4FF', color: '#0B0F2E' }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onUpdate(category.id, {
                            employeeCount: Math.min(500, selection.employeeCount + 1),
                          })
                        }
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold border"
                        style={{ borderColor: '#D6E4FF', color: '#7B9BDB' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Godziny tygodniowo */}
                  <RangeSlider
                    label="Godziny tygodniowo na te zadania"
                    value={selection.hoursPerWeek}
                    min={1}
                    max={40}
                    suffix="h"
                    onChange={(val) => onUpdate(category.id, { hoursPerWeek: val })}
                  />

                  {/* Wybór zadań */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckSquare className="w-4 h-4" style={{ color: category.color }} />
                      <span className="text-sm font-medium" style={{ color: '#0B0F2E' }}>
                        Zadania do automatyzacji
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {category.tasks.map((task) => {
                        const isSelected = selection.selectedTaskIds.includes(task.id);
                        return (
                          <label
                            key={task.id}
                            className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                const newIds = isSelected
                                  ? selection.selectedTaskIds.filter((id) => id !== task.id)
                                  : [...selection.selectedTaskIds, task.id];
                                onUpdate(category.id, { selectedTaskIds: newIds });
                              }}
                              className="w-4 h-4 rounded"
                              style={{ accentColor: category.color }}
                            />
                            <span className="text-sm" style={{ color: '#0B0F2E' }}>
                              {task.name}
                            </span>
                            <span
                              className="ml-auto text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${category.color}10`,
                                color: category.color,
                              }}
                            >
                              {Math.round(task.automationRate * 100)}% auto
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Opcjonalnie: nadpisanie wynagrodzenia */}
                  <RangeSlider
                    label="Średnie wynagrodzenie w tym dziale"
                    value={selection.customSalary || category.avgMonthlySalary}
                    min={category.salaryRange.min}
                    max={category.salaryRange.max}
                    step={500}
                    suffix=" zł"
                    onChange={(val) => onUpdate(category.id, { customSalary: val })}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prawa kolumna: Live podsumowanie */}
      <div className="lg:col-span-1">
        <div
          className="sticky top-24 rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, #0B0F2E 0%, #1A2461 100%)',
          }}
        >
          <h3 className="text-white font-bold text-lg mb-4">Szacowane oszczędności</h3>

          <div className="space-y-4">
            <div>
              <div className="text-white/50 text-xs mb-1">Rocznie</div>
              <div className="text-3xl font-bold text-white">
                {formatZl(results.totalAnnualSavings)}{' '}
                <span className="text-base font-normal text-white/40">zł</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <div className="text-white/50 text-xs">Godziny / mies.</div>
                <div className="text-lg font-bold text-white">
                  {Math.round(results.totalMonthlyHoursSaved).toLocaleString('pl-PL')}
                </div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <div className="text-white/50 text-xs">Ekwiwalent etatów</div>
                <div className="text-lg font-bold" style={{ color: '#2E4AAD' }}>
                  {results.fteEquivalent}
                </div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <div className="text-white/50 text-xs">ROI (1 rok)</div>
                <div className="text-lg font-bold text-white">
                  {results.roiPercent}%
                </div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <div className="text-white/50 text-xs">Zwrot w</div>
                <div className="text-lg font-bold text-white">
                  {results.paybackMonths} mies.
                </div>
              </div>
            </div>

            {/* Per-process mini summary */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              {results.processes.map((proc) => (
                <div key={proc.categoryId} className="flex items-center justify-between">
                  <span className="text-xs text-white/60 truncate mr-2">{proc.categoryName}</span>
                  <span className="text-xs font-semibold text-white whitespace-nowrap">
                    {formatZl(proc.annualSavings)} zł
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
