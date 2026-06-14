function Alert({ type = "danger", children }) {
  const typeClasses = {
    danger: "bg-red-500 text-white",
    warning: "bg-amber-500 text-ink",
    success: "bg-emerald-600 text-white",
  };

  return (
    <div className={`p-4 rounded-md flex items-center font-sans text-sm mb-4 ${typeClasses[type] || typeClasses.danger}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-3 shrink-0">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M12 18h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="font-medium">{children}</span>
    </div>
  );
}

export default Alert;

