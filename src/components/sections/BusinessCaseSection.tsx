'use client';

import React from 'react';
import { ShieldCheck, ArrowRight, TrendingUp, Sparkles, DollarSign, CheckCircle2 } from 'lucide-react';

interface BusinessCaseSectionProps {
  onOpenBooking: () => void;
}

export const BusinessCaseSection: React.FC<BusinessCaseSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden" id="business-case">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#d2f56d]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#274c3b]" />
            <span>The Business Case</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            Sometimes, Keeping Just One Client Changes the Math.
          </h2>
          <p className="text-base text-[#61705f] leading-relaxed">
            A customer relationship can be worth much more than a single service call. If a client contributes $3,000 to your business over a year, keeping that client for another year covers the entire platform cost.
          </p>
        </div>

        {/* Two Comparison Cards Side-by-Side (Gradient Card Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
          
          {/* Card 1: First-Year Platform Cost */}
          <div className="group bg-white rounded-3xl p-7 sm:p-9 border border-[#dce3d4] shadow-xs hover:border-[#274c3b] hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Amplified Ambient Top-Right Corner Glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-[#d2f56d]/35 via-[#274c3b]/20 to-transparent rounded-full blur-2xl opacity-80 group-hover:opacity-100 group-hover:scale-130 transition-all duration-500 pointer-events-none" />

            <div>
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d2f56d] via-[#274c3b] to-[#182c26] p-0.5 border-2 border-white/70 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-[14px] bg-[#182c26]/90 backdrop-blur-xs flex items-center justify-center text-[#d2f56d]">
                    <DollarSign className="w-6 h-6 stroke-[2.2]" />
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#edf3e3] text-[#274c3b] border border-[#dce3d4]">
                  Flat Predictable Cost
                </span>
              </div>

              {/* Subtitle / Kicker */}
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#61705f] mb-1">
                ANNUAL PLATFORM INVESTMENT
              </div>

              {/* Main Title */}
              <h3 className="text-xl font-black text-[#182c26] tracking-tight mb-2 font-display">
                First-Year Platform Fee
              </h3>

              {/* Big Figure */}
              <div className="text-4xl sm:text-5xl font-black text-[#182c26] font-display mb-1.5">
                $2,800
              </div>
              <p className="text-xs font-bold text-[#274c3b] mb-4">
                $400 setup + 12 monthly payments of $200 flat
              </p>

              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-6">
                Includes iOS and Android app, web portal on your custom domain, owner admin dashboard, push notifications, loyalty rewards, and unlimited technicians.
              </p>
            </div>

            {/* Embedded Live Dark Pine Snippet */}
            <div className="mt-auto pt-3 border-t border-slate-100 relative z-10">
              <div className="bg-[#11201b] rounded-xl p-3 border border-[#274c3b] flex items-center justify-between text-[11px] text-white shadow-inner">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#edf3e3]">
                  All Apps &amp; Upgrades
                </span>
                <span className="text-[#d2f56d] font-bold text-[10px] sm:text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2f56d] live-indicator" />
                  Zero Hidden Fees
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Illustrative Retained Client Contribution */}
          <div className="group bg-gradient-to-br from-[#11201b] via-[#182c26] to-[#274c3b] rounded-3xl p-7 sm:p-9 text-white shadow-xl border border-[#d2f56d]/30 hover:border-[#d2f56d]/70 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Amplified Ambient Top-Right Corner Glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-[#d2f56d]/40 via-[#274c3b]/30 to-transparent rounded-full blur-2xl opacity-90 group-hover:opacity-100 group-hover:scale-130 transition-all duration-500 pointer-events-none" />

            <div>
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d2f56d] via-[#274c3b] to-[#182c26] p-0.5 border-2 border-white/70 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-[14px] bg-[#182c26]/90 backdrop-blur-xs flex items-center justify-center text-[#d2f56d]">
                    <TrendingUp className="w-6 h-6 stroke-[2.2]" />
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#d2f56d]/20 text-[#d2f56d] border border-[#d2f56d]/40">
                  ROI Math
                </span>
              </div>

              {/* Subtitle / Kicker */}
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#dce3d4] mb-1">
                ILLUSTRATIVE SCENARIO
              </div>

              {/* Main Title */}
              <h3 className="text-xl font-black text-white tracking-tight mb-2 font-display">
                Retained-Client Contribution
              </h3>

              {/* Big Figure */}
              <div className="text-4xl sm:text-5xl font-black text-[#d2f56d] font-display mb-1.5">
                $3,000+
              </div>
              <p className="text-xs font-bold text-[#dce3d4] mb-4">
                1 retained client contributing $3,000 annually
              </p>

              <p className="text-xs sm:text-sm text-[#edf3e3]/90 leading-relaxed mb-6">
                If keeping just one client who would have switched to a competitor preserves their recurring billing, your branded app has already covered its entire first-year cost.
              </p>
            </div>

            {/* Embedded Live Dark Pine Snippet */}
            <div className="mt-auto pt-3 border-t border-white/10 relative z-10">
              <div className="bg-[#0e1b17] rounded-xl p-3 border border-[#d2f56d]/30 flex items-center justify-between text-[11px] text-white shadow-inner">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#edf3e3]">
                  1 Client Saved / Year
                </span>
                <span className="text-[#d2f56d] font-bold text-[10px] sm:text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2f56d] live-indicator" />
                  107% First-Year ROI
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button
            onClick={onOpenBooking}
            className="px-7 sm:px-9 py-3 sm:py-3.5 rounded-full text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-2.5 cursor-pointer bg-gradient-to-r from-[#182c26] via-[#274c3b] to-[#11201b] hover:from-[#203e30] hover:via-[#2f5a46] hover:to-[#182c26] border border-[#d2f56d] shadow-md hover:shadow-lg transition-all group"
          >
            <span>See Your Retention Potential — Book a Demo</span>
            <ArrowRight className="w-4 h-4 text-[#d2f56d] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
