import Heading from "@/app/_ui/Heading";
import RoomCard from "../RoomCard";
import { getAllRooms } from "@/app/_lib/supabase/rooms";

async function Rooms() {
  const rooms = await getAllRooms();
  const displayRooms = rooms?.slice(0, 6) || [];
  return (
    <section className="py-16 md:py-24 bg-ivory-dark/40 border-y border-border">
      <div className="container mx-auto px-4 max-w-7xl">
        <Heading className="text-center mb-3">Luxurious Rooms in Mirissa</Heading>
        <p className="text-center text-muted max-w-3xl mx-auto mb-16 font-sans text-sm md:text-base leading-relaxed">
          Discover our range of <strong className="text-ink font-semibold">comfortable rooms</strong> and <strong className="text-ink font-semibold">stylish accommodation</strong> in Mirissa,
          designed to make your stay truly memorable, whether for a <strong className="text-ink font-semibold">couple</strong>&apos;s retreat or <strong className="text-ink font-semibold">remote work</strong>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayRooms.map((item, index) => (
            <RoomCard key={index} room={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rooms;

