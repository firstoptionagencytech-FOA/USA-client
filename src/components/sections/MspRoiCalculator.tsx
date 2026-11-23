'use client';

import React, { useState } from 'react';
import { Calculator, AlertTriangle, ShieldCheck, ArrowRight, Sparkles, DollarSign, Users, Percent, CheckCircle2, AlertCircle } from 'lucide-react';

interface MspRoiCalculatorProps {
  onOpenBooking: () => void;
}

export const MspRoiCalculator: React.FC<MspRoiCalculatorProps> = ({ onOpenBooking }) => {
  // Step 8 QA Test Default Values:
  // 4 lost clients, $10,000 annual revenue per client, 30% contribution margin
  const [clientsLost, setClientsLost] = useState<number>(4);
  const [avgRevenue, setAvgRevenue] = useState<number>(10000);
  const [contributionMargin, setContributionMargin] = useState<number>(30);

  // Calculations per Master Document Step 8:
  // 1. Lost annual revenue = Clients lost × average annual revenue per client
  const lostRevenue = clientsLost * avgRevenue;
  // 2. Potential annual contribution from one retained client = Average annual revenue per client × contribution margin / 100
  const retainedContribution = Math.round(avgRevenue * (contributionMargin / 100));
  // 3. First-year platform fee = $2,800 ($400 setup + 12 * $200)
  const platformFee = 2800;

  // Conditional break-even flag
  const isBreakEven = retainedContribution >= platformFee;

  return (
    <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-white via-[#f6f6ef] to-white relative overflow-hidden" id="retention-calculator">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d2f56d]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#182c26] text-[#d2f56d] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-[#d2f56d]/30">
            <Calculator className="w-3.5 h-3.5 text-[#d2f56d]" />
            <span>Interactive Retention Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#182c26] tracking-tight font-display mb-3">
            How Much Is Losing Customers Costing Your IT Business?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#61705f] leading-relaxed">
            Enter your own numbers to estimate the value of customer relationships and see how the economics of customer retention compare with the cost of a branded customer experience.
          </p>
        </div>

        {/* Interactive Retention Calculator Card */}
        <div className="bg-[#182c26] rounded-3xl p-6 sm:p-10 border border-[#d2f56d]/30 shadow-2xl text-white relative overflow-hidden">
          
          {/* Top Decorative Cyber Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d2f56d] to-transparent opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: 3 Interactive Slider Controls */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Input 1: Clients Lost Last Year */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dce3d4] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#d2f56d]" />
                    <span>Clients Lost Last Year:</span>
                  </label>
                  <span className="text-xl sm:text-2xl font-black text-[#d2f56d] font-display">
                    {clientsLost} <span className="text-xs font-normal text-[#dce3d4]">{clientsLost === 1 ? 'client' : 'clients'}</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={clientsLost}
                  onChange={(e) => setClientsLost(Number(e.target.value))}
                  className="w-full h-2 bg-[#0b1512] rounded-lg appearance-none cursor-pointer accent-[#d2f56d] border border-[#274c3b]"
                />

                <div className="flex justify-between text-[10px] font-bold text-[#61705f] mt-1">
                  <span>1 client</span>
                  <span>4 clients (Avg)</span>
                  <span>12 clients</span>
                </div>
              </div>

              {/* Input 2: Average Annual Revenue per Client */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dce3d4] flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-[#d2f56d]" />
                    <span>Avg Annual Revenue per Client:</span>
                  </label>
                  <span className="text-xl sm:text-2xl font-black text-[#d2f56d] font-display">
                    ${avgRevenue.toLocaleString()} <span className="text-xs font-normal text-[#dce3d4]">/ yr</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="2000"
                  max="25000"
                  step="1000"
                  value={avgRevenue}
                  onChange={(e) => setAvgRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-[#0b1512] rounded-lg appearance-none cursor-pointer accent-[#d2f56d] border border-[#274c3b]"
                />

                <div className="flex justify-between text-[10px] font-bold text-[#61705f] mt-1">
                  <span>$2,000 / yr</span>
                  <span>$10,000 / yr</span>
                  <span>$25,000 / yr</span>
                </div>
              </div>

              {/* Input 3: Estimated Contribution Margin */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dce3d4] flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-[#d2f56d]" />
                    <span>Estimated Contribution Margin:</span>
                  </label>
                  <span className="text-xl sm:text-2xl font-black text-[#d2f56d] font-display">
                    {contributionMargin}%
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="70"
                  step="5"
                  value={contributionMargin}
                  onChange={(e) => setContributionMargin(Number(e.target.value))}
                  className="w-full h-2 bg-[#0b1512] rounded-lg appearance-none cursor-pointer accent-[#d2f56d] border border-[#274c3b]"
                />

                <div className="flex justify-between text-[10px] font-bold text-[#61705f] mt-1">
                  <span>10% Margin</span>
                  <span>30% Margin (Typical)</span>
                  <span>70% Margin</span>
                </div>
              </div>

              {/* Input Formula Summary Box */}
              <div className="p-3.5 rounded-2xl bg-[#11201b] border border-[#274c3b] space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#dce3d4]">
                  <span>Formula:</span>
                  <span className="font-bold text-white">{clientsLost} clients × ${avgRevenue.toLocaleString()} revenue × {contributionMargin}%</span>
                </div>
                <div className="flex items-center justify-between text-[#dce3d4]">
                  <span>Fixed JIT Platform Fee:</span>
                  <span className="font-bold text-[#d2f56d]">$2,800 ($400 setup + 12 × $200/mo)</span>
                </div>
              </div>

            </div>

            {/* Right Column: 3 Output Cards + Conditional Break-Even Message */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-3.5">
                {/* Output 1: Annual Revenue Associated with Lost Clients */}
                <div className="bg-[#11201b] rounded-2xl p-4 sm:p-5 border border-red-900/40 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-red-400 mb-1">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">Lost Client Revenue</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-red-400 font-display my-1">
                    ${lostRevenue.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-[#8e9f90] leading-tight">
                    Annual revenue lost from {clientsLost} churned clients.
                  </div>
                </div>

                {/* Output 2: First-Year Platform Fee */}
                <div className="bg-[#11201b] rounded-2xl p-4 sm:p-5 border border-[#274c3b] flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[#d2f56d] mb-1">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">First-Year Fee</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-display my-1">
                    ${platformFee.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-[#61705f] leading-tight">
                    $400 setup + $200/mo flat. Unlimited users.
                  </div>
                </div>
              </div>

              {/* Output 3: One Retained Client Contribution & Conditional Break-Even */}
              <div className="bg-gradient-to-r from-[#274c3b] to-[#182c26] rounded-2xl p-4 sm:p-5 border border-[#d2f56d]/50 shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#d2f56d] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Estimated Contribution From 1 Retained Client:</span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-white font-display">
                    ${retainedContribution.toLocaleString()}
                  </span>
                </div>

                {/* Conditional Break-Even Messaging (Only when contribution >= $2,800) */}
                {isBreakEven ? (
                  <div className="p-3 rounded-xl bg-[#11201b]/90 border border-[#d2f56d]/40 text-xs text-[#d2f56d] flex items-start gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#d2f56d]" />
                    <span>
                      <strong>Break-Even Reached:</strong> Retaining just one client contributes ${retainedContribution.toLocaleString()}—more than enough to cover the entire ${platformFee.toLocaleString()} first-year platform fee.
                    </span>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-[#11201b]/70 border border-slate-700 text-xs text-slate-300 flex items-start gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                    <span>
                      At {contributionMargin}% margin, keeping {Math.ceil(platformFee / Math.max(1, retainedContribution))} clients covers the complete annual platform fee.
                    </span>
                  </div>
                )}

                <button
                  onClick={onOpenBooking}
                  className="w-full px-5 py-3 rounded-full bg-[#d2f56d] hover:bg-[#bce457] text-[#182c26] font-black text-xs inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.02]"
                >
                  <span>Book a Demo. See the App With Your Logo on It.</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Clear Disclaimer per Step 8 Specs */}
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#61705f] text-center max-w-2xl mx-auto">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#61705f]" />
          <span>
            Illustrative calculator only. JIT Helpdesk does not guarantee retention, additional revenue, or profit.
          </span>
        </div>

      </div>
    </section>
  );
};
