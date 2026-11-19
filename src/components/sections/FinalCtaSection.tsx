'use client';

import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Headphones, Lock } from 'lucide-react';
import Link from 'next/link';

interface FinalCtaSectionProps {
  onOpenBooking: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenBooking }) => {
  return (
    <footer className="relative bg-gradient-to-b from-[#2E0010] via-[#3D0015] to-[#1F000A] text-white pt-20 pb-12 px-4 overflow-hidden">
      
      {/* Decorative ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-700/25 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Brand Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-pink-200 text-xs font-bold uppercase tracking-wider mb-6">
          <Headphones className="w-4 h-4 text-pink-300" />
          <span>Elevate Your IT Support Brand</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display mb-6 leading-tight">
          Your IT Business Deserves More Than Scattered Messages.
        </h2>

        <p className="text-base sm:text-lg text-pink-100/90 leading-relaxed max-w-2xl mx-auto mb-4">
          Give customers a professional, branded place to work with you. Give your team a clearer way to manage service requests. And give yourself more room to focus on the work that matters.
        </p>

        <p className="text-lg sm:text-xl font-black text-white font-display mb-10 tracking-wide">
          Your Brand. Your Customers. Your Platform.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenBooking}
            className="cta-glow-btn group px-10 py-5 rounded-full text-white font-extrabold text-base sm:text-lg flex items-center gap-3 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span>Book Your Free JIT Helpdesk Demo</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <span className="text-xs text-pink-200/70 font-medium">
            For IT service business owners and decision-makers exploring a branded customer experience.
          </span>
        </div>

        {/* Bottom Legal & Navigation Bar */}
        <div className="pt-10 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs text-pink-200/60 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} JIT Helpdesk. A product by Jewar International Technologies.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Security Safeguards</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-pink-300 hover:text-white font-semibold underline underline-offset-4"
            >
              <Lock className="w-3 h-3" />
              <span>CRM Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
