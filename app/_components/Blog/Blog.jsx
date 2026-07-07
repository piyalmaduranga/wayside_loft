import Card, { Thumbnail, Description } from "../Card/Card";
import Image from "next/image";

const services = [
  {
    img: "/airport-shuttle-1.png",
    alt: "Airport Transfers Mirissa",
    label: "Travel & Transport",
    title: "Airport Transfers",
    desc: "Travel with ease. We offer convenient transfers between the airport and your accommodation in Mirissa, ensuring a smooth and hassle-free journey.",
  },
  {
    img: "/whale-watching.png",
    alt: "Whale Watching in Mirissa",
    label: "Ocean Experience",
    title: "Whale Watching",
    desc: "Experience the thrill of whale watching in Mirissa, one of the best places in the world to spot blue whales and dolphins in their natural habitat.",
  },
  {
    img: "/yala-safari.png",
    alt: "Yala Safari from Mirissa",
    label: "Wildlife Adventure",
    title: "Yala Safari Tours",
    desc: "Embark on an unforgettable safari adventure through Yala National Park. Spot elephants, leopards, and diverse bird species from our guest house.",
  },
  {
    img: "/laundry-service.png",
    alt: "Laundry Service Wayside Loft",
    label: "Guest Comfort",
    title: "Laundry Service",
    desc: "Enjoy fresh and clean clothes throughout your stay. We offer fast, high-quality laundry and pressing services so you can travel light and stay fresh.",
  },
  {
    img: "/scooter-rental.png",
    alt: "Scooter Rental Mirissa",
    label: "Adventure & Travel",
    title: "Scooter Rental",
    desc: "Explore Mirissa and the surrounding beaches at your own pace. We offer convenient scooter renting in Mirissa directly from our guest house so you can discover hidden spots with ease.",
  },
];

function Blog() {
  return (
    <section className="py-20 bg-[#F8F6F1]">
      <div className="container">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C4A87A] mb-3">
            What We Offer
          </p>
          <h2 className="font-serif font-medium text-3xl md:text-4xl text-[#1A1815] mb-4">
            Services & Experiences
          </h2>
          <p className="text-[#6C6760] text-base max-w-md mx-auto leading-relaxed">
            We offer a range of services to make your stay comfortable and enjoyable.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {services.map((s) => (
            <Card key={s.title} className="flex flex-col h-full">
              <Thumbnail>
                <Image fill src={s.img} alt={s.alt} className="object-cover" />
              </Thumbnail>
              <Description className="flex flex-col flex-grow">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C4A87A] mb-2">
                  {s.label}
                </p>
                <h3 className="font-serif font-medium text-lg text-[#1A1815] mb-3 leading-snug">
                  {s.title}
                </h3>
                <p className="text-[#6C6760] text-[14.5px] leading-[1.75] mb-4">
                  {s.desc}
                </p>
                <a
                  href={`https://wa.me/94760087674?text=${encodeURIComponent(
                    `Hi Wayside Loft, I'm interested in the "${s.title}" service. Could you please share more details, availability, and pricing?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-3 border-t border-[rgba(26,24,21,0.08)] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#6C6760] hover:text-[#C4A87A] transition-all duration-200 group/link font-sans"
                >
                  <span>Request Details</span>
                  <span className="text-[#C4A87A] transition-transform duration-200 group-hover/link:translate-x-1">➔</span>
                </a>
              </Description>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
