'use client';

import React from 'react';
import { Layers, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, AlertCircle, XCircle } from 'lucide-react';

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

        {/* Two Comparison Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch mb-12">
          
          {/* Column A: Traditional Custom-Build */}
          <div className="bg-[#f6f6ef] rounded-3xl p-7 sm:p-9 border border-[#dce3d4] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-200/80 text-slate-700">
                  Traditional Path
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Custom Development
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#182c26] mb-3 font-display">
                Building From Scratch
              </h3>

              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-6">
                Commissioning a bespoke software agency to build iOS, Android, and web systems requires dedicated technical architecture, custom backend engineering, and indefinite developer retainers.
              </p>

              {/* Steps List */}
              <div className="space-y-3.5">
                {[
                  { step: '1. Product Planning', desc: 'Months spent scoping specifications and technical architectures.' },
                  { step: '2. Interface Design', desc: 'Designing custom UI/UX wireframes, prototypes, and asset kits.' },
                  { step: '3. Feature Development', desc: 'Coding customer authentication, ticket engines, and APIs.' },
                  { step: '4. System Integrations', desc: 'Writing bespoke connectors for payment gateways and calendars.' },
                  { step: '5. Testing & Store Reviews', desc: 'Navigating Apple and Google App Store review complexities.' },
                  { step: '6. Ongoing Maintenance', desc: 'Funding dedicated DevOps to fix bugs, OS updates, and server downtime.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-800">{item.step}:</strong>{' '}
                      <span className="text-[#61705f]">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#dce3d4] text-xs text-slate-500">
              *Requires significant upfront capital, technical management overhead, and separate hosting retainers.
            </div>
          </div>

          {/* Column B: Starting With JIT Helpdesk */}
          <div className="bg-gradient-to-br from-[#11201b] via-[#182c26] to-[#274c3b] rounded-3xl p-7 sm:p-9 text-white flex flex-col justify-between shadow-2xl border border-[#d2f56d]/30 relative overflow-hidden">
            {/* Top decorative glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#d2f56d]/15 blur-3xl pointer-events-none rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#d2f56d] text-[#182c26] shadow-sm">
                  The JIT Approach
                </span>
                <span className="text-xs font-bold text-[#d2f56d]">
                  Configured Platform
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 font-display">
                Starting With JIT Helpdesk
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Start with a battle-tested, configurable customer app, web portal, and owner dashboard. We apply your branding, connect supported services, and maintain the infrastructure.
              </p>

              {/* Features List */}
              <div className="space-y-3.5">
                {[
                  { step: '1. Existing Configurable Platform', desc: 'Proven architecture built specifically for IT service providers.' },
                  { step: '2. Your Business Branding', desc: 'Your company name, logo, brand colors, and custom web domain.' },
                  { step: '3. Customer Mobile & Web Experiences', desc: 'iOS and Android app downloads plus a responsive client web portal.' },
                  { step: '4. Built-in Supported Workflows', desc: 'Tickets, 1-click quote approvals, Stripe billing, and loyalty points.' },
                  { step: '5. Agreed Integrations & Setup', desc: 'Fast guided onboarding without writing a single line of backend code.' },
                  { step: '6. Ongoing Maintenance Plan', desc: 'Cloud hosting, App Store maintenance, security patches, and updates included.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#d2f56d] text-[#182c26] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <strong className="text-white">{item.step}:</strong>{' '}
                      <span className="text-slate-300">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Badge Anchor */}
            <div className="pt-6 mt-6 border-t border-white/15 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#d2f56d]">
                  Predictable SaaS-Style Fee
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-display mt-0.5">
                  $400 <span className="text-xs font-normal text-slate-300">setup</span> + $200 <span className="text-xs font-normal text-slate-300">/ mo</span>
                </div>
              </div>

              <span className="text-[11px] text-slate-300 font-medium">
                No need to build software from scratch.
              </span>
            </div>
          </div>

        </div>

        {/* Section Bottom Banner & CTA Anchor */}
        <div className="bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-[#dce3d4] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#274c3b]">
              Your Own Branded Experience. One Simple Software-Style Price.
            </span>
            <h4 className="text-lg sm:text-xl font-extrabold text-[#182c26] mt-1 font-display">
              $400 to set up. $200 per month. No custom software development risks.
            </h4>
            <p className="text-xs sm:text-sm text-[#61705f] mt-1">
              A branded customer experience without the multi-month delay or custom agency price tag.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="poster-glow-btn px-7 sm:px-9 py-3.5 rounded-full text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-transform hover:scale-105 shadow-md"
          >
            <span>See What Your Branded App Could Look Like</span>
            <ArrowRight className="w-4 h-4 text-[#d2f56d]" />
          </button>
        </div>

      </div>
    </section>
  );
};
