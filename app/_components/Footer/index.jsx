import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

function Footer() {
  return (
    <footer className="pt-16 bg-[#0E0D0B] text-[#B0A99F]">
      <div className="container py-16">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h3 className="font-serif text-white font-medium text-[1.8rem] pb-3 mb-5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-px after:bg-[#C4A87A]">
              WAYSIDE <span className="text-[#C4A87A]">LOFT</span>
            </h3>
            <p className="text-[13.5px] leading-relaxed text-[#B0A99F]">
              A premium <strong className="text-[#E8D9BE] font-medium">guest house in Mirissa</strong>, offering comfortable rooms and a work-friendly environment for travelers seeking a serene escape.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-white font-medium text-[1.1rem] pb-3 mb-5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-px after:bg-[#C4A87A]">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3 text-[13.5px]">
              <li><a href="mailto:piyaluom@gmail.com" className="hover:text-[#C4A87A] transition-colors">piyaluom@gmail.com</a></li>
              <li><a href="tel:+94760087674" className="hover:text-[#C4A87A] transition-colors">+94 760 087 674</a></li>
              <li className="leading-relaxed">Wayside Loft, Yatipila Road, Mirissa</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-serif text-white font-medium text-[1.1rem] pb-3 mb-5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-px after:bg-[#C4A87A]">
              Explore
            </h3>
            <ul className="flex flex-col gap-3 text-[13.5px]">
              {[
                { href: "/", label: "Home" },
                { href: "/rooms", label: "Rooms" },
                { href: "/contact", label: "Contact Us" },
                { href: "/signin", label: "Guest Area" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-[#C4A87A] transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-white font-medium text-[1.1rem] pb-3 mb-5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-px after:bg-[#C4A87A]">
              Newsletter
            </h3>
            <p className="text-[13px] leading-relaxed mb-4 text-[#B0A99F]">
              Subscribe for exclusive offers and travel inspiration.
            </p>
            <NewsletterForm />
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] text-center text-[12.5px] text-white/30">
          © {new Date().getFullYear()} Wayside Loft Mirissa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
