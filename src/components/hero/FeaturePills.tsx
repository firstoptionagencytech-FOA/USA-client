'use client';

import React from 'react';
import { Zap, FileCheck, CreditCard, TrendingUp, Star } from 'lucide-react';

interface FeaturePillsProps {
  onSelect?: () => void;
}

export const FeaturePills: React.FC<FeaturePillsProps> = ({ onSelect }) => {
  const features = [
    {
      icon: '/brand/feature_icon_1_transparent.png',
      fallbackIcon: Zap,
      title: 'Instant Support',
      subtitle: 'Requests',
    },
    {
      icon: '/brand/feature_icon_2_transparent.png',
      fallbackIcon: FileCheck,
      title: 'Approve Quotes',
      subtitle: 'Online',
    },
    {
      icon: '/brand/feature_icon_3_transparent.png',
      fallbackIcon: CreditCard,
      title: 'Secure',
      subtitle: 'Payments',
    },
    {
      icon: '/brand/feature_icon_4_transparent.png',
      fallbackIcon: TrendingUp,
      title: 'Real-Time',
      subtitle: 'Tracking',
    },
    {
      icon: '/brand/feature_icon_5_transparent.png',
      fallbackIcon: Star,
      title: 'Your Brand,',
      subtitle: 'Your Portal',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 my-6 sm:my-8">
      <div className="flex sm:grid sm:grid-cols-5 gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-2 px-1 justify-start sm:justify-center">
        {features.map((item, idx) => (
          <div
            key={idx}
            onClick={onSelect}
            className="group cursor-pointer bg-white rounded-2xl py-3 px-2 sm:py-3.5 sm:px-3 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_24px_rgba(139,0,50,0.1)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex flex-col items-center text-center justify-center w-[120px] sm:w-auto shrink-0 sm:shrink min-h-[86px] sm:min-h-[96px]"
          >
            {/* Transparent Icon directly on card, NO grey nested box */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110">
              <img
                src={item.icon}
                alt={item.title}
                className="w-full h-full object-contain filter drop-shadow-2xs"
              />
            </div>
            <div className="text-[10px] sm:text-[11px] md:text-xs font-black text-slate-800 leading-tight tracking-tight">
              <div>{item.title}</div>
              <div>{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
