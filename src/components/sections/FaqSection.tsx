'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is this platform branded for my IT business?',
      a: 'Yes. JIT Helpdesk is offered as a customizable customer experience using your business identity. Branding, logos, colors, and implementation details are confirmed during setup.',
    },
    {
      q: 'Can my customers use both mobile and web?',
      a: 'Yes, under the mobile-and-web package discussed for this offer. Supported devices, app distribution, and publishing arrangements are confirmed in the project proposal.',
    },
    {
      q: 'How many agents can use it?',
      a: 'The offered package supports unlimited agents. You can add your technicians and administrative staff without per-seat penalty fees. Usage terms and technical limits should be confirmed in the agreement.',
    },
    {
      q: 'Can customers approve quotes and make payments?',
      a: 'The platform includes quote and payment workflows. Customers can review quotes and make payments directly in the portal. Live payment processing requires the relevant payment gateway integrations (such as Stripe) to be configured.',
    },
    {
      q: 'What’s included in the $200 monthly fee?',
      a: 'Hosting, maintenance, bug fixes, and continuous product updates. Third-party services, payment processing fees, and any additional custom implementation requirements should be clarified in your proposal.',
    },
    {
      q: 'Can I try the software before purchasing?',
      a: 'Yes. You can explore the sample workspace and book a live demonstration. The sample workspace uses illustrative data and does not process real payments, allowing you to evaluate the full client journey risk-free.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative" id="faq">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-800 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-brand-700" />
            <span>Answers to Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Everything you need to know about branding, setup, agent licenses, and ongoing maintenance.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left gap-4 hover:bg-blue-50/50 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white border border-blue-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-brand-50 text-brand-700' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 bg-white">
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
