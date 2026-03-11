import { Suspense } from "react";
import RoomContainer from "./_components/RoomContainer";
import LoadingSpinner from "@/app/_ui/LoadingSpinner";

import { getRoomById } from "@/app/_lib/supabase/rooms";

export async function generateMetadata({ params }) {
  const room = await getRoomById(params.room_slug);

  if (!room) {
    return {
      title: "Room Not Found",
    };
  }

  return {
    title: `${room.name} | Wayside Loft Mirissa`,
    description: `Book the ${room.name} at Wayside Loft in Mirissa. Our ${room.capacity}-person room is perfect for couples and remote workers. Experience the best accommodation in Mirissa.`,
  };
}

function RoomDetails({ params }) {
  return (
    <section className="container">
      <Suspense
        fallback={
          <div className="global-loading">
            <LoadingSpinner />
          </div>
        }
      >
        <RoomContainer params={params} />
      </Suspense>
    </section>
  );
}

export default RoomDetails;
