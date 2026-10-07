import Image from "next/image";
import Link from "next/link";
import ReachServiceForm from "./_components/ReachServiceForm";

export const metadata = {
  title: "Reach Service | Personal Concierge & Arrival Assistance Mirissa",
  description:
    "Experience seamless arrival assistance, personal transit coordination, luggage handling, and bespoke guest support with the Wayside Loft Reach Service in Mirissa.",
};

export default function ReachServicePage() {
  const directWhatsAppMsg = `Hi Wayside Loft, I am interested in your Reach Service. Could you please share more details and help me arrange my arrival in Mirissa?`;
  const directWhatsAppUrl = `https://wa.me/94760087674?text=${encodeURIComponent(directWhatsAppMsg)}`;

  const benefits = [
    {
      title: "Seamless Convenience",
      desc: "Tailored around your flight or train schedule for a stress-free arrival in Mirissa.",
      icon: (
        <svg className="w-5 h-5 text-[#C4A87A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Personalized Support",
      desc: "Custom assistance tailored specifically to your luggage, transit, or exploration needs.",
      icon: (
        <svg className="w-5 h-5 text-[#C4A87A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: "Easy Request Flow",
      desc: "Submit your request in under a minute with instant pre-filled WhatsApp communication.",
      icon: (
        <svg className="w-5 h-5 text-[#C4A87A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Local Assistance",
      desc: "Direct support from our friendly Wayside Loft team who know the Southern Coast inside out.",
      icon: (
        <svg className="w-5 h-5 text-[#C4A87A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Flexible Arrangements",
      desc: "From station pickup to pre-arranged scooter rentals or luggage storage, we handle it all.",
      icon: (
        <svg className="w-5 h-5 text-[#C4A87A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
  ];

  const steps = [
    { num: "01", title: "Choose Reach Service", desc: "Select your desired arrival support, transfer, or local assistance requirement." },
    { num: "02", title: "Submit Request", desc: "Fill in your travel dates, times, and specific details using our clean form." },
    { num: "03", title: "Team Review", desc: "Our Wayside Loft team reviews availability and plans your service." },
    { num: "04", title: "Confirmation Shared", desc: "Receive confirmation details directly via WhatsApp or email." },
    { num: "05", title: "Service Arranged", desc: "Relax knowing every detail of your arrival in Mirissa is taken care of." },
  ];

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full py-24 md:py-32 bg-[#0E0D0B] text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&q=80"
            alt="Wayside Loft Reach Service Mirissa"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B] via-[#0E0D0B]/60 to-transparent z-0"></div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C4A87A] block mb-3 font-sans">
            Concierge & Local Assistance
          </span>
          <h1 className="font-serif font-medium text-4xl sm:text-5xl md:text-6xl text-white mb-6 tracking-tight">
            Reach Service
          </h1>
          <p className="text-white/80 font-sans font-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Enjoy seamless arrival coordination, personal transit assistance, pre-arranged scooter setups, and dedicated guest care in Mirissa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#request-form"
              className="w-full sm:w-auto px-8 py-4 bg-[#C4A87A] hover:bg-[#A8895E] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md"
            >
              Request Reach Service
            </a>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.724-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.966 14.122.942 11.998.942c-5.437 0-9.864 4.371-9.868 9.8.001 1.814.502 3.59 1.451 5.158L2.613 21.33l5.59-1.455c.002-.001.002-.001.044-.021zM17.48 14.65c-.302-.152-1.793-.883-2.073-.984-.282-.102-.487-.152-.692.152-.205.304-.795.984-.974 1.186-.18.203-.36.228-.662.076-1.566-.783-2.584-1.378-3.611-2.148-.82-.618-1.517-1.332-1.929-2.043-.18-.305-.019-.47.132-.621.136-.137.302-.355.454-.533.151-.178.202-.304.302-.508.101-.203.05-.38-.025-.532-.075-.152-.693-1.67-.949-2.28-.25-.6-.525-.52-.722-.53-.186-.01-.399-.01-.612-.01-.213 0-.56.08-.853.406-.293.324-1.12 1.09-1.12 2.659 0 1.57 1.144 3.09 1.304 3.3 1.6 2.1 3.099 3.2 4.979 3.82.912.3 1.81.35 2.47.25.75-.11 2.29-.93 2.61-1.83.32-.9 0-1.67-.1-1.83-.1-.15-.3-.23-.6-.38z" />
              </svg>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-4 pt-16 space-y-20">

        {/* 2. Service Overview & Included Items */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4A87A] font-sans">
              Overview
            </span>
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-[#1A1815] leading-tight">
              Personalized Guest Assistance When You Reach Mirissa
            </h2>
            <div className="w-16 h-0.5 bg-[#C4A87A]"></div>
            <p className="text-[#6C6760] font-sans font-light text-sm sm:text-base leading-relaxed">
              Arriving in a new beach town should feel welcoming and effortless. The <strong className="text-[#1A1815] font-medium">Reach Service</strong> is a tailor-made guest support program provided by Wayside Loft. From coordinating highway pickups to having a clean scooter ready outside your room, we streamline your travel logistics so you can start relaxing the moment you arrive.
            </p>

            {/* Included checklist */}
            <div className="pt-4 space-y-3 font-sans text-xs sm:text-sm text-[#1A1815]">
              {[
                "Airport & Matara / Weligama railway station pickup coordination",
                "Pre-arranged scooter rental delivered upon your arrival",
                "Luggage handling & luggage storage assistance",
                "Custom local activity planning (Whale watching, Yala safaris)",
                "24/7 direct WhatsApp communication with our resident team",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#C4A87A]/15 text-[#C4A87A] flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                  <span className="text-[#6C6760]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden shadow-md border border-border/40">
            <Image
              src="/waysideloft-room.jpg"
              alt="Wayside Loft Mirissa Guest Experience"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 3. Key Benefits Grid */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4A87A] font-sans">
              Why Guests Love It
            </span>
            <h2 className="font-serif font-medium text-3xl text-[#1A1815]">
              Key Service Benefits
            </h2>
            <p className="text-[#6C6760] font-sans text-sm">
              Designed to give you maximum flexibility and peace of mind during your stay in Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-border/50 shadow-xs space-y-4 hover:border-[#C4A87A]/40 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-[#C4A87A]/10 flex items-center justify-center shrink-0">
                  {b.icon}
                </div>
                <h3 className="font-serif font-semibold text-lg text-[#1A1815]">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6C6760] font-sans leading-relaxed font-light">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. How It Works Step-by-Step */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border/50 shadow-xs space-y-10">
          <div className="text-center max-w-lg mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4A87A] font-sans">
              Step-by-Step
            </span>
            <h2 className="font-serif font-medium text-3xl text-[#1A1815]">
              How It Works
            </h2>
            <p className="text-[#6C6760] font-sans text-sm">
              5 simple steps from request submission to completed service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 font-sans">
            {steps.map((s, idx) => (
              <div key={idx} className="relative space-y-3 text-center sm:text-left">
                <span className="font-serif font-bold text-3xl text-[#C4A87A]/40 block">
                  {s.num}
                </span>
                <h4 className="font-serif font-semibold text-base text-[#1A1815]">
                  {s.title}
                </h4>
                <p className="text-xs text-[#6C6760] leading-relaxed font-light">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Reach Service Request Form Container */}
        <div id="request-form" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4A87A] font-sans">
              Get In Touch
            </span>
            <h2 className="font-serif font-medium text-3xl sm:text-4xl text-[#1A1815] leading-tight">
              Ready to Request the Reach Service?
            </h2>
            <p className="text-[#6C6760] font-sans text-sm leading-relaxed font-light">
              Fill out the form on the right or reach out to us directly on WhatsApp. We will confirm details, check timings, and arrange everything prior to your arrival.
            </p>

            <div className="bg-[#0E0D0B] text-white p-6 rounded-3xl space-y-4">
              <h4 className="font-serif font-semibold text-base text-[#E8D9BE]">
                Direct WhatsApp Contact
              </h4>
              <p className="text-xs text-white/70 font-sans leading-relaxed">
                Prefer chatting directly? Message our Wayside Loft team anytime.
              </p>
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C4A87A] hover:text-white transition-colors"
              >
                <span>+94 760 087 674</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ReachServiceForm />
          </div>
        </div>

      </div>
    </div>
  );
}
