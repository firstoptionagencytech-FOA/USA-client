'use client';

import React from 'react';
import { HeartHandshake, ShieldCheck, DollarSign, Sparkles, CheckCircle2 } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: HeartHandshake,
      title: 'Be Easier to Remember',
      subtitle: 'BRAND RECOGNITION',
      badge: 'App on Phone',
      accentGlow: 'from-[#d2f56d]/20 to-transparent',
      snippetLabel: 'App Icon on Client Phone',
      snippetStatus: 'Always Visible',
      description:
        'A branded app gives customers a recognizable place to find your business when they need help, right on their iPhone and Android home screen.',
    },
    {
      icon: DollarSign,
      title: 'Give Customers More Reasons to Return',
      subtitle: 'REPEAT BUSINESS',
      badge: 'Loyalty Rewards',
      accentGlow: 'from-[#274c3b]/30 to-transparent',
      snippetLabel: 'Starbucks-Style Points',
      snippetStatus: 'Repeat Account Lock-In',
      description:
        'Loyalty rewards and referral programs can support repeat-business opportunities, giving clients incentives to stay loyal to your brand.',
    },
    {
      icon: ShieldCheck,
      title: 'Make Service Easier to Access',
      subtitle: 'FRICTIONLESS REQUESTS',
      badge: '1-Tap Service',
      accentGlow: 'from-[#d2f56d]/20 to-transparent',
      snippetLabel: 'No Phone Tag or Lost Emails',
      snippetStatus: '1-Click Digital Sign-Off',
      description:
        'Let customers submit requests, review quotes, approve work, make payments, and follow progress directly without phone tag.',
    },
    {
      icon: Sparkles,
      title: 'Build a More Professional Experience',
      subtitle: 'PREMIUM PERCEPTION',
      badge: 'Client Portal',
      accentGlow: 'from-[#274c3b]/30 to-transparent',
      snippetLabel: 'support.yourcompany.com',
      snippetStatus: 'SSL Enterprise Security',
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

        {/* 4 Benefits Grid with Ambient Corner Glows & Live Embedded Dark Snippets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const IconComp = b.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-3xl p-7 sm:p-9 border border-[#dce3d4] hover:border-[#274c3b] hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Amplified Ambient Top-Right Corner Glow */}
                <div className="absolute -top-12 -right-12 w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-[#d2f56d]/35 via-[#274c3b]/20 to-transparent rounded-full blur-2xl opacity-80 group-hover:opacity-100 group-hover:scale-130 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: 3D Vector Icon Badge & Micro Pill */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d2f56d] via-[#274c3b] to-[#182c26] p-0.5 border-2 border-white/70 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-full h-full rounded-[14px] bg-[#182c26]/90 backdrop-blur-xs flex items-center justify-center text-[#d2f56d]">
                        <IconComp className="w-6 h-6 stroke-[2.2] group-hover:animate-pulse" />
                      </div>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#edf3e3] text-[#274c3b] border border-[#dce3d4]">
                      {b.badge}
                    </span>
                  </div>

                  {/* Subtitle / Kicker */}
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#61705f] mb-1">
                    {b.subtitle}
                  </div>

                  {/* Main Title */}
                  <h3 className="text-xl font-black text-[#182c26] tracking-tight leading-snug mb-3 group-hover:text-[#274c3b] transition-colors font-display">
                    {b.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-6">
                    {b.description}
                  </p>
                </div>

                {/* Embedded Live UI Snippet (Dark Pine Glass) */}
                <div className="mt-auto pt-3 border-t border-slate-100 relative z-10">
                  <div className="bg-[#11201b] rounded-xl p-3 border border-[#274c3b] flex items-center justify-between text-[11px] text-white shadow-inner">
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#edf3e3] truncate max-w-[170px]">
                      {b.snippetLabel}
                    </span>
                    <span className="text-[#d2f56d] font-bold text-[10px] sm:text-[11px] shrink-0 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d2f56d] live-indicator" />
                      {b.snippetStatus}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
