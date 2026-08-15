import Card, { Thumbnail, Description } from "../Card/Card";
import Image from "next/image";
import Link from "next/link";
import { services } from "../../_lib/servicesData";

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
                <Image fill src={s.images[0]} alt={s.alt} className="object-cover" />
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
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-auto pt-3 border-t border-[rgba(26,24,21,0.08)] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#6C6760] hover:text-[#C4A87A] transition-all duration-200 group/link font-sans"
                >
                  <span>View more details</span>
                  <span className="text-[#C4A87A] transition-transform duration-200 group-hover/link:translate-x-1">➔</span>
                </Link>
              </Description>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
