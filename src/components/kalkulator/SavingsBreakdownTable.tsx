'use client';

import type { ProcessResult } from '@/lib/kalkulator/types';
import { formatZl, formatHours } from '@/lib/kalkulator/engine';

interface SavingsBreakdownTableProps {
  processes: ProcessResult[];
}

export default function SavingsBreakdownTable({ processes }: SavingsBreakdownTableProps) {
  const sorted = [...processes].sort((a, b) => b.annualSavings - a.annualSavings);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
      <div className="p-5 pb-3">
        <h3 className="text-lg font-bold" style={{ color: '#fff' }}>
          Rozbicie oszczędności per proces
        </h3>
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(123,155,219,0.2)' }}>
              <th className="text-left px-5 py-3 font-semibold" style={{ color: '#7B9BDB' }}>
                Proces
              </th>
              <th className="text-center px-3 py-3 font-semibold" style={{ color: '#7B9BDB' }}>
                Pracownicy
              </th>
              <th className="text-center px-3 py-3 font-semibold" style={{ color: '#7B9BDB' }}>
                Godz. zaoszcz./mies.
              </th>
              <th className="text-center px-3 py-3 font-semibold" style={{ color: '#7B9BDB' }}>
                % automatyzacji
              </th>
              <th className="text-right px-5 py-3 font-semibold" style={{ color: '#7B9BDB' }}>
                Oszczędności/rok
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((proc) => (
              <tr
                key={proc.categoryId}
                className="transition-colors hover:bg-white/10"
                style={{ borderBottom: '1px solid #F0F0EC' }}
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: proc.categoryColor }}
                    />
                    <span className="font-medium" style={{ color: '#fff' }}>
                      {proc.categoryName}
                    </span>
                  </div>
                </td>
                <td className="text-center px-3 py-3" style={{ color: '#fff' }}>
                  {proc.employeeCount}
                </td>
                <td className="text-center px-3 py-3" style={{ color: '#fff' }}>
                  {formatHours(proc.automatedHours)}h
                </td>
                <td className="text-center px-3 py-3">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-16 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${proc.automationPercentage}%`,
                          backgroundColor: proc.categoryColor,
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold" style={{ color: proc.categoryColor }}>
                      {proc.automationPercentage}%
                    </span>
                  </div>
                </td>
                <td className="text-right px-5 py-3 font-bold" style={{ color: '#2E4AAD' }}>
                  {formatZl(proc.annualSavings)} zł
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: '2px solid rgba(123,155,219,0.2)' }}>
              <td className="px-5 py-3 font-bold" style={{ color: '#fff' }}>
                Razem
              </td>
              <td className="text-center px-3 py-3 font-bold" style={{ color: '#fff' }}>
                {sorted.reduce((s, p) => s + p.employeeCount, 0)}
              </td>
              <td className="text-center px-3 py-3 font-bold" style={{ color: '#fff' }}>
                {formatHours(sorted.reduce((s, p) => s + p.automatedHours, 0))}h
              </td>
              <td />
              <td className="text-right px-5 py-3 font-bold text-lg" style={{ color: '#2E4AAD' }}>
                {formatZl(sorted.reduce((s, p) => s + p.annualSavings, 0))} zł
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile - karty */}
      <div className="md:hidden space-y-2 px-4 pb-4">
        {sorted.map((proc) => (
          <div
            key={proc.categoryId}
            className="rounded-xl p-3"
            style={{ backgroundColor: '#F8F8F5', border: '1px solid #F0F0EC' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: proc.categoryColor }}
                />
                <span className="font-bold text-sm" style={{ color: '#fff' }}>
                  {proc.categoryName}
                </span>
              </div>
              <span className="font-bold text-sm" style={{ color: '#2E4AAD' }}>
                {formatZl(proc.annualSavings)} zł/rok
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: '#7B9BDB' }}>
              <span>{proc.employeeCount} os.</span>
              <span>{formatHours(proc.automatedHours)}h/mies.</span>
              <span>{proc.automationPercentage}% auto</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
