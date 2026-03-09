'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AnimatedGradientProps {
  colors?: string[];
  speed?: number;
  className?: string;
}

export default function AnimatedGradient({
  colors = ['#6366f1', '#a855f7', '#ec4899', '#6366f1'],
  speed = 8,
  className = '',
}: AnimatedGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    gsap.to(element, {
      backgroundPosition: '200% 0',
      duration: speed,
      repeat: -1,
      ease: 'linear',
    });
  }, [speed]);

  const gradientStyle = {
    background: `linear-gradient(90deg, ${colors.join(', ')})`,
    backgroundSize: '200% 100%',
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={gradientStyle}
    />
  );
}
