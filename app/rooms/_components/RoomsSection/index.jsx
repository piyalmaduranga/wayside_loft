import { filterRoomsByDate, getAllRooms } from "@/app/_lib/supabase/rooms";
import RoomItem from "../RoomItem";
import { isValid } from "date-fns";

async function RoomsSection({ filter, range }) {
  const rooms = await getAllRooms();
  console.log("rooms", { rooms: rooms.length });

  let filteredRooms = rooms;

  if (
    range &&
    isValid(new Date(range.split("_")?.at(0))) &&
    isValid(new Date(range.split("_")?.at(1)))
  ) {
    const arrivalDate = range.split("_")?.at(0);
    const departureDate = range.split("_")?.at(1);
    filteredRooms = await filterRoomsByDate(arrivalDate, departureDate);
  }

  switch (filter) {
    case "high-price":
      filteredRooms = filteredRooms.sort((a, b) => b.price - a.price);
      break;
    case "low-price":
      filteredRooms = filteredRooms.sort((a, b) => a.price - b.price);
      break;
    case "min-guests":
      filteredRooms = filteredRooms.sort((a, b) => b.capacity - a.capacity);
      break;
    case "max-guests":
      filteredRooms = filteredRooms.sort((a, b) => a.capacity - b.capacity);
      break;
    default:
      break;
  }

  if (!filteredRooms.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-[#6C6760] text-lg">No rooms available for the selected dates.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRooms.map((item) => (
        <RoomItem
          key={item.id}
          id={item.id}
          slug={item.slug}
          title={item.name}
          price={item.price}
          imgPath={item.thumbnail}
          range={range}
        />
      ))}
    </div>
  );
}

export default RoomsSection;
