"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function Slider({ height = "calc(100vh - 64px)", imgPriority = false, images = [], showArrows = true, children }) {
  const [active, setActive] = useState(1);

  // Auto-slide effect that resets whenever active slide changes
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev >= images.length ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [active, images]);

  // Keyboard navigation effect
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setActive((prev) => (prev <= 1 ? images.length : prev - 1));
      } else if (e.key === "ArrowRight") {
        setActive((prev) => (prev >= images.length ? 1 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images]);

  const handlePrev = () => {
    setActive((prev) => (prev <= 1 ? images.length : prev - 1));
  };

  const handleNext = () => {
    setActive((prev) => (prev >= images.length ? 1 : prev + 1));
  };

  const handleTranslate = (index) => {
    setActive(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div 
      className="slider" 
      style={{ 
        position: "relative",
        width: "100%",
        height: height,
        maxHeight: height,
        backgroundColor: "#1a1a1a",
        overflow: "hidden"
      }}
    >
      {/* OVERLAY */}
      <div className="slider-overlay">{children}</div>
      {/* END OVERLAY */}

      {/* SLIDES */}
      <div className="slideshow" style={{ position: "relative", width: "100%", height: "100%" }}>
        {images.map((item, index) => (
          <div 
            key={index} 
            className={`slide ${active === index + 1 ? "active" : ""}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: active === index + 1 ? 1 : 0,
              zIndex: active === index + 1 ? 9 : 0,
              transition: "opacity 1000ms ease-in-out"
            }}
          >
            <Image 
              priority={imgPriority && index === 0} 
              fill 
              src={item} 
              unoptimized={item?.startsWith?.("https")} 
              alt={`slider image ${index + 1}`}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      {/* END SLIDES */}

      {/* NAVIGATION CONTROLS */}
      {showArrows && images.length > 1 && (
        <>
          <button 
            type="button"
            className="slider-btn-prev" 
            onClick={handlePrev}
            aria-label="Previous Slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button 
            type="button"
            className="slider-btn-next" 
            onClick={handleNext}
            aria-label="Next Slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}
      {/* END NAVIGATION CONTROLS */}

      {/* SLIDER MENU */}
      {images.length > 1 && (
        <nav className="slider-menu">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTranslate(index + 1)}
              className={active === index + 1 ? "active" : ""}
            ></button>
          ))}
        </nav>
      )}
      {/* END SLIDER MENU */}
    </div>
  );
}

export default Slider;
