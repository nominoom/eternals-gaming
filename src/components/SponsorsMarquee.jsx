import React from 'react';
import { useApp } from '../context/AppContext';

export default function SponsorsMarquee({ title = "OUR PARTNERS & SPONSORS" }) {
  const { sponsors } = useApp();

  const sponsorList = [
    { name: "WIX", subtitle: "STUDIO", fontStyle: "tracking-[0.2em] font-extrabold" },
    { name: "ARCADIAN", subtitle: "COMPUTERS", fontStyle: "tracking-[0.15em] font-bold" },
    { name: "ZENNI", subtitle: "OPTICAL", fontStyle: "tracking-[0.25em] font-black" },
    { name: "LOGITECH G", subtitle: "PRO GEAR", fontStyle: "tracking-[0.15em] font-bold" },
    { name: "FOURTHWALL", subtitle: "CREATOR COMMERCE", fontStyle: "tracking-[0.18em] font-extrabold" },
    { name: "BLACKLYTE", subtitle: "ESPORTS SEATING", fontStyle: "tracking-[0.2em] font-black" }
  ];

  // Double array for seamless loop
  const loop = [...sponsorList, ...sponsorList];

  return (
    <div className="w-full py-10 bg-black/80 border-y border-[#00FFDF]/15 relative overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-[#00FFDF] flex items-center justify-center gap-3">
          <span className="w-6 h-[1px] bg-[#00FFDF]/40"></span>
          {title}
          <span className="w-6 h-[1px] bg-[#00FFDF]/40"></span>
        </span>
      </div>

      {/* Gradient Fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      {/* Marquee Track */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-16 py-2">
          {loop.map((sp, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-3 group cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300"
            >
              {/* Geometric Sponsor Monogram Icon */}
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#00FFDF]/50 flex items-center justify-center text-white/80 group-hover:text-[#00FFDF] transition-colors shadow-sm">
                <span className="text-xs font-heading font-extrabold">
                  {sp.name.charAt(0)}
                </span>
              </div>

              {/* Wordmark */}
              <div className="flex flex-col">
                <span className={`text-base font-heading text-white/90 group-hover:text-[#00FFDF] transition-colors ${sp.fontStyle}`}>
                  {sp.name}
                </span>
                <span className="text-[10px] text-white/40 tracking-wider font-paragraph uppercase -mt-0.5">
                  {sp.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
