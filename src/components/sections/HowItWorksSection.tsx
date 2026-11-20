'use client';

import React from 'react';
import Image from 'next/image';
import { Smartphone, Eye, CheckSquare, CreditCard, Award, ArrowRight, Calendar } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'A Customer Needs IT Help',
      body: 'They open your branded mobile app or web portal and submit a service request with device details and symptoms.',
      image: '/brand/feature_icon_1_transparent.png',
    },
    {
      num: '02',
      title: 'You Review the Request',
      body: 'Your team triages the ticket from the owner dashboard, prepares an itemized quote, and sets clear delivery expectations.',
      image: '/brand/feature_icon_2_transparent.png',
    },
    {
      num: '03',
      title: 'The Customer Approves',
      body: 'The client reviews the scope on their smartphone, approves the pricing, or requests changes without phone tag.',
      image: '/brand/feature_icon_4_transparent.png',
    },
    {
      num: '04',
      title: 'Payment & Progress Stay Connected',
      body: 'With payment gateway configured, customers complete checkout and track technician progress in real time.',
      image: '/brand/feature_icon_3_transparent.png',
    },
    {
      num: '05',
      title: 'You Complete the Work',
      body: 'The customer inspects and signs off on the resolved ticket. Your system maintains an audit trail and triggers referral options.',
      image: '/brand/feature_icon_5_transparent.png',
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#f6f6ef] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#274c3b]" />
            <span>The 5-Step Customer Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            From Customer Request to Completed Job.
          </h2>
          <p className="text-base sm:text-lg text-[#61705f] leading-relaxed">
            Less scattered communication. Clearer next steps. A more professional customer experience.
          </p>
        </div>

        {/* 5-Step Connected Timeline with Without-BG Visual Badges & Hover Lift */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#dce3d4] via-[#274c3b] to-[#dce3d4] -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((s, idx) => {
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-3xl p-6 border border-[#dce3d4] shadow-xs hover:border-[#274c3b] hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-[#182c26] font-display group-hover:text-[#274c3b] transition-colors">
                        {s.num}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-[#edf3e3] border border-[#dce3d4] p-2 flex items-center justify-center group-hover:scale-110 group-hover:border-[#d2f56d] transition-all duration-300">
                        <Image unoptimized
                          src={s.image}
                          alt={s.title}
                          width={36}
                          height={36}
                          className="w-full h-full object-contain filter drop-shadow-xs"
                        />
                      </div>
                    </div>

                    <h3 className="text-sm font-extrabold text-[#182c26] mb-2 leading-tight group-hover:text-[#274c3b] transition-colors">
                      {s.title}
                    </h3>

                    <p className="text-xs text-[#61705f] leading-relaxed">
                      {s.body}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 text-[10px] font-bold text-[#274c3b] uppercase tracking-wider flex items-center justify-between">
                    <span>Step {idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d2f56d] group-hover:animate-ping" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Walkthrough CTA Bar */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenBooking}
            className="poster-glow-btn px-8 sm:px-10 py-3.5 rounded-full text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-3 cursor-pointer shadow-lg hover:shadow-xl transition-all group"
          >
            <Calendar className="w-4 h-4 text-[#d2f56d]" />
            <span>Walk Through the System Live on a Free Demo Call</span>
            <ArrowRight className="w-4 h-4 text-[#d2f56d] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
