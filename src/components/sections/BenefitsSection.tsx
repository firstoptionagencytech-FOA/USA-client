'use client';

import React from 'react';
import Image from 'next/image';
import { HeartHandshake, ShieldCheck, DollarSign, Sparkles } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: HeartHandshake,
      image: '/brand/feature_icon_5_transparent.png',
      title: 'Higher Client Retention & Trust',
      subtitle: 'Stand Out From Competitors',
      description:
        'When customers have their own dedicated branded portal, they view your IT company as an established, permanent infrastructure partner—not just an on-call freelancer.',
    },
    {
      icon: ShieldCheck,
      image: '/brand/feature_icon_2_transparent.png',
      title: 'Faster Approvals & Clear Scopes',
      subtitle: 'Zero Lost Quotes',
      description:
        'Quotes and scopes are presented clearly with direct 1-click approvals. No more chasing down signatures or wondering if a client saw your email.',
    },
    {
      icon: DollarSign,
      image: '/brand/feature_icon_3_transparent.png',
      title: 'Predictable Cash Flow & Payments',
      subtitle: 'Prompt Payment Collection',
      description:
        'Integrated payment workflows allow clients to settle invoices via Apple Pay, Google Pay, and Stripe cards instantly from their phone or browser.',
    },
    {
      icon: Sparkles,
      image: '/brand/feature_icon_4_transparent.png',
      title: 'Operational Calm & Clear Queues',
      subtitle: 'Eliminate Status Tag Chaos',
      description:
        'By providing self-service status tracking, your technicians spend less time answering “Where is my ticket?” calls and more time resolving billable issues.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#274c3b]" />
            <span>Commercial Business Benefits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            Don&apos;t Just Manage Support. Build a Business Customers Want to Return To.
          </h2>
          <p className="text-base sm:text-lg text-[#61705f] leading-relaxed">
            JIT Helpdesk isn&apos;t only about organizing requests. It&apos;s about creating a better business experience that supports your bottom line. Same IT expertise. A more professional way to deliver it.
          </p>
        </div>

        {/* 4 Benefits Grid with Without-BG Visual Badges & Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            return (
              <div
                key={idx}
                className="group bg-[#f6f6ef] rounded-3xl p-7 sm:p-9 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex gap-5 items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#dce3d4] shadow-xs flex items-center justify-center p-2.5 shrink-0 group-hover:scale-110 group-hover:border-[#d2f56d] transition-all duration-300">
                  <Image unoptimized
                    src={b.image}
                    alt={b.title}
                    width={42}
                    height={42}
                    className="w-full h-full object-contain filter drop-shadow-xs"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#274c3b] group-hover:text-[#274c3b]">
                    {b.subtitle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#182c26] mt-1 mb-2.5 group-hover:text-[#274c3b] transition-colors">
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
