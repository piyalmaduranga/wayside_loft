"use client";

import { useEffect, useState } from "react";

export default function QRCodeCard() {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!currentUrl) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-[#F8F6F1] border border-border/80 rounded-2xl min-h-[220px]">
        <div className="w-10 h-10 border-4 border-[#C4A87A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#F8F6F1] border border-border/85 rounded-2xl text-center">
      <div className="relative w-40 h-40 bg-white p-2.5 rounded-xl border border-border/40 shadow-sm mb-4 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={qrImageUrl} 
          alt="QR Code Link to Page" 
          className="w-full h-full object-contain"
        />
      </div>
      <h4 className="font-serif font-semibold text-[#1A1815] text-sm mb-1">Scan QR Code</h4>
      <p className="text-[12px] text-[#6C6760] font-sans leading-relaxed">
        Scan this code with your mobile camera to quickly view this service details on your phone or share it.
      </p>
    </div>
  );
}
