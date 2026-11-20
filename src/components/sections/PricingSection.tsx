'use client';

import React from 'react';
import { Check, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  onOpenBooking: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking }) => {
  const features = [
    'Branded customer mobile app (iOS & Android)',
    'Branded customer web portal (custom domain)',
    'Owner admin dashboard with queue management',
    'Customer requests and live service tracking',
    'Quotes, revisions, approvals, and payment workflows',
    'Client appointment scheduling and device records',
    'Customer loyalty credits and referral rewards',
    'Unlimited support agents (no per-seat penalties)',
    'Cloud hosting, maintenance, bug fixes, and updates',
  ];

  return (
    <section className="py-20 px-4 bg-[#edf3e3] relative" id="pricing">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white border border-[#dce3d4] text-brand-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            Simple, Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            A Professional Branded Platform Without Building From Scratch.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Your IT Business. Your Own Mobile App & Web Portal. Complete ownership of your client support experience.
          </p>
        </div>

        {/* Featured Pricing Card */}
        <div className="bg-white rounded-3xl border-2 border-brand-700/80 shadow-2xl p-7 sm:p-10 relative overflow-hidden">
          
          {/* Top Ribbon */}
          <div className="absolute top-0 right-0 bg-brand-700 text-white text-[11px] font-black uppercase tracking-wider py-1 px-8 rounded-bl-2xl shadow-xs">
            Commercial MSP Offer
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                All-In-One Solution
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-display">
                JIT Helpdesk MSP Package
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Both branded mobile app & customer web portal included.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-brand-900 font-display">
                  $400
                </span>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold">one-time setup</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  + $200
                </span>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold">/ month</span>
              </div>
            </div>
          </div>

          {/* Package Inclusions Checklist */}
          <div className="py-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-5">
              Your confirmed package includes:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-50 text-brand-700 border border-brand-200/60 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              <span>No long-term lock-in. Implementation scope confirmed during onboarding.</span>
            </div>

            <button
              onClick={onOpenBooking}
              className="cta-glow-btn w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-md hover:shadow-lg transition-all"
            >
              <span>See What Your Business Could Look Like — Book a Free Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Verification Disclaimer */}
          <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50 -mx-7 sm:-mx-10 -mb-7 sm:-mb-10 p-5 text-[11px] text-slate-500 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
            <span>
              Branding assets, application store publishing arrangements, and third-party payment integration credentials are confirmed during onboarding walkthrough.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
