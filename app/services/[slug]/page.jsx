import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "../../_lib/servicesData";
import QRCodeCard from "./_components/QRCodeCard";

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} in Mirissa | Wayside Loft Guest House`,
    description: service.desc,
  };
}

export default function ServiceDetails({ params }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const whatsappMessage = `Hi Wayside Loft, I'm interested in the "${service.title}" service. Could you please share more details, availability, and pricing?`;
  const whatsappUrl = `https://wa.me/94760087674?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/#Blog" 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6C6760] hover:text-[#C4A87A] transition-colors duration-200 font-sans"
          >
            <span className="text-sm">←</span> Back to Services
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left Column: Details & Images */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Hero Image */}
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-sm border border-border/40">
              <Image 
                fill 
                src={service.img} 
                alt={service.alt} 
                className="object-cover"
                priority
              />
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-border/50 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C4A87A] block mb-2 font-sans">
                  {service.label}
                </span>
                <h1 className="font-serif font-medium text-3xl md:text-4xl text-[#1A1815]">
                  {service.title}
                </h1>
              </div>

              <div className="w-16 h-0.5 bg-[#C4A87A]"></div>

              {/* Long Description */}
              <div className="text-[#6C6760] text-sm md:text-base leading-[1.8] space-y-4 whitespace-pre-line font-sans font-light">
                {service.fullDesc}
              </div>

              {/* Service Highlights */}
              <div className="pt-6 border-t border-border/50 space-y-4">
                <h3 className="font-serif font-semibold text-lg text-[#1A1815]">
                  Service Highlights
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {service.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#6C6760] font-sans">
                      <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiries & QR Code */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
            
            {/* Booking & WhatsApp Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-border/50 shadow-xs text-center space-y-5">
              <h3 className="font-serif font-semibold text-lg text-[#1A1815]">
                Inquire & Book
              </h3>
              <p className="text-xs text-[#6C6760] font-sans leading-relaxed">
                Connect directly with our Wayside Loft WhatsApp Business account to ask questions, request custom schedules, and complete your reservation.
              </p>
              
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 bg-[#C4A87A] hover:bg-[#A8895E] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm"
              >
                {/* WhatsApp SVG Icon */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.724-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.966 14.122.942 11.998.942c-5.437 0-9.864 4.371-9.868 9.8.001 1.814.502 3.59 1.451 5.158L2.613 21.33l5.59-1.455c.002-.001.002-.001.044-.021zM17.48 14.65c-.302-.152-1.793-.883-2.073-.984-.282-.102-.487-.152-.692.152-.205.304-.795.984-.974 1.186-.18.203-.36.228-.662.076-1.566-.783-2.584-1.378-3.611-2.148-.82-.618-1.517-1.332-1.929-2.043-.18-.305-.019-.47.132-.621.136-.137.302-.355.454-.533.151-.178.202-.304.302-.508.101-.203.05-.38-.025-.532-.075-.152-.693-1.67-.949-2.28-.25-.6-.525-.52-.722-.53-.186-.01-.399-.01-.612-.01-.213 0-.56.08-.853.406-.293.324-1.12 1.09-1.12 2.659 0 1.57 1.144 3.09 1.304 3.3 1.6 2.1 3.099 3.2 4.979 3.82.912.3 1.81.35 2.47.25.75-.11 2.29-.93 2.61-1.83.32-.9 0-1.67-.1-1.83-.1-.15-.3-.23-.6-.38z" />
                </svg>
                <span>Book Service</span>
              </a>
            </div>

            {/* Service Details Table Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-border/50 shadow-xs space-y-4">
              <h4 className="font-serif font-semibold text-base text-[#1A1815] pb-2 border-b border-border/30">
                Quick Specifications
              </h4>
              <div className="space-y-3 font-sans text-xs">
                {service.details.map((d, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span className="text-muted font-light">{d.key}</span>
                    <span className="text-[#1A1815] font-semibold text-right max-w-[160px]">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Code Dynamic Card */}
            <QRCodeCard />

          </div>

        </div>
      </div>
    </div>
  );
}
