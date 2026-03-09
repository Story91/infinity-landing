'use client';

import { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface RippleProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Ripple({ children, className, onClick }: RippleProps) {
  const ripples = useRef<Array<{ x: number; y: number; id: number }>>([]);
  const [rippleArray, setRippleArray] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    
    ripples.current.push(newRipple);
    setRippleArray([...ripples.current]);

    setTimeout(() => {
      ripples.current = ripples.current.filter(r => r.id !== newRipple.id);
      setRippleArray([...ripples.current]);
    }, 600);

    onClick?.();
  }, [onClick]);

  return (
    <button
      onClick={createRipple}
      className={cn(
        'relative overflow-hidden rounded-full px-8 py-4 font-semibold transition-all',
        'bg-indigo-600 hover:bg-indigo-700 text-white',
        className
      )}
    >
      {children}
      {rippleArray.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ripple"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
          }}
        />
      ))}
    </button>
  );
}
