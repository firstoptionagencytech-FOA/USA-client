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
    <div className="w-full max-w-5xl mx-auto px-4 my-6 sm:my-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={onSelect}
              className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-4.5 border border-pink-100/80 shadow-[0_6px_20px_rgba(139,0,50,0.06)] hover:shadow-[0_12px_28px_rgba(139,0,50,0.12)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex flex-col items-center text-center justify-center min-h-[105px]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FAF0F4] group-hover:bg-[#F5DDE6] text-[#8B0032] flex items-center justify-center mb-2 transition-colors shadow-2xs">
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xs sm:text-[13px] font-extrabold text-slate-800 leading-snug tracking-tight">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
