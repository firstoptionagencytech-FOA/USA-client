'use client';

import React from 'react';
import { ArrowRight, Smartphone, Eye, CheckSquare, CreditCard, Award } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'A Customer Needs IT Help',
      body: 'They open your branded mobile app or web portal and submit a service request with device details and symptoms.',
      icon: Smartphone,
    },
    {
      num: '02',
      title: 'You Review the Request',
      body: 'Your team triages the ticket from the owner dashboard, prepares an itemized quote, and sets clear delivery expectations.',
      icon: Eye,
    },
    {
      num: '03',
      title: 'The Customer Approves',
      body: 'The client reviews the scope on their smartphone, approves the pricing, or requests changes without phone tag.',
      icon: CheckSquare,
    },
    {
      num: '04',
      title: 'Payment & Progress Stay Connected',
      body: 'With payment gateway configured, customers complete checkout and track technician progress in real time.',
      icon: CreditCard,
    },
    {
      num: '05',
      title: 'You Complete the Work',
      body: 'The customer inspects and signs off on the resolved ticket. Your system maintains an audit trail and triggers referral options.',
      icon: Award,
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#FCF8FA] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-wider mb-4">
            The 5-Step Customer Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            From Customer Request to Completed Job.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Less scattered communication. Clearer next steps. A more professional customer experience.
          </p>
        </div>

        {/* 5-Step Connected Timeline */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-pink-200 via-brand-300 to-pink-200 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-pink-100/90 shadow-xs hover:shadow-card-soft transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-brand-800 font-display">
                        {s.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900 mb-2 leading-tight">
                      {s.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {s.body}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 text-[10px] font-bold text-brand-700 uppercase tracking-wider">
                    Step {idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-12">
          <button
            onClick={onOpenBooking}
            className="cta-glow-btn px-8 sm:px-10 py-4 rounded-full text-white font-extrabold text-sm sm:text-base inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book a Live Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
