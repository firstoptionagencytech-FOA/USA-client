'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, AlertTriangle, ShieldCheck, ArrowRight, Sparkles, DollarSign, Users } from 'lucide-react';

interface MspRoiCalculatorProps {
  onOpenBooking: () => void;
}

export const MspRoiCalculator: React.FC<MspRoiCalculatorProps> = ({ onOpenBooking }) => {
  const [clientsLost, setClientsLost] = useState<number>(2);
  const [avgClientValue, setAvgClientValue] = useState<number>(7200); // $600/mo = $7,200/yr

  // Retention calculation:
  // How many clients did you lose last year? × average yearly value of a client = money lost.
  const totalMoneyLost = clientsLost * avgClientValue;
  const jitAnnualCost = 2800; // $400 setup + 12 * $200
  const netSavingsIfRetained = Math.max(0, totalMoneyLost - jitAnnualCost);

  return (
    <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-white via-[#f6f6ef] to-white relative overflow-hidden" id="retention-calculator">
      
      {/* Background Cyber Lime Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d2f56d]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#182c26] text-[#d2f56d] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-[#d2f56d]/30">
            <Calculator className="w-3.5 h-3.5 text-[#d2f56d]" />
            <span>Client Retention Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#182c26] tracking-tight font-display mb-3">
            How Much Did Lost Clients Cost You Last Year?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#61705f] leading-relaxed">
            When clients don&apos;t feel connected to your brand, cheaper shops and competitor ads pull them away. See how much annual revenue slips away when retention dips.
          </p>
        </div>

        {/* Interactive Retention Calculator Card */}
        <div className="bg-[#182c26] rounded-3xl p-6 sm:p-10 border border-[#d2f56d]/30 shadow-2xl text-white relative overflow-hidden">
          
          {/* Top Decorative Cyber Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d2f56d] to-transparent opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Slider 1: Clients Lost */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#dce3d4] flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#d2f56d]" />
                    <span>Clients Lost Last Year (or At Risk):</span>
                  </label>
                  <span className="text-2xl sm:text-3xl font-black text-[#d2f56d] font-display">
                    {clientsLost} <span className="text-xs font-normal text-[#dce3d4]">{clientsLost === 1 ? 'client' : 'clients'}</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={clientsLost}
                  onChange={(e) => setClientsLost(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#0b1512] rounded-lg appearance-none cursor-pointer accent-[#d2f56d] border border-[#274c3b]"
                />

                <div className="flex justify-between text-[10px] font-bold text-[#61705f] mt-1.5">
                  <span>1 client lost</span>
                  <span>5 clients</span>
                  <span>10 clients lost</span>
                </div>
              </div>

              {/* Slider 2: Average Yearly Value */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#dce3d4] flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#d2f56d]" />
                    <span>Average Yearly Value per Client:</span>
                  </label>
                  <span className="text-2xl sm:text-3xl font-black text-[#d2f56d] font-display">
                    ${avgClientValue.toLocaleString()} <span className="text-xs font-normal text-[#dce3d4]">/ year</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="2400"
                  max="24000"
                  step="600"
                  value={avgClientValue}
                  onChange={(e) => setAvgClientValue(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#0b1512] rounded-lg appearance-none cursor-pointer accent-[#d2f56d] border border-[#274c3b]"
                />

                <div className="flex justify-between text-[10px] font-bold text-[#61705f] mt-1.5">
                  <span>$2,400 ($200/mo)</span>
                  <span>$12,000 ($1k/mo)</span>
                  <span>$24,000 ($2k/mo)</span>
                </div>
              </div>

              {/* The Formula Breakdown Box */}
              <div className="p-4 rounded-2xl bg-[#11201b] border border-[#274c3b] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#dce3d4]">
                  <span>Formula:</span>
                  <span className="font-bold text-white">{clientsLost} clients × ${avgClientValue.toLocaleString()} yearly value</span>
                </div>
                <div className="flex items-center justify-between text-[#dce3d4]">
                  <span>Annual JIT App &amp; Portal Cost:</span>
                  <span className="font-bold text-[#d2f56d]">$2,800 flat / year ($200/mo)</span>
                </div>
                <div className="flex items-center justify-between text-[#dce3d4] pt-2 border-t border-[#274c3b]">
                  <span>The Math:</span>
                  <span className="font-bold text-[#d2f56d]">Keeping just 1 client pays for the whole year.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Output Display */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              
              {/* Output 1: Total Money Lost */}
              <div className="bg-[#11201b] rounded-2xl p-4 sm:p-5 border border-red-900/40 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-red-400 mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Revenue Lost</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-red-400 font-display my-1">
                  ${totalMoneyLost.toLocaleString()}
                </div>
                <div className="text-[11px] text-[#8e9f90] leading-tight">
                  Lost to competitors, silence, or price shopping.
                </div>
              </div>

              {/* Output 2: Fixed Investment */}
              <div className="bg-[#11201b] rounded-2xl p-4 sm:p-5 border border-[#274c3b] flex flex-col justify-between">
                <div className="flex items-center gap-2 text-[#d2f56d] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Platform Cost</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-display my-1">
                  $2,800
                </div>
                <div className="text-[11px] text-[#61705f] leading-tight">
                  $400 setup + $200/mo flat. Unlimited users.
                </div>
              </div>

              {/* Output 3: Retention Net Payoff (Full Width) */}
              <div className="col-span-2 bg-gradient-to-r from-[#274c3b] to-[#182c26] rounded-2xl p-4 sm:p-5 border border-[#d2f56d]/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#d2f56d] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Retaining Even 1 Client Yields:</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-display mt-0.5">
                    +${Math.max(0, avgClientValue - jitAnnualCost).toLocaleString()} <span className="text-xs font-normal text-[#dce3d4]">/ year net protection</span>
                  </div>
                  <p className="text-[10px] text-[#dce3d4] mt-1">
                    Keep just one client a year who would have left, and the app has paid for itself.
                  </p>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#d2f56d] hover:bg-[#bce457] text-[#182c26] font-black text-xs inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-105 shrink-0"
                >
                  <span>Book a demo. See the app with your logo on it.</span>
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
