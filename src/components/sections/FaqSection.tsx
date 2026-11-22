'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does it work with Autotask / my current PSA tools?',
      a: 'Yes. JIT Helpdesk is not built to replace your internal backend ticketing engines or PSA software like Autotask, ConnectWise, or HaloPSA. Instead, JIT Helpdesk acts as the high-end, client-facing mobile app and web portal layer that sits in front of your clients. Your clients get a sleek, branded app on their phone with loyalty points and push notifications, while you and your techs can continue running your backend operations smoothly.',
    },
    {
      q: 'Is this platform branded for my IT business?',
      a: 'Yes, 100%. The mobile apps, web portal, email notifications, and quote PDFs all showcase your company logo, custom brand colors, and your own domain (e.g. support.youritcompany.com). To your clients, it looks and feels like proprietary enterprise software built exclusively by your IT team.',
    },
    {
      q: 'Can my customers use both mobile and web?',
      a: 'Yes. Clients can download your native app from the iOS App Store and Google Play Store to receive push notifications and 1-tap support, or log in from any desktop web browser to approve large quotes, review endpoint hardware inventories, and settle invoices.',
    },
    {
      q: 'How many technicians or agents can use it?',
      a: 'Unlimited. Unlike legacy MSP tools that penalize your business with rising per-seat license fees every time you hire a technician or dispatcher, JIT Helpdesk includes unlimited agent seats under the flat $200/month plan.',
    },
    {
      q: 'Can customers approve quotes and make payments?',
      a: 'Yes. Quotes are delivered directly to the client’s phone and web portal with clear line items. Clients can approve scopes in 1 click and settle invoices instantly using credit card, ACH, Apple Pay, or Google Pay via direct Stripe integration.',
    },
    {
      q: 'What’s included in the $200 monthly fee?',
      a: 'Everything required to run your client portal: continuous cloud hosting, iOS and Android app store maintenance, automated SSL certificates, push notification servers, daily backups, feature upgrades, and dedicated technical support. No hidden add-on fees.',
    },
    {
      q: 'Can I try the software before purchasing?',
      a: 'Yes. You can explore a personalized live demo where we showcase the app pre-configured with your logo and brand colors. You can evaluate the entire client experience risk-free before deciding to launch.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative" id="faq">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-brand-800 text-xs font-bold uppercase tracking-wider mb-4">
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
                className="bg-[#f6f6ef] rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left gap-4 hover:bg-[#edf3e3]/50 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white border border-[#dce3d4] flex items-center justify-center shrink-0 transition-transform duration-200 ${
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
