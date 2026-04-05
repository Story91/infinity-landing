'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import type { WizardState, ProcessResult, AggregateResults } from '@/lib/kalkulator/types';
import { PROCESS_CATEGORIES, NATIONAL_AVG_SALARY } from '@/lib/kalkulator/constants';
import { calculateProcessResult, calculateAggregate } from '@/lib/kalkulator/engine';
import ProgressBar from './ProgressBar';
import ProcessSelectionStep from './steps/ProcessSelectionStep';
import ProcessConfigStep from './steps/ProcessConfigStep';
import CompanyInfoStep from './steps/CompanyInfoStep';
import ResultsDashboard from './steps/ResultsDashboard';

export default function KalkulatorWizard() {
  const [state, setState] = useState<WizardState>({
    currentStep: 0,
    selections: PROCESS_CATEGORIES.map((cat) => ({
      categoryId: cat.id,
      enabled: false,
      employeeCount: 3,
      hoursPerWeek: 20,
      selectedTaskIds: cat.tasks.map((t) => t.id),
    })),
    companyProfile: {
      companyName: '',
      industry: '',
      totalEmployees: 50,
      avgSalary: NATIONAL_AVG_SALARY,
      email: '',
    },
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Oblicz wyniki w real-time
  const results: AggregateResults = useMemo(() => {
    const enabledSelections = state.selections.filter((s) => s.enabled);
    const processResults: ProcessResult[] = enabledSelections.map((sel) => {
      const category = PROCESS_CATEGORIES.find((c) => c.id === sel.categoryId)!;
      return calculateProcessResult(sel, category, state.companyProfile.avgSalary);
    });
    return calculateAggregate(processResults, state.companyProfile);
  }, [state.selections, state.companyProfile]);

  const enabledCount = state.selections.filter((s) => s.enabled).length;

  // Nawigacja
  const goTo = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
    // Scroll to top of wizard
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const canGoNext = useCallback((): boolean => {
    switch (state.currentStep) {
      case 0: return enabledCount > 0;
      case 1: return enabledCount > 0;
      case 2: return true;
      default: return false;
    }
  }, [state.currentStep, enabledCount]);

  // Animacja przejść
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayStep, setDisplayStep] = useState(0);

  useEffect(() => {
    if (state.currentStep !== displayStep) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayStep(state.currentStep);
        setIsTransitioning(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [state.currentStep, displayStep]);

  // Settery stanu
  const toggleProcess = useCallback((categoryId: string) => {
    setState((prev) => ({
      ...prev,
      selections: prev.selections.map((s) =>
        s.categoryId === categoryId ? { ...s, enabled: !s.enabled } : s
      ),
    }));
  }, []);

  const updateSelection = useCallback(
    (categoryId: string, updates: Partial<WizardState['selections'][0]>) => {
      setState((prev) => ({
        ...prev,
        selections: prev.selections.map((s) =>
          s.categoryId === categoryId ? { ...s, ...updates } : s
        ),
      }));
    },
    []
  );

  const updateCompanyProfile = useCallback(
    (updates: Partial<WizardState['companyProfile']>) => {
      setState((prev) => ({
        ...prev,
        companyProfile: { ...prev.companyProfile, ...updates },
      }));
    },
    []
  );

  // Render kroku
  const renderStep = () => {
    switch (displayStep) {
      case 0:
        return (
          <ProcessSelectionStep
            selections={state.selections}
            onToggle={toggleProcess}
          />
        );
      case 1:
        return (
          <ProcessConfigStep
            selections={state.selections}
            onUpdate={updateSelection}
            results={results}
          />
        );
      case 2:
        return (
          <CompanyInfoStep
            profile={state.companyProfile}
            onUpdate={updateCompanyProfile}
          />
        );
      case 3:
        return (
          <ResultsDashboard
            results={results}
            companyProfile={state.companyProfile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 md:px-6">
      <ProgressBar
        currentStep={state.currentStep}
        onStepClick={(step) => goTo(step)}
      />

      {/* Kontent kroku */}
      <div
        className="transition-all duration-200"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(12px)' : 'translateY(0)',
        }}
      >
        {renderStep()}
      </div>

      {/* Nawigacja dolna */}
      {state.currentStep < 3 && (
        <div className="flex items-center justify-between mt-10 mb-6">
          <button
            type="button"
            onClick={() => goTo(state.currentStep - 1)}
            disabled={state.currentStep === 0}
            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'rgba(123,155,219,0.1)',
              color: '#fff',
              border: '1px solid rgba(123,155,219,0.2)',
            }}
          >
            Wstecz
          </button>

          {/* Mini-podsumowanie (kroki 1-2) */}
          {state.currentStep > 0 && state.currentStep < 3 && enabledCount > 0 && (
            <div className="hidden md:flex items-center gap-4 text-sm" style={{ color: '#7B9BDB' }}>
              <span>
                Szacowane oszczędności:{' '}
                <strong style={{ color: '#2E4AAD' }}>
                  {Math.round(results.totalAnnualSavings).toLocaleString('pl-PL')} zł/rok
                </strong>
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={() => goTo(state.currentStep + 1)}
            disabled={!canGoNext()}
            className="px-8 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: canGoNext() ? '#2E4AAD' : '#ccc',
              color: '#fff',
              boxShadow: canGoNext() ? '0 4px 20px rgba(46,74,173,0.3)' : 'none',
            }}
          >
            {state.currentStep === 2 ? 'Oblicz ROI' : 'Dalej'}
          </button>
        </div>
      )}
    </div>
  );
}
