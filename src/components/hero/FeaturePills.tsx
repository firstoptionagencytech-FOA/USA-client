'use client';

import React from 'react';
import { Zap, FileCheck, CreditCard, TrendingUp, ShieldCheck } from 'lucide-react';

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
      icon: ShieldCheck,
      label: 'Your Brand, Your Portal',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 my-6 sm:my-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3.5">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={onSelect}
              className="group cursor-pointer bg-white/95 hover:bg-white rounded-2xl p-3 sm:p-3.5 border border-pink-100/90 shadow-[0_4px_16px_rgba(139,0,50,0.04)] hover:shadow-[0_8px_24px_rgba(139,0,50,0.09)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center justify-center min-h-[92px]"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-50 group-hover:bg-brand-100/80 text-brand-700 flex items-center justify-center mb-1.5 transition-colors">
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-snug tracking-tight">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
