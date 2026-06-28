import Image from "next/image";
import Link from "next/link";

const rawStorageUrl = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL || "";
const SUPABASE_ROOMS_URL = rawStorageUrl
  .replace(".storage.supabase.co/storage/v1/s3", ".supabase.co/storage/v1/object/public/rooms-imgs")
  .replace("/storage/v1/s3", "/storage/v1/object/public/rooms-imgs");

function RoomItem({ id, imgPath, price, title, slug, range }) {
  const src = imgPath?.startsWith("https")
    ? imgPath
    : `${SUPABASE_ROOMS_URL}/${imgPath}`;

  const roomHref = range
    ? `/rooms/${slug || id}?range=${range}`
    : `/rooms/${slug || id}`;

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
          <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
            <p className="flex items-baseline gap-1.5">
              <span className="text-[#C4A87A] text-xl font-bold font-sans">${price}</span>
              <span className="text-white/70 text-xs font-medium">/ night</span>
            </p>
            <span className="inline-flex items-center gap-1.5 text-[9px] font-sans font-semibold uppercase tracking-wider text-[#C4A87A] bg-black/45 border border-[#C4A87A]/35 px-2 py-0.5 rounded transition-all duration-300 hover:bg-black/60">
              ☕ Breakfast Included
            </span>
          </div>
        </div>
        <Link
          href={roomHref}
          className="inline-flex items-center justify-center flex-shrink-0 px-7 py-3 bg-[#C4A87A] hover:bg-[#A8895E] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 shadow-sm whitespace-nowrap"
        >
          View Room
        </Link>
      </div>
    </article>
  );
}

export default RoomItem;
