function Badge({ type = "success", className = "", children }) {
  const typeClasses = {
    success: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    danger: "bg-red-100 text-red-800 border border-red-200",
    warning: "bg-amber-100 text-amber-800 border border-amber-200",
  };

  return (
    <span className={`inline-block w-fit px-3 py-1 text-xs font-sans font-semibold uppercase tracking-wider rounded-full ${typeClasses[type] || typeClasses.success} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;

