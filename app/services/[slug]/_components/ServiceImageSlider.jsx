"use client";

import Image from "next/image";
import { useState } from "react";

export default function ServiceImageSlider({ images = [], alt = "Service image" }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Viewport */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xs border border-border/40 group">
        <Image
          fill
          src={images[activeIdx]}
          unoptimized={images[activeIdx]?.startsWith("https")}
          alt={`${alt} view ${activeIdx + 1}`}
          className="object-cover transition-all duration-500 ease-in-out"
          priority
        />
        
        {/* Navigation Arrows (Only show if multiple images exist) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-ink shadow-xs hover:bg-[#C4A87A] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 cursor-pointer border border-border/10"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-ink shadow-xs hover:bg-[#C4A87A] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 cursor-pointer border border-border/10"
              aria-label="Next image"
            >
              <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`relative aspect-[16/10] w-20 md:w-24 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 cursor-pointer ${
                activeIdx === idx 
                  ? "border-[#C4A87A] scale-105 shadow-xs" 
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                fill
                src={img}
                unoptimized={img?.startsWith("https")}
                alt={`thumbnail ${idx + 1}`}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
