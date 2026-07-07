import Image from "next/image";

function About() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-16">

          {/* Text */}
          <div className="flex-1">
            {/* Eyebrow */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C4A87A] mb-3">
              Our Story
            </p>
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-[#1A1815] mb-6 leading-tight">
              About Wayside Loft Mirissa
            </h2>
            <div className="w-12 h-[1.5px] bg-[#C4A87A] mb-8"></div>

            <p className="text-[#6C6760] leading-[1.85] text-[16.5px] mb-5">
              Nestled amidst the lush greenery of Mirissa,{" "}
              <strong className="text-[#1A1815] font-semibold">Wayside Loft</strong> offers a tranquil
              escape where nature meets comfort. As a premier{" "}
              <strong className="text-[#1A1815] font-semibold">guest house and boutique hotel in Mirissa</strong>, we
              specialize in providing comfortable rooms for travelers seeking a serene environment. Our
              boutique accommodation is{" "}
              <strong className="text-[#1A1815] font-semibold">remote work friendly</strong> and perfect
              for digital nomads, offering high-speed internet and quiet spaces.
            </p>
            <p className="text-[#6C6760] leading-[1.85] text-[16.5px]">
              Whether you&apos;re here as a couple seeking a romantic getaway or to experience the thrill
              of <strong className="text-[#1A1815] font-semibold">whale watching in Mirissa</strong>, our
              location and <strong className="text-[#1A1815] font-semibold">modern accommodation</strong>{" "}
              provide the perfect backdrop for your Sri Lankan adventure.
            </p>
          </div>

          {/* Image */}
          <div className="w-full md:w-[52%] flex-shrink-0">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(26,24,21,0.12)]">
              <Image
                fill
                src="/bg.png"
                alt="Wayside Loft interior"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
