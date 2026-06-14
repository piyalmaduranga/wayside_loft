"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16 bg-[#F8F6F1] text-[#1A1815]">
      <span className="font-serif font-bold text-7xl text-[#C4A87A] mb-4">500</span>
      <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3">Server Error</h2>
      <p className="text-[#6C6760] max-w-md mb-6 text-sm md:text-base leading-relaxed">
        {error?.message || "Something went wrong while processing your request."}
      </p>
      <button
        className="bg-[#C4A87A] hover:bg-[#A8895E] text-white font-medium px-6 py-3 rounded-md transition-colors duration-150 cursor-pointer shadow-sm text-sm"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
