"use client";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import GuestDropdown from "./GuestDropdown/GuestDropdown";

function Navbar({ user, signOutAction }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/contact", label: "Contact Us" },
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-[1000] bg-[#F8F6F1]/92 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_12px_rgba(26,24,21,0.04)]">
      <div className="container flex items-center justify-between h-[72px]">

        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)} className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity">
          <span className="font-serif text-[1.85rem] font-semibold tracking-tight text-[#1A1815]">
            WAYSIDE <span className="text-[#C4A87A]">LOFT</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 py-1
                ${isActive(href)
                  ? "text-[#1A1815] after:scale-x-100"
                  : "text-[#6C6760] hover:text-[#1A1815]"
                }
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#C4A87A]
                after:origin-left after:transition-transform after:duration-300
                ${!isActive(href) ? "after:scale-x-0 hover:after:scale-x-100" : ""}
              `}
            >
              {label}
            </Link>
          ))}
          {/* Guest Area */}
          {user ? (
            <GuestDropdown user={user} signOutAction={signOutAction} />
          ) : (
            <Link
              href="/signin"
              className={`relative text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 py-1
                ${pathname.includes("account") || pathname === "/signin"
                  ? "text-[#1A1815] after:scale-x-100"
                  : "text-[#6C6760] hover:text-[#1A1815]"
                }
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#C4A87A]
                after:origin-left after:transition-transform after:duration-300
                ${!(pathname.includes("account") || pathname === "/signin") ? "after:scale-x-0 hover:after:scale-x-100" : ""}
              `}
            >
              Guest Area
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-[#1A1815] text-xl hover:bg-black/5 transition-colors"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={open ? faClose : faBars} />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <nav className="md:hidden bg-[#F8F6F1]/97 backdrop-blur-xl border-t border-black/[0.06]">
          <ul className="flex flex-col items-center gap-6 py-8 px-6">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors
                    ${isActive(href) ? "text-[#C4A87A]" : "text-[#6C6760] hover:text-[#1A1815]"}`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              {user ? (
                <GuestDropdown user={user} signOutAction={signOutAction} />
              ) : (
                <Link
                  href="/signin"
                  onClick={() => setOpen(false)}
                  className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6C6760] hover:text-[#1A1815] transition-colors"
                >
                  Guest Area
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
