import { Suspense } from "react";
import About from "./_components/About";
import Blog from "./_components/Blog/Blog";

import Gallery from "./_components/Gallery";
import HeroSection from "./_components/HeroSection";
import Rooms from "./_components/Rooms";
import LoadingSpinner from "./_ui/LoadingSpinner";
import { redirect } from "next/navigation";
import ContactSection from "./_components/ContactSection";

export const metadata = {
  title: "Home | Wayside Loft Mirissa - Best Boutique Stay in Sri Lanka",
  description:
    "Book your stay at Wayside Loft, the premier boutique guest house in Mirissa. Perfect for digital nomads, couples, and whale watching enthusiasts. Comfortable rooms and remote-work friendly.",
};

export default async function Home() {
  async function bookingSearchAction(formatedRange) {
    "use server";
    redirect(`/rooms?range=${formatedRange}`);
  }
  return (
    <>
      <HeroSection bookingSearchAction={bookingSearchAction} />
      <About />
      <Suspense
        fallback={
          <div className="global-loading">
            <LoadingSpinner />
          </div>
        }
      >
        <Rooms />
        <Gallery />
      </Suspense>
      <Blog />
      <ContactSection />
    </>
  );
}
