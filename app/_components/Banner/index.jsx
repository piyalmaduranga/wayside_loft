import Image from "next/image";

function Banner({ title }) {
  return (
    <div className="relative w-full h-[50vh] min-h-[320px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/bg.png"
        fill
        alt=""
        className="object-cover object-center"
        priority
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(14,13,11,0.65)] via-[rgba(14,13,11,0.4)] to-[rgba(14,13,11,0.65)]" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8D9BE]">
          Wayside Loft
        </p>
        <h1 className="font-serif font-medium text-white text-2xl md:text-4xl tracking-wide text-center px-4">
          {title}
        </h1>
        <div className="w-14 h-[1.5px] bg-[#C4A87A]" />
      </div>
    </div>
  );
}

export default Banner;
