import Banner from "../_components/Banner";
import ContactSection from "../_components/ContactSection";

export const metadata = {
  title: "Contact Us | Wayside Loft Mirissa Guest House & Hotel",
  description: "Get in touch with Wayside Loft Mirissa. Contact us for guest house booking, hotel stays, scooter renting, or whale watching arrangements in Mirissa, Sri Lanka.",
};

async function Page() {
  return (
    <>
      <Banner title={"Reaching Out"} />
      <ContactSection />
    </>
  );
}

export default Page;
