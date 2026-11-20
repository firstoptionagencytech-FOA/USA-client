'use client';

import React from 'react';
import Image from 'next/image';
import { MessageSquareOff, HelpCircle, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProblemSectionProps {
  onOpenBooking: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenBooking }) => {
  const problems = [
    {
      quote: '“Any update on my request?”',
      title: 'Scattered Customer Requests',
      problem: 'Your customers call or message repeatedly because they don’t have one central place to check real-time progress.',
      solution: 'Give clients a dedicated, branded mobile app and web portal to submit tickets and follow every status change.',
      icon: MessageSquareOff,
      image: '/brand/feature_icon_1_transparent.png',
      badge: 'Unorganized Channels',
    },
    {
      quote: '“Did you get my approval?”',
      title: 'Endless Follow-Ups & Lost Quotes',
      problem: 'Quotes, scopes, revisions, and client approvals get buried across text messages, personal emails, and voicemail.',
      solution: 'Keep quotes, digital approvals, and change requests connected in one seamless client-facing dashboard.',
      icon: HelpCircle,
      image: '/brand/feature_icon_2_transparent.png',
      badge: 'Delayed Approvals',
    },
    {
      quote: '“Wait, which job is still pending?”',
      title: 'Quotes and Payment Confusion',
      problem: 'You’re juggling technical support tickets, payment collection, and status updates while trying to grow your business.',
      solution: 'Bring ticket tracking, approvals, and payment workflows together into one unified experience.',
      icon: Layers,
      image: '/brand/feature_icon_3_transparent.png',
      badge: 'Administrative Chaos',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#274c3b]" />
            <span>The MSP Customer Experience Gap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            Great IT Support Shouldn&apos;t Feel Disorganized.
          </h2>
          <p className="text-base sm:text-lg text-[#61705f] leading-relaxed">
            You may be excellent at fixing technical problems. But when customers can&apos;t see what&apos;s happening, even great service can feel frustrating. Sound familiar?
          </p>
        </div>

        {/* 3 Problem Cards with Transparent Icons & Rich Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl p-6 sm:p-8 bg-[#f6f6ef] border border-[#dce3d4] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 hover:border-[#274c3b] hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Without-bg Transparent 3D Icon Graphic + Fallback */}
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#dce3d4] shadow-xs flex items-center justify-center p-2.5 group-hover:scale-110 group-hover:border-[#d2f56d] transition-transform duration-300">
                      <Image unoptimized
                        src={card.image}
                        alt={card.title}
                        width={40}
                        height={40}
                        className="w-full h-full object-contain filter drop-shadow-xs"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-[#182c26] bg-[#edf3e3] px-3 py-1 rounded-full border border-[#dce3d4]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#182c26] mb-2 italic">
                    {card.quote}
                  </h3>
                  
                  <h4 className="text-sm font-extrabold text-[#274c3b] mb-2">
                    {card.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-5">
                    {card.problem}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#dce3d4] group-hover:border-[#274c3b]/30 transition-colors">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>With JIT Helpdesk:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#182c26] font-medium leading-normal">
                    {card.solution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transition Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#11201b] via-[#182c26] to-[#274c3b] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#d2f56d]/30">
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Your technical skills aren&apos;t the problem.
            </h3>
            <p className="text-sm text-[#edf3e3]/90 mt-1 max-w-xl">
              Your customer experience needs a better system. That&apos;s where JIT Helpdesk comes in.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="poster-glow-btn px-6 sm:px-7 py-3 rounded-full text-white font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 cursor-pointer shadow-md hover:shadow-lg transition-all group"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4 text-[#d2f56d] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
