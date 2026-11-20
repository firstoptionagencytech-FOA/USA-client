'use client';

import React from 'react';
import { Clock, CheckCheck, Repeat, Sparkles } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Spend Less Time on Repetitive Follow-Ups',
      subtitle: 'Save Administrative Time',
      description:
        'Give customers a dedicated place to review their requests and progress instead of relying entirely on phone calls, text messages, and unorganized inboxes.',
    },
    {
      icon: CheckCheck,
      title: 'Make It Easier to Approve Paid Work',
      subtitle: 'Accelerate Project Authorizations',
      description:
        'Keep quotes, revisions, approvals, and payment steps connected so customers know what happens next without hesitation.',
    },
    {
      icon: Repeat,
      title: 'Give Customers a Reason to Come Back',
      subtitle: 'Support Repeat Service & Referrals',
      description:
        'Use branded service experiences, loyalty credits, and referral features to create opportunities for repeat engagements and customer recommendations.',
    },
    {
      icon: Sparkles,
      title: 'Make a Stronger First Impression',
      subtitle: 'Stand Out From Competitors',
      description:
        'Show commercial clients that your IT business operates with mature, organized enterprise systems—with your own brand at the center.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-wider mb-4">
            Commercial Business Benefits
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Don&apos;t Just Manage Support. Build a Business Customers Want to Return To.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            JIT Helpdesk isn&apos;t only about organizing requests. It&apos;s about creating a better business experience that supports your bottom line. Same IT expertise. A more professional way to deliver it.
          </p>
        </div>

        {/* 4 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] rounded-3xl p-7 sm:p-9 border border-slate-200 hover:border-blue-400 transition-all duration-200 flex gap-5 items-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200 text-brand-700 shadow-xs flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-800">
                    {b.subtitle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 mb-2.5">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
