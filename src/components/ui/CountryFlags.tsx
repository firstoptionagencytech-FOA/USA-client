'use client';

import React from 'react';

interface FlagProps {
  className?: string;
}

/**
 * 🇺🇸 United States of America Flag SVG
 */
export const FlagUS: React.FC<FlagProps> = ({ className = 'w-4 h-3 inline-block rounded-xs shadow-2xs' }) => (
  <svg viewBox="0 0 640 480" className={className} aria-label="United States Flag">
    <g fillRule="evenodd">
      <path fill="#bd3d44" d="M0 0h640v480H0z" />
      <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640" />
      <path fill="#192f5d" d="M0 0h296v259H0z" />
      <g fill="#fff">
        <circle cx="35" cy="30" r="7" />
        <circle cx="85" cy="30" r="7" />
        <circle cx="135" cy="30" r="7" />
        <circle cx="185" cy="30" r="7" />
        <circle cx="235" cy="30" r="7" />
        <circle cx="60" cy="65" r="7" />
        <circle cx="110" cy="65" r="7" />
        <circle cx="160" cy="65" r="7" />
        <circle cx="210" cy="65" r="7" />
        <circle cx="260" cy="65" r="7" />
        <circle cx="35" cy="100" r="7" />
        <circle cx="85" cy="100" r="7" />
        <circle cx="135" cy="100" r="7" />
        <circle cx="185" cy="100" r="7" />
        <circle cx="235" cy="100" r="7" />
        <circle cx="60" cy="135" r="7" />
        <circle cx="110" cy="135" r="7" />
        <circle cx="160" cy="135" r="7" />
        <circle cx="210" cy="135" r="7" />
        <circle cx="260" cy="135" r="7" />
        <circle cx="35" cy="170" r="7" />
        <circle cx="85" cy="170" r="7" />
        <circle cx="135" cy="170" r="7" />
        <circle cx="185" cy="170" r="7" />
        <circle cx="235" cy="170" r="7" />
        <circle cx="60" cy="205" r="7" />
        <circle cx="110" cy="205" r="7" />
        <circle cx="160" cy="205" r="7" />
        <circle cx="210" cy="205" r="7" />
        <circle cx="260" cy="205" r="7" />
        <circle cx="35" cy="235" r="7" />
        <circle cx="85" cy="235" r="7" />
        <circle cx="135" cy="235" r="7" />
        <circle cx="185" cy="235" r="7" />
        <circle cx="235" cy="235" r="7" />
      </g>
    </g>
  </svg>
);

/**
 * 🇮🇳 India Flag SVG (Tricolor + Ashoka Chakra)
 */
export const FlagIN: React.FC<FlagProps> = ({ className = 'w-4 h-3 inline-block rounded-xs shadow-2xs' }) => (
  <svg viewBox="0 0 640 480" className={className} aria-label="India Flag">
    <path fill="#f93" d="M0 0h640v160H0z" />
    <path fill="#fff" d="M0 160h640v160H0z" />
    <path fill="#128807" d="M0 320h640v160H0z" />
    <g transform="translate(320, 240)">
      <circle r="46" fill="none" stroke="#000080" strokeWidth="5.5" />
      <circle r="9" fill="#000080" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1="0"
          x2={46 * Math.cos((i * 15 * Math.PI) / 180)}
          y2={46 * Math.sin((i * 15 * Math.PI) / 180)}
          stroke="#000080"
          strokeWidth="2.5"
        />
      ))}
    </g>
  </svg>
);

/**
 * 🇬🇧 United Kingdom Flag SVG
 */
export const FlagGB: React.FC<FlagProps> = ({ className = 'w-4 h-3 inline-block rounded-xs shadow-2xs' }) => (
  <svg viewBox="0 0 640 480" className={className} aria-label="United Kingdom Flag">
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path stroke="#fff" strokeWidth="60" d="m0 0 640 480M640 0 0 480" />
    <path stroke="#c8102e" strokeWidth="35" d="m0 0 640 480M640 0 0 480" />
    <path stroke="#fff" strokeWidth="100" d="M320 0v480M0 240h640" />
    <path stroke="#c8102e" strokeWidth="60" d="M320 0v480M0 240h640" />
  </svg>
);

/**
 * 🌐 Globe / Universal Timezone Icon
 */
export const FlagGlobe: React.FC<FlagProps> = ({ className = 'w-4 h-3 inline-block' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Global UTC">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/**
 * Helper to get the appropriate flag component by timezone identifier
 */
export const getTimezoneFlag = (timezone: string, className = 'w-4 h-3 inline-block rounded-xs') => {
  if (timezone === 'Asia/Kolkata') {
    return <FlagIN className={className} />;
  }
  if (timezone.startsWith('America/') || ['ET', 'CT', 'MT', 'PT'].some(k => timezone.includes(k))) {
    return <FlagUS className={className} />;
  }
  if (timezone === 'Europe/London') {
    return <FlagGB className={className} />;
  }
  return <FlagGlobe className={className} />;
};
