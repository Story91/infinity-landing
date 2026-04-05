'use client';

interface RangeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}

export default function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = '',
  onChange,
}: RangeSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium" style={{ color: '#fff' }}>
          {label}
        </label>
        <span className="text-sm font-bold" style={{ color: '#2E4AAD' }}>
          {value.toLocaleString('pl-PL')}{suffix}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #2E4AAD 0%, #2E4AAD ${percentage}%, rgba(123,155,219,0.2) ${percentage}%, rgba(123,155,219,0.2) 100%)`,
            accentColor: '#2E4AAD',
          }}
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: '#7B9BDB' }}>
          <span>{min.toLocaleString('pl-PL')}{suffix}</span>
          <span>{max.toLocaleString('pl-PL')}{suffix}</span>
        </div>
      </div>
    </div>
  );
}
