'use client';

import { useState, useEffect } from 'react';

interface TextTypeProps {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export default function TextType({
  texts,
  className = '',
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
}: TextTypeProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    
    if (!isDeleting) {
      if (currentText.length < text.length) {
        const timeout = setTimeout(() => {
          setCurrentText(text.slice(0, currentText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((currentTextIndex + 1) % texts.length);
      }
    }
  }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
