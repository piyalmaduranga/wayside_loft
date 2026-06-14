"use client";

export function Card({ children, className = "" }) {
  return (
    <article
      className={`bg-white rounded-2xl overflow-hidden border border-[rgba(26,24,21,0.07)] shadow-[0_4px_16px_rgba(26,24,21,0.06)] transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(26,24,21,0.1)] ${className}`}
    >
      {children}
    </article>
  );
}

export function Thumbnail({ zoomOnHover = true, className = "", children }) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden bg-[#F0EDE5] ${className}`}
    >
      <div className={zoomOnHover ? "w-full h-full [&_img]:transition-transform [&_img]:duration-500 hover:[&_img]:scale-105" : "w-full h-full"}>
        {children}
      </div>
    </div>
  );
}

export function Description({ className = "", children }) {
  return (
    <div className={`px-6 pt-6 pb-8 ${className}`}>{children}</div>
  );
}

export default Card;
