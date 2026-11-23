'use client';

import React from 'react';
import { HeartHandshake, ShieldCheck, DollarSign, Sparkles, CheckCircle2 } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: HeartHandshake,
      title: 'Be Easier to Remember',
      subtitle: 'Brand Recognition',
      metric: 'Your App Icon',
      description:
        'A branded app gives customers a recognizable place to find your business when they need help, right on their phone screen.',
    },
    {
      icon: DollarSign,
      title: 'Give Customers More Reasons to Return',
      subtitle: 'Repeat Business',
      metric: 'Loyalty Rewards',
      description:
        'Loyalty rewards and referral programs can support repeat-business opportunities, giving clients incentives to stay loyal to your brand.',
    },
    {
      icon: ShieldCheck,
      title: 'Make Service Easier to Access',
      subtitle: 'Frictionless Requests',
      metric: '1-Tap Service',
      description:
        'Let customers submit requests, review quotes, approve work, make payments, and follow progress directly without phone tag.',
    },
    {
      icon: Sparkles,
      title: 'Build a More Professional Experience',
      subtitle: 'Premium Perception',
      metric: 'Client Portal',
      description:
        'Your brand becomes part of the service journey, from the first request to the next visit, elevating your business above commodity competitors.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden" id="benefits">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#274c3b]" />
            <span>Business Benefits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            Build a Business Customers Want to Return To.
          </h2>
          <p className="text-base sm:text-lg text-[#61705f] leading-relaxed">
            Your expertise solves the IT problem. Your branded platform improves the experience around it. Same high-level service, delivered in a way clients appreciate and stick with.
          </p>
        </div>

        {/* 4 Benefits Grid with Crisp 3D Glass Badges & Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const IconComp = b.icon;
            return (
              <div
                key={idx}
                className="group bg-[#f6f6ef] rounded-3xl p-7 sm:p-9 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex gap-5 items-start"
              >
                {/* 3D Pine & Cyber Lime Glass Badge */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#11201b] via-[#182c26] to-[#274c3b] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-3 shrink-0 group-hover:scale-110 group-hover:border-[#d2f56d] transition-all duration-300">
                  <IconComp className="w-7 h-7 stroke-[2.2]" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#274c3b] group-hover:text-[#274c3b]">
                      {b.subtitle}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#dce3d4] text-[10px] font-extrabold text-[#182c26] group-hover:bg-[#182c26] group-hover:text-[#d2f56d] group-hover:border-[#d2f56d]/40 transition-colors">
                      {b.metric}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#182c26] mt-1 mb-2.5 group-hover:text-[#274c3b] transition-colors font-display">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
