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
    default: "Wayside Loft | Boutique Guest House & Hotel in Mirissa, Sri Lanka",
  },
  description:
    "Discover Wayside Loft, the best accommodation, guest house and boutique hotel in Mirissa. Perfect for remote work, relaxation, whale watching, and scooter renting. Boutique hotel experience with comfortable rooms, work-friendly spaces, and proximity to beach. Book your Mirissa stay now.",
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
    "guest house",
    "scooter renting mirissa",
    "scooter rental mirissa",
    "mirissa hotel",
    "mirissa guest house",
    "comfortable stay mirissa"
  ],
  authors: [{ name: "Wayside Loft" }],
  creator: "Wayside Loft",
  publisher: "Wayside Loft",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://waysideloft.com"),
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
  "@graph": [
    {
      "@type": "Hotel",
      "@id": "https://waysideloft.com/#hotel",
      "name": "Wayside Loft Mirissa",
      "description": "Premium boutique guest house and hotel in Mirissa, Sri Lanka. Offers comfortable rooms, remote work amenities, scooter rentals, and whale watching excursions.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Yatipila Road",
        "addressLocality": "Mirissa",
        "addressRegion": "Southern Province",
        "addressCountry": "LK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "5.94826",
        "longitude": "80.45782"
      },
      "telephone": "+94760087674",
      "url": "https://waysideloft.com",
      "starRating": {
        "@type": "Rating",
        "ratingValue": "4.8"
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
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Free Breakfast",
          "value": "true"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Scooter Rental",
          "value": "true"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Laundry Service",
          "value": "true"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Guest Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Scooter Rental Mirissa",
              "description": "Convenient scooter renting in Mirissa directly from our guest house to explore surrounding beaches."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Whale Watching Mirissa",
              "description": "Ocean excursions to spot blue whales and dolphins in Mirissa, Sri Lanka."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Yala Safari Tours",
              "description": "Wildlife safaris to Yala National Park directly arranged for our guests."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Airport Transfers",
              "description": "Convenient airport shuttles between CMB airport and Mirissa."
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://waysideloft.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How can I book a guest house or hotel stay in Mirissa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can easily book online directly at Wayside Loft. We offer a simple 'Book Now, Pay on Arrival' reservation system with instant confirmation and zero pre-payment fees."
          }
        },
        {
          "@type": "Question",
          "name": "Do you arrange whale watching excursions in Mirissa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Wayside Loft can arrange whale watching tours for you to spot blue whales, sperm whales, and dolphins in their natural habitat off Mirissa beach."
          }
        },
        {
          "@type": "Question",
          "name": "Is scooter renting available at Wayside Loft in Mirissa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer convenient scooter renting directly from our boutique guest house to easily explore Mirissa beach, Weligama, and other neighbouring surf spots."
          }
        }
      ]
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
