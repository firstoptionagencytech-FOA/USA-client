'use client';

import React from 'react';
import { Layers, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, XCircle } from 'lucide-react';

interface PricePerceptionSectionProps {
  onOpenBooking: () => void;
}

export const PricePerceptionSection: React.FC<PricePerceptionSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden" id="price-perception">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#d2f56d]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#274c3b]" />
            <span>SaaS Price Perception</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-4 leading-tight">
            Your IT Business Deserves Its Own App. Not a Custom-App-Sized Budget.
          </h2>

          <p className="text-base sm:text-lg text-[#61705f] leading-relaxed">
            You don&apos;t have to start a software development project from zero just to give customers an app with your name on it. JIT Helpdesk starts with an existing, customizable platform designed specifically for IT service businesses.
          </p>
        </div>

        {/* Two Comparison Columns (Signature Gradient Card Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch mb-12">
          
          {/* Column A: Traditional Custom-Build */}
          <div className="group bg-white rounded-3xl p-7 sm:p-9 border border-[#dce3d4] shadow-xs hover:border-[#274c3b] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Top Subtle Ambient Corner Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#274c3b]/15 to-transparent rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#edf3e3] text-[#274c3b] border border-[#dce3d4]">
                  Traditional Agency Path
                </span>
                <span className="text-xs font-bold text-[#61705f]">
                  Custom Code From Scratch
                </span>
              </div>

              <div className="text-[11px] font-bold uppercase tracking-wider text-[#61705f] mb-1">
                BESPOKE SOFTWARE AGENCY
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#182c26] mb-2 font-display">
                Building From Scratch
              </h3>

              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-6">
                Commissioning a bespoke software agency to build iOS, Android, and web systems requires dedicated technical architecture, custom backend engineering, and indefinite developer retainers.
              </p>

              {/* Steps List */}
              <div className="space-y-3.5 mb-6">
                {[
                  { step: '1. Product Planning', desc: 'Months spent scoping specifications and technical architectures.' },
                  { step: '2. Interface Design', desc: 'Designing custom UI/UX wireframes, prototypes, and asset kits.' },
                  { step: '3. Feature Development', desc: 'Coding customer authentication, ticket engines, and APIs.' },
                  { step: '4. System Integrations', desc: 'Writing bespoke connectors for payment gateways and calendars.' },
                  { step: '5. Testing & Store Reviews', desc: 'Navigating Apple and Google App Store review complexities.' },
                  { step: '6. Ongoing Maintenance', desc: 'Funding dedicated DevOps to fix bugs, OS updates, and server downtime.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#edf3e3] text-[#274c3b] flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-[#182c26]">{item.step}: </span>
                      <span className="text-[#61705f]">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Embedded Live Dark Pine Snippet */}
            <div className="mt-auto pt-3 border-t border-slate-100 relative z-10">
              <div className="bg-[#11201b] rounded-xl p-3 border border-[#274c3b] flex items-center justify-between text-[11px] text-white shadow-inner">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#edf3e3]">
                  Custom Agency Timeline
                </span>
                <span className="text-rose-400 font-bold text-[10px] sm:text-[11px]">
                  $25,000+ &amp; 6+ Months
                </span>
              </div>
            </div>
          </div>

          {/* Column B: JIT Helpdesk Platform (High-End Pine & Cyber Lime Gradient Card) */}
          <div className="group bg-gradient-to-br from-[#11201b] via-[#182c26] to-[#274c3b] rounded-3xl p-7 sm:p-9 text-white shadow-xl border border-[#d2f56d]/30 hover:border-[#d2f56d]/70 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Top Subtle Ambient Corner Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#d2f56d]/30 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#d2f56d] text-[#182c26] font-bold shadow-xs">
                  Purpose-Built Solution
                </span>
                <span className="text-xs font-bold text-[#d2f56d] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Ready in 48 Hours
                </span>
              </div>

              <div className="text-[11px] font-bold uppercase tracking-wider text-[#dce3d4] mb-1">
                JIT HELPDESK PLATFORM
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 font-display">
                Already Built. Branded for You.
              </h3>

              <p className="text-xs sm:text-sm text-[#edf3e3]/90 leading-relaxed mb-6">
                Skip the engineering risks. JIT Helpdesk delivers a proven customer experience engine already architected for IT support, customized with your branding, domain, and colors.
              </p>

              {/* Benefits Checklist */}
              <div className="space-y-3.5 mb-6">
                {[
                  { title: 'Proven Foundation', desc: 'No architecture phases. Jump directly into a battle-tested support system.' },
                  { title: 'Dedicated Branding', desc: 'Your business name, logo, domain, and brand identity across all platforms.' },
                  { title: 'Connected Workflows', desc: 'Requests, quotes, digital approvals, payments, and scheduling out of the box.' },
                  { title: 'No Development Team Needed', desc: 'Platform infrastructure, cloud security, and updates are fully maintained.' },
                  { title: 'Faster Time to Launch', desc: 'Be live with your branded customer portal in days, not three quarters.' },
                  { title: 'Transparent Flat Cost', desc: '$400 setup + flat $200 per month. Zero per-technician upcharges.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#d2f56d] text-[#182c26] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="font-bold text-[#d2f56d]">{item.title}: </span>
                      <span className="text-[#edf3e3]/90">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Embedded Live Dark Pine Snippet */}
            <div className="mt-auto pt-3 border-t border-white/10 relative z-10">
              <div className="bg-[#0e1b17] rounded-xl p-3 border border-[#d2f56d]/30 flex items-center justify-between text-[11px] text-white shadow-inner">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#edf3e3]">
                  Fixed Predictable SaaS Pricing
                </span>
                <span className="text-[#d2f56d] font-bold text-[10px] sm:text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2f56d] live-indicator" />
                  $400 setup · $200/mo flat
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
            <span>See the JIT Helpdesk Platform Live — Book a Demo</span>
            <ArrowRight className="w-4 h-4 text-[#d2f56d] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
