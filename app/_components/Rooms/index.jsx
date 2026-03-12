import Heading from "@/app/_ui/Heading";

import styles from "./styles.module.css";
import RoomCard from "../RoomCard";
import { getAllRooms } from "@/app/_lib/supabase/rooms";

async function Rooms() {
  const rooms = await getAllRooms();
  rooms.length = 6;
  return (
    <section className={styles.roomsSection}>
      <div className="container">
        <Heading className="text-center">Luxurious Rooms in Mirissa</Heading>
        <p className="text-center">
          Discover our range of <strong>comfortable rooms</strong> and <strong>stylish accommodation</strong> in Mirissa,
          designed to make your stay truly memorable, whether for a <strong>couple</strong>&apos;s retreat or <strong>remote work</strong>.
        </p>
        <div className={styles.roomsGrid}>
          {rooms.map((item, index) => (
            <RoomCard key={index} room={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rooms;
