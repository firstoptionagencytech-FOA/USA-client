'use client';

import React from 'react';
import Image from 'next/image';
import { Smartphone, Globe, LayoutDashboard, Users2, Gift, CheckCircle2, ArrowRight } from 'lucide-react';

interface SolutionSectionProps {
  onOpenBooking: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenBooking }) => {
  const pillars = [
    {
      icon: Smartphone,
      image: '/brand/feature_icon_5_transparent.png',
      title: '1. Your Branded Customer Mobile App',
      description:
        'Give customers a convenient way to access your IT services, submit support requests, review quotes, book meetings, and follow progress right from iOS and Android.',
      bullet: 'iOS & Android App with your logo & company colors',
    },
    {
      icon: Globe,
      image: '/brand/feature_icon_4_transparent.png',
      title: '2. Your Branded Customer Web Portal',
      description:
        'Let clients access their requests, hardware device records, pending approvals, invoices, service credits, and referral rewards directly from any web browser.',
      bullet: 'Hosted on your custom domain with SSL',
    },
    {
      icon: LayoutDashboard,
      image: '/brand/feature_icon_1_transparent.png',
      title: '3. Your Owner Admin Dashboard',
      description:
        'Keep track of customer requests, technician allocation, pricing, quote revisions, delivery timelines, and real-time business health.',
      bullet: 'Full visibility over queues, SLA times, and payments',
    },
    {
      icon: Users2,
      image: '/brand/feature_icon_2_transparent.png',
      title: '4. Unlimited Support Agents',
      description:
        'Give your entire support team access without pricing that increases for every additional technician or dispatcher, subject to agreed package terms.',
      bullet: 'No per-seat penalty fees as your team expands',
    },
    {
      icon: Gift,
      image: '/brand/feature_icon_3_transparent.png',
      title: '5. Loyalty and Referral Tools',
      description:
        'Create opportunities to encourage returning customers and reward qualified client referrals through configurable service credits and loyalty workflows.',
      bullet: 'Automated referral credits & recurring customer retention',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#274c3b]" />
            <span>The Complete Solution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-5">
            What If Every Client Had a Better Way to Work With You?
          </h2>
          <p className="text-base sm:text-lg text-[#61705f] leading-relaxed">
            Imagine a customer opening an app with your business name and logo. They can request IT support, review a quote, approve the work, make a payment, and check progress—all in one connected experience. Meanwhile, you manage everything from your owner dashboard.
          </p>
          <p className="text-sm font-semibold text-[#274c3b] mt-3">
            No need to build software from scratch. Meet JIT Helpdesk.
          </p>
        </div>

        {/* 5 Pillar Grid with Small Without-BG Visual Badges & Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((p, idx) => {
            return (
              <div
                key={idx}
                className="group bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Small, highly attractive without-bg image badge */}
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#dce3d4] shadow-xs flex items-center justify-center p-2.5 mb-6 group-hover:scale-110 group-hover:border-[#d2f56d] transition-all duration-300">
                    <Image unoptimized
                      src={p.image}
                      alt={p.title}
                      width={42}
                      height={42}
                      className="w-full h-full object-contain filter drop-shadow-xs"
                    />
                  </div>
                  
                  <h3 className="text-lg font-extrabold text-[#182c26] mb-3 tracking-tight group-hover:text-[#274c3b] transition-colors">
                    {p.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#dce3d4] flex items-center gap-2 text-xs font-bold text-[#182c26] group-hover:border-[#274c3b]/30 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{p.bullet}</span>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Custom Package Summary CTA */}
          <div className="bg-gradient-to-br from-[#182c26] to-[#274c3b] rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl border border-[#d2f56d]/30 relative overflow-hidden group">
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#d2f56d] text-xs font-bold tracking-wider uppercase mb-4 inline-block border border-[#d2f56d]/20">
                All Included
              </span>
              <h3 className="text-xl sm:text-2xl font-black mb-3 font-display">
                One Setup. Full Solution.
              </h3>
              <p className="text-xs sm:text-sm text-[#edf3e3]/90 leading-relaxed">
                App, portal, owner dashboard, and onboarding consultation are all included in your transparent package. No hidden setup fees or surprise add-ons.
              </p>
            </div>

            <div className="mt-8 relative z-10">
              <button
                onClick={onOpenBooking}
                className="poster-glow-btn w-full py-3.5 px-6 rounded-full text-white font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 group-hover:scale-[1.02]"
              >
                <span>Book Your Free Live Demo</span>
                <ArrowRight className="w-4 h-4 text-[#d2f56d]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
