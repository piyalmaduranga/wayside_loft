function Heading({ className = "", children }) {
  const hasMargin = /\b(m[tbyrlex]?)-/.test(className);
  return (
    <div className={`${hasMargin ? "" : "mb-3"} ${className}`}>
      <h2 className="inline-flex items-center gap-3 font-serif font-medium text-2xl md:text-3xl text-[#1A1815] tracking-tight">
        <span className="w-8 h-px bg-[#C4A87A] flex-shrink-0" />
        {children}
        <span className="w-8 h-px bg-[#C4A87A] flex-shrink-0" />
      </h2>
    </div>
  );
}

export default Heading;
