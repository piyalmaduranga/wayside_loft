"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const rawStorageUrl = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL || "";
const SUPABASE_ROOMS_URL = rawStorageUrl
  .replace(".storage.supabase.co/storage/v1/s3", ".supabase.co/storage/v1/object/public/rooms-imgs")
  .replace("/storage/v1/s3", "/storage/v1/object/public/rooms-imgs");

function RoomCard({ room }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const imageUrl = room.thumbnail?.startsWith("https")
    ? room.thumbnail
    : `${SUPABASE_ROOMS_URL}/${room.thumbnail}`;

  return (
    <Link href={`/rooms/${room.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <Image
          fill
          src={imageUrl}
          unoptimized={room.thumbnail?.startsWith("http")}
          alt={room.name}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Favorite (heart) button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorited((prev) => !prev);
          }}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-3 right-3 z-10 outline-none"
        >
          <svg
            viewBox="0 0 32 32"
            className={`w-6 h-6 drop-shadow-md transition-transform duration-150 active:scale-90 ${isFavorited ? "fill-rose-500 stroke-rose-500" : "fill-black/30 stroke-white"
              }`}
            strokeWidth="2"
          >
            <path d="M16 28c7-4.5 13-9.5 13-16a7 7 0 0 0-13-3.5A7 7 0 0 0 3 12c0 6.5 6 11.5 13 16z" />
          </svg>
        </button>

        {/* Optional badge, e.g. "Guest favorite" */}
        {room.badge && (
          <div className="absolute top-3 left-3 bg-white text-charcoal text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {room.badge}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="mt-3 flex flex-col gap-0.5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-serif text-base font-medium text-ink truncate">
            {room.name}
          </h2>

          {room.rating && (
            <div className="flex items-center gap-1 shrink-0 text-sm text-ink">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-ink">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>{room.rating}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted">
          {room.capacity} guests · {room.size || "32m²"}
        </p>

        <p className="mt-1.5 flex items-baseline gap-1">
          <span className="text-lg font-bold text-[#C4A87A] font-sans">${room.price}</span>
          <span className="text-muted text-xs">/ night</span>
        </p>
      </div>
    </Link>
  );
}

export default RoomCard;