'use client';

import React from 'react';
import { ShieldCheck, ArrowRight, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

interface BusinessCaseSectionProps {
  onOpenBooking: () => void;
}

export const BusinessCaseSection: React.FC<BusinessCaseSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 px-4 bg-white relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#274c3b]" />
            <span>The Business Case</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            Sometimes, Keeping Just One Client Changes the Math.
          </h2>
          <p className="text-base text-[#61705f] leading-relaxed">
            A customer relationship can be worth much more than a single service call. If a client contributes $3,000 to your business over a year, keeping that client for another year could represent $3,000 in contribution.
          </p>
        </div>

        {/* Two Comparison Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: First-Year Platform Cost */}
          <div className="bg-[#edf3e3] rounded-3xl p-7 sm:p-8 border border-[#dce3d4] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#61705f]">
                Annual Platform Investment
              </span>
              <h3 className="text-lg font-extrabold text-[#182c26] mt-1 mb-4">
                First-Year Platform Fee
              </h3>
              
              <div className="text-4xl sm:text-5xl font-black text-[#182c26] font-display mb-2">
                $2,800
              </div>
              <p className="text-xs font-semibold text-[#274c3b]">
                $400 setup + 12 monthly payments of $200
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#dce3d4] text-xs text-[#61705f]">
              Includes iOS and Android app, web portal on your custom domain, owner admin dashboard, push notifications, loyalty rewards, and unlimited technicians.
            </div>
          </div>

          {/* Card 2: Illustrative Retained Client Contribution */}
          <div className="bg-gradient-to-br from-[#11201b] via-[#182c26] to-[#274c3b] rounded-3xl p-7 sm:p-8 text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d2f56d]">
                  Illustrative Scenario
                </span>
                <span className="p-1.5 rounded-full bg-white/10 text-[#d2f56d]">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-white mt-1 mb-4">
                Illustrative Retained-Client Contribution
              </h3>
              
              <div className="text-4xl sm:text-5xl font-black text-[#d2f56d] font-display mb-2">
                $3,000
              </div>
              <p className="text-xs font-semibold text-slate-200">
                1 retained client contributing $3,000 annually
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/15 text-xs text-slate-300">
              In this scenario, the contribution from one retained client would cover the first-year platform fee.
            </div>
          </div>

        </div>

        {/* The Point Copy Box */}
        <div className="bg-[#f6f6ef] rounded-2xl p-6 border border-[#dce3d4] mb-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-[#274c3b] mb-1">
              The Point
            </div>
            <p className="text-xs sm:text-sm text-[#182c26] leading-relaxed font-medium">
              You don&apos;t need to think about your branded app only as another software expense. Think about the customer relationships it could help you support.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-full bg-[#182c26] hover:bg-[#274c3b] text-white font-bold text-xs shrink-0 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#d2f56d]" />
          </button>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="flex items-start gap-2.5 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Mandatory Disclaimer:</strong> This is an illustrative financial comparison, not a claim that JIT Helpdesk prevents churn or generates additional profit. Actual results depend on business operating costs, service volume, pricing, and client retention factors.
          </span>
        </div>

      </div>
    </section>
  );
};
