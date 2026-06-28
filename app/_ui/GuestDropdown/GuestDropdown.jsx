import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const GuestDropdown = ({ user, signOutAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (e.target.closest("[data-avatar-container]")) return;
    setIsOpen(false);
  };

  React.useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div 
      className="flex items-center relative cursor-pointer select-none" 
      onClick={toggleDropdown}
      data-avatar-container
    >
      <img
        src={
          user.image
            ? user.image
            : `https://ui-avatars.com/api/?name=${user.name.replace(" ", "+")}&background=161616&color=F1F1F1`
        }
        alt={`${user.name} avatar`}
        className="w-10 h-10 rounded-full mr-2 border border-border"
      />
      <span className="text-muted hover:text-gold transition-colors duration-200">
        <FontAwesomeIcon icon={faCaretDown} />
      </span>
      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 bg-surface border border-border shadow-md rounded-md w-40 z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <Link 
            className="block px-4 py-2.5 text-sm text-ink hover:bg-ivory hover:text-gold transition-colors duration-200 font-sans" 
            href="/account/history"
          >
            History
          </Link>
          <Link 
            className="block px-4 py-2.5 text-sm text-ink hover:bg-ivory hover:text-gold transition-colors duration-200 font-sans border-t border-border/50" 
            href="/account/profile"
          >
            Profile
          </Link>
          <form action={signOutAction} className="border-t border-border/50">
            <button 
              type="submit" 
              className="w-full text-left block px-4 py-2.5 text-sm text-ink hover:bg-ivory hover:text-gold transition-colors duration-200 font-sans border-none outline-none cursor-pointer"
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GuestDropdown;

