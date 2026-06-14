"use client";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Accordion({ label, className = "", children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-b border-border py-4 transition-all duration-300 ${className}`}>
      <button 
        type="button"
        className="w-full flex items-center justify-between text-left font-sans font-medium text-ink focus:outline-none cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base md:text-lg hover:text-gold transition-colors duration-200">{label}</span>
        <span className="w-8 h-8 rounded-full bg-ivory-dark/40 flex items-center justify-center text-muted group-hover:text-gold group-hover:bg-gold/10 transition-all duration-200">
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="w-3.5 h-3.5" />
        </span>
      </button>
      
      {isOpen && (
        <div className="mt-3 pl-1 pr-6 text-muted text-sm md:text-base leading-relaxed font-sans space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

export default Accordion;

