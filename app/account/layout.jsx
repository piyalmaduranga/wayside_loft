import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { signOutAction } from "../_lib/actions";

function Layout({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 items-start">
        <aside className="md:col-span-1 bg-surface border border-border p-6 rounded-lg shadow-sm">
          <ul className="flex md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            <li className="flex-1 md:flex-initial">
              <Link 
                href="/account/history" 
                className="flex items-center justify-center md:justify-start gap-3 w-full px-4 py-3 bg-ivory hover:bg-gold/10 hover:text-gold text-ink font-sans text-sm font-medium rounded-sm transition-all duration-200"
              >
                <FontAwesomeIcon icon={faHistory} className="w-4 h-4 text-gold" />
                <span className="hidden sm:inline">History</span>
              </Link>
            </li>
            <li className="flex-1 md:flex-initial">
              <Link 
                href="/account/profile" 
                className="flex items-center justify-center md:justify-start gap-3 w-full px-4 py-3 bg-ivory hover:bg-gold/10 hover:text-gold text-ink font-sans text-sm font-medium rounded-sm transition-all duration-200"
              >
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gold" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </li>
            <li className="flex-1 md:flex-initial border-l border-border md:border-l-0 md:border-t md:pt-4">
              <form action={signOutAction} className="w-full">
                <button 
                  type="submit"
                  className="flex items-center justify-center md:justify-start gap-3 w-full px-4 py-3 bg-transparent hover:bg-red-50 text-red-600 hover:text-red-700 font-sans text-sm font-medium rounded-sm transition-all duration-200 border-none outline-none cursor-pointer"
                >
                  <FontAwesomeIcon icon={faSignOut} className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </form>
            </li>
          </ul>
        </aside>

        <div className="md:col-span-3 min-h-[50vh]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;

