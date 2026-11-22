'use client';

import React from 'react';
import { ShieldCheck, ArrowRight, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface BusinessCaseSectionProps {
  onOpenBooking: () => void;
}

export const BusinessCaseSection: React.FC<BusinessCaseSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 px-4 bg-white relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#274c3b]" />
            <span>The Retention Business Case</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            Keep Just One Client a Year Who Would Have Left — And the App Has Paid for Itself.
          </h2>
          <p className="text-base text-[#61705f] leading-relaxed">
            You don&apos;t need dozens of new customers to make the mathematics work. You only need to stop existing, high-value clients from slipping away to competitors.
          </p>
        </div>

        {/* Two Comparison Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: First-Year Platform Cost */}
          <div className="bg-[#edf3e3] rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#61705f]">
                Total Annual Investment
              </span>
              <h3 className="text-lg font-extrabold text-[#182c26] mt-1 mb-4">
                First-Year Platform Cost
              </h3>
              
              <div className="text-4xl sm:text-5xl font-black text-[#182c26] font-display mb-2">
                $2,800
              </div>
              <p className="text-xs font-semibold text-[#274c3b]">
                $400 setup + (12 × $200/month flat)
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#dce3d4] text-xs text-[#61705f]">
              Includes iOS and Android app, web portal on your domain, owner admin dashboard, push notifications, loyalty rewards, and unlimited technicians.
            </div>
          </div>

          {/* Card 2: Average Retained Client Value */}
          <div className="bg-gradient-to-br from-[#11201b] via-[#182c26] to-[#274c3b] rounded-3xl p-7 sm:p-8 text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d2f56d]">
                  Protected Revenue
                </span>
                <span className="p-1.5 rounded-full bg-white/10 text-[#d2f56d]">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-white mt-1 mb-4">
                Average Value of 1 Retained Client
              </h3>
              
              <div className="text-4xl sm:text-5xl font-black text-white font-display mb-2">
                $6,000 – $12,000+
              </div>
              <p className="text-xs font-semibold text-[#d2f56d]">
                1 retained client @ $500 – $1,000/mo retainer
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/15 text-xs text-slate-300">
              Saving just one customer from competitor cold calls covers the entire yearly software cost by 2x to 4x.
            </div>
          </div>

        </div>

        {/* Supporting Copy Box */}
        <div className="bg-[#f6f6ef] rounded-2xl p-6 border border-[#dce3d4] mb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#182c26] leading-relaxed font-medium">
            When a client sees your app icon on their phone every day and earns loyalty rewards with every invoice, <strong>cheaper shops can&apos;t poach them with cold emails</strong>.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-full bg-[#182c26] hover:bg-[#274c3b] text-white font-bold text-xs shrink-0 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Book a demo. See the app with your logo on it.</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#d2f56d]" />
          </button>
        </div>

      </div>
    </section>
  );
};
