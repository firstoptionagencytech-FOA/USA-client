'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface MspRoiCalculatorProps {
  onOpenBooking: () => void;
}

export const MspRoiCalculator: React.FC<MspRoiCalculatorProps> = ({ onOpenBooking }) => {
  const [ticketCount, setTicketCount] = useState<number>(120);

  // Business calculations based on US MSP industry standards:
  // Average 12 minutes spent per ticket chasing updates, emailing, phone tag without portal
  const hoursSaved = Math.round((ticketCount * 12) / 60);
  // Average technician billable rate in US: $95/hr
  const laborValueRecovered = hoursSaved * 95;
  // Net ROI after JIT Helpdesk $200/mo fee
  const netMonthlyProfit = Math.max(0, laborValueRecovered - 200);

  return (
    <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-white via-[#f6f6ef] to-white relative overflow-hidden">
      
      {/* Background Cyber Lime Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d2f56d]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#182c26] text-[#d2f56d] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-[#d2f56d]/30">
            <Calculator className="w-3.5 h-3.5 text-[#d2f56d]" />
            <span>Interactive MSP Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#182c26] tracking-tight font-display mb-3">
            Calculate Your Monthly Time &amp; Cost Recovered.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#61705f] leading-relaxed">
            See how much technician time and billable revenue you recapture by eliminating status phone calls and unorganized email threads.
          </p>
        </div>

        {/* Interactive Calculator Card - High Aura Midnight Pine */}
        <div className="bg-[#182c26] rounded-3xl p-6 sm:p-10 border border-[#d2f56d]/30 shadow-2xl text-white relative overflow-hidden">
          
          {/* Top Decorative Cyber Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d2f56d] to-transparent opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Interactive Slider Control */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#dce3d4]">
                    Monthly Customer Tickets:
                  </label>
                  <span className="text-2xl sm:text-3xl font-black text-[#d2f56d] font-display">
                    {ticketCount} <span className="text-xs font-normal text-[#dce3d4]">tickets / mo</span>
                  </span>
                </div>

                {/* Styled Range Slider */}
                <input
                  type="range"
                  min="30"
                  max="500"
                  step="10"
                  value={ticketCount}
                  onChange={(e) => setTicketCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#0b1512] rounded-lg appearance-none cursor-pointer accent-[#d2f56d] border border-[#274c3b]"
                />

                <div className="flex justify-between text-[10px] font-bold text-[#61705f] mt-1.5">
                  <span>30 (Solo IT)</span>
                  <span>150 (Growing MSP)</span>
                  <span>500+ (Multi-Tech Team)</span>
                </div>
              </div>

              {/* Benchmark Breakdown Box */}
              <div className="p-4 rounded-2xl bg-[#11201b] border border-[#274c3b] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#dce3d4]">
                  <span>Status Call Avoidance:</span>
                  <span className="font-bold text-white">~12 mins saved / ticket</span>
                </div>
                <div className="flex items-center justify-between text-[#dce3d4]">
                  <span>Avg US Tech Hourly Rate:</span>
                  <span className="font-bold text-white">$95 / hour billable</span>
                </div>
                <div className="flex items-center justify-between text-[#dce3d4] pt-2 border-t border-[#274c3b]">
                  <span>Fixed JIT Platform Cost:</span>
                  <span className="font-bold text-[#d2f56d]">$200 / month flat</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Output Display */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              
              {/* Output 1: Technician Hours Saved */}
              <div className="bg-[#11201b] rounded-2xl p-4 sm:p-5 border border-[#274c3b] flex flex-col justify-between">
                <div className="flex items-center gap-2 text-[#d2f56d] mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Time Saved</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-display my-1">
                  {hoursSaved} <span className="text-xs text-[#dce3d4] font-medium">hrs / mo</span>
                </div>
                <div className="text-[11px] text-[#61705f] leading-tight">
                  Less phone tag, more billable client work.
                </div>
              </div>

              {/* Output 2: Billable Value Recovered */}
              <div className="bg-[#11201b] rounded-2xl p-4 sm:p-5 border border-[#274c3b] flex flex-col justify-between">
                <div className="flex items-center gap-2 text-[#d2f56d] mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Labor Recovered</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-display my-1">
                  ${laborValueRecovered.toLocaleString()}
                </div>
                <div className="text-[11px] text-[#61705f] leading-tight">
                  Recaptured billable technician capacity.
                </div>
              </div>

              {/* Output 3: Net Monthly Advantage (Full Width) */}
              <div className="col-span-2 bg-gradient-to-r from-[#274c3b] to-[#182c26] rounded-2xl p-4 sm:p-5 border border-[#d2f56d]/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#d2f56d] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Net Monthly Value Advantage:</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-display mt-0.5">
                    +${netMonthlyProfit.toLocaleString()} <span className="text-xs font-normal text-[#dce3d4]">/ month net value</span>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#d2f56d] hover:bg-[#bce457] text-[#182c26] font-black text-xs inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-105 shrink-0"
                >
                  <span>Book Free Demo Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
