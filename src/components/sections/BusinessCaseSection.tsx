'use client';

import React from 'react';
import { Calculator, ArrowRight, AlertCircle, TrendingUp } from 'lucide-react';

interface BusinessCaseSectionProps {
  onOpenBooking: () => void;
}

export const BusinessCaseSection: React.FC<BusinessCaseSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 px-4 bg-white relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-brand-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 text-brand-700" />
            <span>Illustrative Business Case</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            What Would It Take to Cover the Cost?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Consider the mathematics of a professional client portal that makes service requests and quote approvals frictionless.
          </p>
        </div>

        {/* Two Comparison Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: First-Year Platform Cost */}
          <div className="bg-[#FAF5F7] rounded-3xl p-7 sm:p-8 border border-pink-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Annual Investment
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-1 mb-4">
                First-Year Platform Cost
              </h3>
              
              <div className="text-4xl sm:text-5xl font-black text-slate-900 font-display mb-2">
                $2,800
              </div>
              <p className="text-xs font-semibold text-slate-600">
                $400 setup + (12 × $200/month)
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-pink-200/60 text-xs text-slate-500">
              Includes branded mobile apps, customer web portal, unlimited support agents, hosting & ongoing maintenance.
            </div>
          </div>

          {/* Card 2: Illustrative Additional Annual Contribution */}
          <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-[#52001A] rounded-3xl p-7 sm:p-8 text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-200">
                  Illustrative Potential
                </span>
                <span className="p-1.5 rounded-full bg-white/10 text-emerald-300">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-white mt-1 mb-4">
                Illustrative Annual Contribution
              </h3>
              
              <div className="text-4xl sm:text-5xl font-black text-white font-display mb-2">
                $3,000
              </div>
              <p className="text-xs font-semibold text-pink-100">
                12 extra completed jobs × $250 contribution each
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/15 text-xs text-pink-100/90">
              Just 1 additional retained or approved job per month generates more than enough contribution to cover the entire year.
            </div>
          </div>

        </div>

        {/* Supporting Copy Box */}
        <div className="bg-[#FAF8F9] rounded-2xl p-6 border border-slate-200/80 mb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            If your business gained just <strong>one additional completed service job per month</strong>, with $250 contribution profit per job, that would represent <strong>$3,000 in additional annual contribution</strong>—enough to cover the $2,800 first-year platform fee.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shrink-0 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Evaluate Your Fit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="flex items-start gap-2.5 p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Mandatory Disclaimer:</strong> Illustrative example only. JIT Helpdesk does not guarantee additional customers, jobs, revenue, or profit. Actual results depend on business performance, operating costs, market demand, and implementation.
          </span>
        </div>

      </div>
    </section>
  );
};
