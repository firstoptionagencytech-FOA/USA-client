'use client';

import React from 'react';
import Image from 'next/image';

export const HeroHdVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[480px] sm:max-w-[620px] md:max-w-[720px] lg:max-w-[820px] mx-auto select-none my-4 sm:my-6 px-2 flex items-center justify-center">
      
      {/* Ambient Radiant Glow - Jewar Deskora Pine & Lime */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#274c3b]/20 via-[#d2f56d]/25 to-[#182c26]/20 blur-3xl rounded-full -z-10 pointer-events-none transform scale-105" />
      <div className="absolute inset-0 bg-radial from-[#d2f56d]/15 via-transparent to-transparent blur-2xl -z-10 pointer-events-none" />

      {/* Ultra-Crisp Transparent 3D Product Showcase Graphic */}
      <div className="relative w-full flex items-center justify-center transform hover:scale-[1.015] transition-transform duration-300">
        <Image
          src="/brand/hero_deskora_showcase_transparent.png"
          alt="JIT Helpdesk Branded Mobile App and Admin Dashboard"
          width={1376}
          height={768}
          priority
          unoptimized
          className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(24,44,38,0.25)] filter brightness-[1.03] contrast-[1.03]"
        />
      </div>

    </div>
  );
};
