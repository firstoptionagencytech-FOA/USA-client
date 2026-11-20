'use client';

import React from 'react';
import { Smartphone, Globe, LayoutDashboard, Users2, Gift, CheckCircle2 } from 'lucide-react';

interface SolutionSectionProps {
  onOpenBooking: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenBooking }) => {
  const pillars = [
    {
      icon: Smartphone,
      title: '1. Your Branded Customer Mobile App',
      description:
        'Give customers a convenient way to access your IT services, submit support requests, review quotes, book meetings, and follow progress right from iOS and Android.',
      bullet: 'iOS & Android App with your logo & company colors',
    },
    {
      icon: Globe,
      title: '2. Your Branded Customer Web Portal',
      description:
        'Let clients access their requests, hardware device records, pending approvals, invoices, service credits, and referral rewards directly from any web browser.',
      bullet: 'Hosted on your custom domain with SSL',
    },
    {
      icon: LayoutDashboard,
      title: '3. Your Owner Admin Dashboard',
      description:
        'Keep track of customer requests, technician allocation, pricing, quote revisions, delivery timelines, and real-time business health.',
      bullet: 'Full visibility over queues, SLA times, and payments',
    },
    {
      icon: Users2,
      title: '4. Unlimited Support Agents',
      description:
        'Give your entire support team access without pricing that increases for every additional technician or dispatcher, subject to agreed package terms.',
      bullet: 'No per-seat penalty fees as your team expands',
    },
    {
      icon: Gift,
      title: '5. Loyalty and Referral Tools',
      description:
        'Create opportunities to encourage returning customers and reward qualified client referrals through configurable service credits and loyalty workflows.',
      bullet: 'Automated referral credits & recurring customer retention',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200/60 text-brand-800 text-xs font-bold uppercase tracking-wider mb-4">
            The Complete Solution
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-5">
            What If Every Client Had a Better Way to Work With You?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Imagine a customer opening an app with your business name and logo. They can request IT support, review a quote, approve the work, make a payment, and check progress—all in one connected experience. Meanwhile, you manage everything from your owner dashboard.
          </p>
          <p className="text-sm font-semibold text-brand-800 mt-3">
            No need to build software from scratch. Meet JIT Helpdesk.
          </p>
        </div>

        {/* 5 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-[#274c3b] hover:shadow-card-soft transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-brand-700 shadow-xs flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  
                  <h3 className="text-lg font-extrabold text-slate-900 mb-3 tracking-tight">
                    {p.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{p.bullet}</span>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Custom Package Summary CTA */}
          <div className="bg-gradient-to-br from-[#182c26] to-[#274c3b] rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#d2f56d] text-xs font-bold tracking-wider uppercase mb-4 inline-block">
                All-Inclusive Setup
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display mb-3">
                One connected service experience. Built around your business.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Everything is branded with your company name, color palette, and logo. Your customers only ever see your brand.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-[#edf3e3] text-brand-900 font-extrabold text-xs sm:text-sm transition-colors shadow-md cursor-pointer"
              >
                See JIT Helpdesk in Action →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
