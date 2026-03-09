'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  rootMargin?: string;
}

export default function FadeIn({
  children,
  className,
  duration = 1,
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  rootMargin = '0px',
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!isVisible) return;

    const directions = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { x: 40, y: 0 },
      right: { x: -40, y: 0 },
      none: { x: 0, y: 0 },
    };

    gsap.fromTo(
      ref.current,
      { opacity: 0, ...directions[direction] },
      { opacity: 1, x: 0, y: 0, duration, delay, ease: 'power3.out' }
    );
  }, [isVisible, direction, duration, delay]);

  return (
    <div ref={ref} className={cn('fade-in', className)}>
      {children}
    </div>
  );
}
