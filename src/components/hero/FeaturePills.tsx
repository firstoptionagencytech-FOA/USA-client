'use client';

import React from 'react';
import { Zap, FileCheck2, CreditCard, TrendingUp, Star } from 'lucide-react';

interface FeaturePillsProps {
  onSelect?: () => void;
}

export const FeaturePills: React.FC<FeaturePillsProps> = ({ onSelect }) => {
  const features = [
    {
      icon: Zap,
      title: 'Instant Support',
      subtitle: 'Requests',
      badge: 'Sub-2m',
    },
    {
      icon: FileCheck2,
      title: 'Approve Quotes',
      subtitle: 'Online',
      badge: '1-Click',
    },
    {
      icon: CreditCard,
      title: 'Secure',
      subtitle: 'Payments',
      badge: 'Apple Pay',
    },
    {
      icon: TrendingUp,
      title: 'Real-Time',
      subtitle: 'Tracking',
      badge: 'Live SLA',
    },
    {
      icon: Star,
      title: 'Your Brand,',
      subtitle: 'Your Portal',
      badge: 'White-Label',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 my-6 sm:my-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 py-2 px-1">
        {features.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              onClick={onSelect}
              className="group cursor-pointer bg-white rounded-2xl py-4 px-3 sm:py-5 sm:px-4 border border-[#dce3d4] shadow-xs hover:shadow-[0_12px_24px_rgba(24,44,38,0.12)] hover:border-[#274c3b] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex flex-col items-center text-center justify-between min-h-[110px] sm:min-h-[120px] relative overflow-hidden"
            >
              {/* Micro Kicker Badge */}
              <span className="text-[9px] font-black uppercase tracking-wider text-[#61705f] group-hover:text-[#274c3b] transition-colors mb-2">
                {item.badge}
              </span>

              {/* 3D Glass Badge - Jewar Pine & Lime */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#11201b] via-[#182c26] to-[#274c3b] text-[#d2f56d] border border-[#d2f56d]/30 shadow-xs flex items-center justify-center mb-2 group-hover:scale-110 group-hover:border-[#d2f56d] transition-transform duration-200">
                <IconComp className="w-5 h-5 stroke-[2.2]" />
              </div>

              {/* Label */}
              <div className="text-[11px] sm:text-xs font-black text-[#182c26] leading-tight tracking-tight group-hover:text-[#274c3b] transition-colors font-display">
                <div>{item.title}</div>
                <div>{item.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
