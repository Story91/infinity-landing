'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function Accordion({ items, className = '' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
          >
            <span className="font-medium text-slate-900">{item.question}</span>
            <ChevronDown
              className={cn(
                'h-5 w-5 text-slate-500 transition-transform duration-300',
                openIndex === index && 'rotate-180'
              )}
            />
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <p className="px-5 pb-5 text-slate-600">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
