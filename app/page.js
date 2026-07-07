import { Suspense } from "react";
import About from "./_components/About";
import Blog from "./_components/Blog/Blog";
import FAQ from "./_components/FAQ";

import Gallery from "./_components/Gallery";
import HeroSection from "./_components/HeroSection";
import Rooms from "./_components/Rooms";
import LoadingSpinner from "./_ui/LoadingSpinner";
import { redirect } from "next/navigation";
import ContactSection from "./_components/ContactSection";

export const metadata = {
  title: "Wayside Loft | Boutique Guest House & Hotel in Mirissa Sri Lanka",
  description:
    "Welcome to Wayside Loft, the premier guest house and boutique hotel in Mirissa. Enjoy whale watching, scooter renting, and comfortable rooms for work and relaxation in Sri Lanka.",
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
      <FAQ />
      <ContactSection />
    </>
  );
}
