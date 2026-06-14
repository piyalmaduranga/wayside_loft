import Image from "next/image";
import Link from "next/link";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

function RoomItem({ id, imgPath, price, title, slug }) {
  const src = imgPath?.startsWith("https")
    ? imgPath
    : `${SUPABASE_ROOMS_URL}/${imgPath}`;

  return (
    <article className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,24,21,0.08)] border border-[rgba(26,24,21,0.06)] bg-[#F0EDE5]">
      {/* Room image */}
      <Image
        fill
        src={src}
        alt={title}
        unoptimized={imgPath?.startsWith("http")}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,13,11,0.75)] via-[rgba(14,13,11,0.2)] to-transparent" />

      {/* Content */}
      <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-white font-serif font-medium text-lg leading-tight mb-0.5">
            {title}
          </h2>
          <p className="text-[#E8D9BE] text-[13px] font-medium">
            From ${price} / night
          </p>
        </div>
        <Link
          href={`/rooms/${slug || id}`}
          className="inline-flex items-center justify-center flex-shrink-0 px-7 py-3 bg-[#C4A87A] hover:bg-[#A8895E] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 shadow-sm whitespace-nowrap"
        >
          View Room
        </Link>
      </div>
    </article>
  );
}

export default RoomItem;
