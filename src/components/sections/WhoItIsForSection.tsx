'use client';

import React from 'react';
import { CheckCircle2, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface WhoItIsForSectionProps {
  onOpenBooking: () => void;
}

export const WhoItIsForSection: React.FC<WhoItIsForSectionProps> = ({ onOpenBooking }) => {
  const criteria = [
    'Run an independent IT support or managed services company (MSP).',
    'Operate a computer repair, hardware shop, or onsite IT service business.',
    'Manage paying customer requests, quote approvals, and service invoices.',
    'Want a high-end customer experience under your own business identity.',
    'Are ready to eliminate unorganized communication channels and missed approvals.',
  ];

  const walkthroughItems = [
    {
      title: 'The Customer Experience',
      desc: 'How your clients submit requests, review digital quotes, and follow service progress directly from their phone or web browser.',
    },
    {
      title: 'The Owner Experience',
      desc: 'How your team handles queues, technician assignment, pricing tiers, quote revisions, and invoice tracking from the admin console.',
    },
    {
      title: 'Your Branding Options',
      desc: 'How the mobile application and web portal are customized to reflect your corporate colors, logo, and domain.',
    },
    {
      title: 'Your Implementation Roadmap',
      desc: 'Exactly what needs to be configured (merchant keys, DNS, app publishing) to launch your platform smoothly.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#F8FAFC] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Fit Analysis Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white border border-blue-200 text-brand-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            Audience Qualification
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Is JIT Helpdesk Right for Your Business?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            JIT Helpdesk is purpose-built for commercial businesses that deliver IT support services to paying clients.
          </p>
        </div>

        {/* Strong Fit Checklist Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-extrabold text-slate-900 mb-6 font-display">
            A Strong Strategic Fit If You:
          </h3>
          
          <div className="space-y-4">
            {criteria.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* See the Experience Before You Decide Block */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Personalized Walkthrough
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              See the Experience Before You Decide.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              During your 30-minute personalized demo, we walk you step-by-step through:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {walkthroughItems.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-brand-700 text-white text-[11px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              <span>No pushy sales tactics. Just a practical walkthrough of how the platform fits your workflows.</span>
            </div>

            <button
              onClick={onOpenBooking}
              className="cta-glow-btn px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shrink-0 shadow-md hover:shadow-lg transition-all"
            >
              <span>Book Your Free Personalized Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
