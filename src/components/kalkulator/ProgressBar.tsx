'use client';

const STEPS = [
  { label: 'Procesy', shortLabel: '1' },
  { label: 'Konfiguracja', shortLabel: '2' },
  { label: 'Firma', shortLabel: '3' },
  { label: 'Wyniki', shortLabel: '4' },
];

interface ProgressBarProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function ProgressBar({ currentStep, onStepClick }: ProgressBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between relative">
        {/* Linia łącząca */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" />
        <div
          className="absolute top-5 left-0 h-0.5 transition-all duration-500 ease-out"
          style={{
            width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
            backgroundColor: '#4F6AE8',
          }}
        />

        {STEPS.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;
          const isClickable = i < currentStep && onStepClick;

          return (
            <button
              key={i}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(i)}
              className="relative z-10 flex flex-col items-center gap-2"
              style={{ cursor: isClickable ? 'pointer' : 'default' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  backgroundColor: isActive || isCompleted ? '#2E4AAD' : 'rgba(10,22,40,0.8)',
                  color: isActive || isCompleted ? '#fff' : 'rgba(123,155,219,0.5)',
                  border: isActive || isCompleted ? '2px solid #4F6AE8' : '2px solid rgba(123,155,219,0.15)',
                  transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  boxShadow: isActive ? '0 0 20px rgba(79,106,232,0.4)' : 'none',
                }}
              >
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  step.shortLabel
                )}
              </div>
              <span
                className="text-xs font-medium hidden sm:block transition-colors"
                style={{ color: isActive ? '#7B9BDB' : isCompleted ? '#7B9BDB' : 'rgba(255,255,255,0.3)' }}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
