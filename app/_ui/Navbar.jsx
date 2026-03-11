"use client";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import fa_styles from "@fortawesome/fontawesome-svg-core/styles.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import GuestDropdown from "./GuestDropdown/GuestDropdown";
import Image from "next/image";

function Navbar({ user, signOutAction }) {
  const [hideMenu, setHideMenu] = useState(true);
  const pathname = usePathname();
  return (
    <header>
      <div className="container header-items">
        <Link href="/" className="logo-container" onClick={() => setHideMenu(true)}>
          <Image
            src="/logo-wayside-loft.png"
            alt="Wayside Loft Logo"
            width={220}
            height={60}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
            priority
          />
        </Link>
        <nav className={`navbar ${hideMenu ? "hide-menu" : "show-menu"}`}>
          <ul>
            <li>
              <Link className={pathname === "/" ? "active" : ""} href="/" onClick={() => setHideMenu(true)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                className={pathname.includes("rooms") ? "active" : ""}
                href="/rooms"
                onClick={() => setHideMenu(true)}
              >
                Rooms
              </Link>
            </li>
            {/* <li>About</li> */}
            <li>
              <Link
                href={"/contact"}
                className={pathname === "/contact" ? "active" : ""}
                onClick={() => setHideMenu(true)}
              >
                Contact Us
              </Link>
            </li>
            <li>
              {user ? (
                <GuestDropdown user={user} signOutAction={signOutAction} />
              ) : (
                <Link
                  className={pathname.includes("account") || pathname === "/signin" ? "active" : ""}
                  href="/signin"
                  onClick={() => setHideMenu(true)}
                >
                  Guest Area
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <button onClick={() => setHideMenu(!hideMenu)} className="toggle-menu-button">
          <FontAwesomeIcon icon={hideMenu ? faBars : faClose} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
