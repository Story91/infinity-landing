'use client';

import type { ProcessSelection } from '@/lib/kalkulator/types';
import { PROCESS_CATEGORIES } from '@/lib/kalkulator/constants';
import ProcessCard from '../ProcessCard';

interface ProcessSelectionStepProps {
  selections: ProcessSelection[];
  onToggle: (categoryId: string) => void;
}

export default function ProcessSelectionStep({
  selections,
  onToggle,
}: ProcessSelectionStepProps) {
  const enabledCount = selections.filter((s) => s.enabled).length;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0B0F2E' }}>
          Które procesy chcesz zautomatyzować?
        </h2>
        <p className="text-sm" style={{ color: '#7B9BDB' }}>
          Wybierz minimum 1 kategorię. Zaznacz wszystkie obszary, w których Twoja firma traci czas na powtarzalne zadania.
        </p>
        {enabledCount > 0 && (
          <p className="text-sm mt-2 font-semibold" style={{ color: '#2E4AAD' }}>
            Wybrano: {enabledCount} {enabledCount === 1 ? 'kategoria' : enabledCount < 5 ? 'kategorie' : 'kategorii'}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {PROCESS_CATEGORIES.map((category) => {
          const selection = selections.find((s) => s.categoryId === category.id);
          return (
            <ProcessCard
              key={category.id}
              category={category}
              enabled={selection?.enabled ?? false}
              onToggle={() => onToggle(category.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
