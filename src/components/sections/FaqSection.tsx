'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is this really my own branded app?',
      a: 'JIT Helpdesk provides a customizable customer app and web portal using your business identity. The service agreement will specify branding rights, app distribution, hosting, and ownership terms.',
    },
    {
      q: 'Do I need to build software from scratch?',
      a: 'No. The proposed solution starts with an existing configurable platform. Your branding, workflows, integrations, and launch requirements are agreed during implementation.',
    },
    {
      q: 'Does the package include iOS, Android, and web?',
      a: 'The proposed offer includes these experiences, subject to confirmation of supported platforms, publishing arrangements, and final deliverables.',
    },
    {
      q: 'How do loyalty points and referrals work?',
      a: 'The platform supports configurable earning rules, redemption limits, and referral workflows. Your team can discuss the exact rules during the demo.',
    },
    {
      q: 'Can I send push notifications to customers?',
      a: 'Notification capabilities depend on the configured mobile app and backend services. Customers must enable the necessary permissions, and supported notification types will be confirmed during implementation.',
    },
    {
      q: 'Does JIT Helpdesk work with Autotask or my current tools?',
      a: 'Integration options are assessed individually. Share your existing tools during the demo so compatibility, implementation scope, and any additional costs can be confirmed.',
    },
    {
      q: 'What does $200 per month cover?',
      a: 'The proposed monthly service covers hosting, maintenance, bug fixes, and product updates. Additional third-party or integration charges are clarified in the agreement.',
    },
    {
      q: 'Is there a long-term contract?',
      a: 'Contract duration, cancellation notice, and termination conditions will be confirmed in your written agreement.',
    },
    {
      q: 'How long does setup take?',
      a: 'The implementation timeline depends on branding, integrations, app publishing, and the agreed scope. You’ll receive a proposed timeline during onboarding.',
    },
    {
      q: 'Can I see my logo on the app before deciding?',
      a: 'The demo can explain the available branding options. A personalized logo preview is available only if supported by the agreed demo process.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative" id="faq">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#274c3b]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            Answers to Common Questions
          </h2>
          <p className="text-base text-[#61705f] leading-relaxed">
            Everything you need to know about branding, setup, device support, and ongoing maintenance.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#f6f6ef] rounded-2xl border border-[#dce3d4] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left gap-4 hover:bg-[#edf3e3]/50 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-extrabold text-[#182c26] tracking-tight">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white border border-[#dce3d4] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#edf3e3] text-[#274c3b]' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#61705f] leading-relaxed border-t border-[#dce3d4] bg-white">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
