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
        <label className="text-sm font-medium" style={{ color: '#0D0F05' }}>
          {label}
        </label>
        <span className="text-sm font-bold" style={{ color: '#EC6B2D' }}>
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
            background: `linear-gradient(to right, #EC6B2D 0%, #EC6B2D ${percentage}%, #E4E6DD ${percentage}%, #E4E6DD 100%)`,
            accentColor: '#EC6B2D',
          }}
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: '#777870' }}>
          <span>{min.toLocaleString('pl-PL')}{suffix}</span>
          <span>{max.toLocaleString('pl-PL')}{suffix}</span>
        </div>
      </div>
    </div>
  );
}
