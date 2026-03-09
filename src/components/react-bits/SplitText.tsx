'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: object;
  to?: object;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export default function SplitText({
  text,
  tag: Tag = 'p',
  className,
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!isVisible) return;

    const chars = containerRef.current?.querySelectorAll('.char, .word');
    if (!chars) return;

    gsap.fromTo(chars, from, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
    });
  }, [isVisible, from, to, duration, ease, delay]);

  const renderText = () => {
    if (splitType === 'words' || splitType === 'words, chars') {
      const words = text.split(' ');
      return words.map((word, wordIndex) => (
        <span key={wordIndex} className="word inline-block mr-1">
          {splitType === 'words, chars' ? (
            <span>
              {word.split('').map((char, charIndex) => (
                <span key={charIndex} className="char inline-block">
                  {char}
                </span>
              ))}
            </span>
          ) : (
            <span className="word inline-block">{word}</span>
          )}
          {wordIndex < words.length - 1 && ' '}
        </span>
      ));
    }

    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <Tag
      ref={containerRef}
      className={cn('split-text', className)}
      style={{ textAlign }}
    >
      {renderText()}
    </Tag>
  );
}
