import { auth } from "@/auth";
import Footer from "./_components/Footer";
import Navbar from "./_ui/Navbar";
import { AuthModalProvider } from "./_components/AuthModalContext";
import AuthModal from "./_components/AuthModal";
import "./styles.css";

import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { signOutAction } from "./_lib/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  variable: "--font-body",
});

export const metadata = {
  title: {
    template: "%s | Wayside Loft Mirissa",
    default: "Wayside Loft | Boutique Guest House in Mirissa, Sri Lanka",
  },
  description:
    "Discover Wayside Loft, the best accommodation in Mirissa for remote work and relaxation. Boutique hotel experience with comfortable rooms, work-friendly spaces, and proximity to whale watching. Book your Mirissa stay now.",
  keywords: [
    "mirissa",
    "hotel mirissa",
    "guest house mirissa",
    "room mirissa",
    "whale watching mirissa",
    "accommodation mirissa",
    "comfortable room",
    "work friendly",
    "remote work",
    "couple stay mirissa",
    "boutique hotel sri lanka",
    "mirissa hotel booking",
    "best guest house in mirissa",
    "mirissa beach accommodation",
    "affordable rooms mirissa",
    "digital nomad mirissa",
    "stay in mirissa",
    "rose loft mirissa",
    "wayside loft mirissa",
  ],
  authors: [{ name: "Wayside Loft" }],
  creator: "Wayside Loft",
  publisher: "Wayside Loft",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://localhost:3001"), // Update this to your production URL when ready
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wayside Loft | Boutique Guest House in Mirissa",
    description: "Your serene escape in Mirissa. Relax in comfort and style at our boutique guest house.",
    url: "/",
    siteName: "Wayside Loft",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wayside Loft | Boutique Guest House in Mirissa",
    description: "Your serene escape in Mirissa. Relax in comfort and style.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "Wayside Loft Mirissa",
  "description": "Boutique guest house in Mirissa, Sri Lanka. Comfortable rooms and remote work friendly environment.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Yatipila Road",
    "addressLocality": "Mirissa",
    "addressRegion": "Southern Province",
    "addressCountry": "LK"
  },
  "telephone": "+94760087674",
  "url": "http://localhost:3001",
  "starRating": {
    "@type": "Rating",
    "ratingValue": "4.5"
  },
  "priceRange": "$$",
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Free Wi-Fi",
      "value": "true"
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Air Conditioning",
      "value": "true"
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Work Desk",
      "value": "true"
    }
  ]
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jakarta.variable} ${playfair.variable} ${jakarta.className}`}>
        <AuthModalProvider>
          <Navbar user={session?.user} signOutAction={signOutAction} />
          <main>{children}</main>
          <AuthModal />
          {/* global WhatsApp chat button */}
          <a
            href="https://wa.me/+94760087674"
            className="whatsapp-global-button"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <Footer />
        </AuthModalProvider>
      </body>
    </html>
  );
}
