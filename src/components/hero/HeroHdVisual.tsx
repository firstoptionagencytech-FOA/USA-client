'use client';

import React from 'react';
import Image from 'next/image';

export const HeroHdVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[460px] md:max-w-[520px] mx-auto select-none my-3 sm:my-5 px-2 flex items-center justify-center">
      
      {/* Subtle ambient radiant glow behind the transparent graphic */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-700/10 via-rose-500/15 to-brand-900/10 blur-2xl rounded-full -z-10 pointer-events-none transform scale-95" />

      {/* Ultra-Crisp Transparent 3D Product Showcase Graphic (Isolated, without background) */}
      <div className="relative w-full flex items-center justify-center">
        <Image
          src="/hero-product-showcase-transparent.png"
          alt="JIT Helpdesk Branded Mobile App and Admin Dashboard"
          width={1024}
          height={768}
          priority
          className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(40,10,25,0.25)] hover:scale-[1.01] transition-transform duration-300"
        />
      </div>

    </div>
  );
};
