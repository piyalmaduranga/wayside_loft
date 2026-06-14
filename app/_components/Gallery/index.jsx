import Heading from "@/app/_ui/Heading";
import Image from "next/image";
import { getAllRooms } from "@/app/_lib/supabase/rooms";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

async function Gallery() {
  const rooms = await getAllRooms();
  const galleryItems = rooms.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-surface border-b border-border">
      <div className="container mx-auto px-4 max-w-7xl">
        <Heading className="text-center mb-3">Our Gallery</Heading>
        <p className="text-center text-muted max-w-2xl mx-auto mb-12 font-sans text-sm md:text-base leading-relaxed">
          Take a visual tour of Wayside Loft, featuring our beautifully curated spaces, modern design, and the tranquil surroundings of Mirissa.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => {
            const imageUrl = item.thumbnail?.startsWith("https") 
              ? item.thumbnail 
              : `${SUPABASE_ROOMS_URL}/${item.thumbnail}`;

            return (
              <div 
                key={item.id} 
                className={`group relative overflow-hidden rounded-md shadow-sm aspect-[4/3] bg-ivory-dark transition-all duration-500 hover:shadow-md ${
                  index === 0 ? "md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[400px]" : ""
                }`}
              >
                <Image
                  fill
                  src={imageUrl}
                  unoptimized={item.thumbnail?.startsWith("http")}
                  alt={`${item.name} - Accommodation in Mirissa`}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-gold font-sans text-xs uppercase tracking-wider block mb-1">Wayside Loft</span>
                  <h3 className="text-white font-serif text-lg font-medium">{item.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Gallery;

