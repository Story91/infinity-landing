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
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
        <div
          className="absolute top-5 left-0 h-0.5 transition-all duration-500 ease-out"
          style={{
            width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
            backgroundColor: '#2E4AAD',
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
                  backgroundColor: isActive || isCompleted ? '#2E4AAD' : '#fff',
                  color: isActive || isCompleted ? '#fff' : '#7B9BDB',
                  border: isActive || isCompleted ? '3px solid #2E4AAD' : '3px solid #D6E4FF',
                  transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  boxShadow: isActive ? '0 0 20px rgba(46,74,173,0.3)' : 'none',
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
                style={{ color: isActive ? '#2E4AAD' : isCompleted ? '#0B0F2E' : '#7B9BDB' }}
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
