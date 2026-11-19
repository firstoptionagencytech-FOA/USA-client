'use client';

import React from 'react';
import Image from 'next/image';

export const HeroHdVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[480px] sm:max-w-[620px] md:max-w-[720px] lg:max-w-[820px] mx-auto select-none my-4 sm:my-6 px-2 flex items-center justify-center">
      
      {/* Multi-layered rich ambient radiant glow behind the transparent graphic */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-700/20 via-pink-500/25 to-brand-900/20 blur-3xl rounded-full -z-10 pointer-events-none transform scale-105" />
      <div className="absolute inset-0 bg-radial from-rose-400/20 via-transparent to-transparent blur-2xl -z-10 pointer-events-none" />

      {/* Ultra-Crisp Transparent 3D Product Showcase Graphic (Bigger, brighter, high-impact) */}
      <div className="relative w-full flex items-center justify-center transform hover:scale-[1.015] transition-transform duration-300">
        <Image
          src="/hero-product-showcase-transparent.png"
          alt="JIT Helpdesk Branded Mobile App and Admin Dashboard"
          width={1200}
          height={900}
          priority
          className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(40,10,25,0.3)] filter brightness-[1.03] contrast-[1.03]"
        />
      </div>

    </div>
  );
};
