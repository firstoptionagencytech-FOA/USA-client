'use client';

import React from 'react';
import { Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface WhoItIsForSectionProps {
  onOpenBooking: () => void;
}

export const WhoItIsForSection: React.FC<WhoItIsForSectionProps> = ({ onOpenBooking }) => {
  const criteria = [
    'Run an independent IT support or managed services company (MSP).',
    'Operate a computer repair, hardware shop, or onsite IT service business.',
    'Manage paying customer requests, quote approvals, and service invoices.',
    'Want a high-end customer experience under your own business identity.',
    'Are ready to eliminate unorganized communication channels and missed approvals.',
  ];

  const walkthroughItems = [
    {
      title: 'The Customer Experience',
      desc: 'How your clients submit requests, review digital quotes, and follow service progress directly from their phone or web browser.',
    },
    {
      title: 'The Owner Experience',
      desc: 'How your team handles queues, technician assignment, pricing tiers, quote revisions, and invoice tracking from the admin console.',
    },
    {
      title: 'Your Branding Options',
      desc: 'How the mobile application and web portal are customized to reflect your corporate colors, logo, and domain.',
    },
    {
      title: 'Your Implementation Roadmap',
      desc: 'Exactly what needs to be configured (merchant keys, DNS, app publishing) to launch your platform smoothly in 48 hours.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#f6f6ef] relative border-t border-[#dce3d4]" id="qualification">
      <div className="max-w-6xl mx-auto">
        
        {/* Fit Analysis Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#274c3b]" />
            <span>Audience Qualification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            Is JIT Helpdesk Right for Your Business?
          </h2>
          <p className="text-base sm:text-lg text-[#61705f] leading-relaxed">
            JIT Helpdesk is purpose-built for commercial businesses that deliver IT support services to paying clients.
          </p>
        </div>

        {/* Strong Fit Checklist Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#dce3d4] shadow-md max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-extrabold text-[#182c26] mb-6 font-display flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#274c3b]" />
            <span>A Strong Strategic Fit If You:</span>
          </h3>
          
          <div className="space-y-4">
            {criteria.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#182c26] text-[#d2f56d] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-[#182c26] leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* See the Experience Before You Decide Block */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#dce3d4] shadow-xl max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#274c3b]">
              Personalized Walkthrough
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#182c26] font-display mt-1">
              See the Experience Before You Decide.
            </h3>
            <p className="text-xs sm:text-sm text-[#61705f] mt-2">
              During your 30-minute personalized demo, we walk you step-by-step through:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {walkthroughItems.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#f6f6ef] border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#182c26] text-[#d2f56d] text-xs font-bold flex items-center justify-center shadow-xs">
                    {idx + 1}
                  </div>
                  <h4 className="text-base font-extrabold text-[#182c26]">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed pl-8">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-6 border-t border-[#dce3d4] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#61705f] text-center sm:text-left flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#274c3b] shrink-0" />
              <span>No pushy sales tactics. Just a practical walkthrough of how the platform fits your workflows.</span>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-6 sm:px-8 py-3 rounded-full text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shrink-0 bg-gradient-to-r from-[#182c26] via-[#274c3b] to-[#11201b] hover:from-[#203e30] hover:via-[#2f5a46] hover:to-[#182c26] border border-[#d2f56d] shadow-md hover:shadow-lg transition-all group"
            >
              <span>Book Your Free Personalized Demo</span>
              <ArrowRight className="w-4 h-4 text-[#d2f56d] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
