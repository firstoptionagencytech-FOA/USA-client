'use client';

import React from 'react';
import { Zap, FileCheck, CreditCard, TrendingUp, Star } from 'lucide-react';

interface FeaturePillsProps {
  onSelect?: () => void;
}

export const FeaturePills: React.FC<FeaturePillsProps> = ({ onSelect }) => {
  const features = [
    {
      icon: Zap,
      label: 'Instant Support Requests',
    },
    {
      icon: FileCheck,
      label: 'Approve Quotes Online',
    },
    {
      icon: CreditCard,
      label: 'Secure Payments',
    },
    {
      icon: TrendingUp,
      label: 'Real-Time Tracking',
    },
    {
      icon: Star,
      label: 'Your Brand, Your Portal',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-1 sm:px-4 my-6 sm:my-8">
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 md:gap-3.5">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={onSelect}
              className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3.5 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 flex flex-col items-center text-center justify-center min-h-[84px] sm:min-h-[96px]"
            >
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-slate-100 group-hover:bg-brand-50 text-[#8B0032] flex items-center justify-center mb-1 sm:mb-1.5 transition-colors shadow-2xs">
                <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.3]" />
              </div>
              <span className="text-[8px] sm:text-[11px] md:text-xs font-black text-slate-800 leading-tight tracking-tight">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
