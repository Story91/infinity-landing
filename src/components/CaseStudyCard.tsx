'use client';

import Image from 'next/image';
import { ArrowRight, TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  logo: string;
  coverImage: string;
  summary: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
    icon: 'time' | 'money' | 'efficiency';
  }[];
  testimonial?: {
    name: string;
    role: string;
    quote: string;
  };
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'time':
        return <Clock className="w-5 h-5" />;
      case 'money':
        return <DollarSign className="w-5 h-5" />;
      case 'efficiency':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-br from-[#2E4AAD] to-[#1A2461]">
        <Image
          src={caseStudy.coverImage}
          alt={caseStudy.company}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden">
            <span className="text-xs font-bold text-[#2E4AAD]">{caseStudy.company.substring(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <h3 className="text-white font-bold">{caseStudy.company}</h3>
            <p className="text-white/80 text-sm">{caseStudy.industry}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-[#1A2461] mb-6">{caseStudy.summary}</p>

        {/* Results */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {caseStudy.results.map((result, index) => (
            <div key={index} className="text-center">
              <div className="w-10 h-10 rounded-full bg-[#D6E4FF] text-[#2E4AAD] flex items-center justify-center mx-auto mb-2">
                {getIcon(result.icon)}
              </div>
              <p className="text-lg font-bold text-[#0B0F2E]">{result.value}</p>
              <p className="text-xs text-[#7B9BDB]">{result.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <div className="bg-[#D6E4FF] rounded-xl p-4 mb-6">
            <p className="text-sm text-[#1A2461] italic mb-2">{`"${caseStudy.testimonial.quote}"`}</p>
            <p className="text-xs text-[#7B9BDB]">
              {caseStudy.testimonial.name}, {caseStudy.testimonial.role}
            </p>
          </div>
        )}

        {/* CTA */}
        <a
          href="/#kontakt"
          className="inline-flex items-center gap-2 text-[#2E4AAD] font-medium hover:gap-3 transition-all"
        >
          Skontaktuj się z nami <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
