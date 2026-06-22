import Heading from "@/app/_ui/Heading";
import Features from "../Features";
import RoomSlider from "../RoomSlider";
import RoomBookingForm from "../RoomBookingForm";
import RoomDescription from "../RoomDescription";
import Facilities from "../Facilities";
import BookingPolicy from "../BookingPolicy";
import { getRoomById, getRoomImages } from "@/app/_lib/supabase/rooms";
import { notFound, redirect } from "next/navigation";
import { isValid } from "date-fns";
import { bookingSchema } from "@/app/_lib/zodSchemas";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { syncAirbnbForRoom } from "@/app/_lib/supabase/syncAirbnb";

const rawStorageUrl = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL || "";
const SUPABASE_ROOMS_URL = rawStorageUrl
  .replace(".storage.supabase.co/storage/v1/s3", ".supabase.co/storage/v1/object/public/rooms-imgs")
  .replace("/storage/v1/s3", "/storage/v1/object/public/rooms-imgs");

async function RoomContainer({ params, searchParams }) {
  const session = await auth();
  const room_slug = params?.room_slug;
  const range = searchParams?.range ?? "";

  // Parse date range from URL (e.g. "2026-06-14_2026-06-15")
  let initialRange = null;
  if (range) {
    const [arrivalStr, departureStr] = range.split("_");
    const arrival = new Date(arrivalStr);
    const departure = new Date(departureStr);
    if (isValid(arrival) && isValid(departure)) {
      initialRange = { from: arrivalStr, to: departureStr };
    }
  }
  console.log({ room_slug });

  if (!room_slug) notFound();

  const room = await getRoomById(room_slug);

  if (!room) notFound();

  // Sync Airbnb calendar for this room server-side
  if (!global.airbnbSyncCache) {
    global.airbnbSyncCache = {};
  }
  const lastSync = global.airbnbSyncCache[room.id];
  const now = Date.now();
  if (!lastSync || now - lastSync > 1 * 60 * 1000) {
    global.airbnbSyncCache[room.id] = now;
    try {
      await syncAirbnbForRoom(room.id);
    } catch (err) {
      console.error("Server-side Airbnb sync failed:", err);
    }
  }

  const room_images = await getRoomImages(room.id);

  const images = (room_images || []).map(
    (item) => item.img_path?.startsWith("https") ? item.img_path : `${SUPABASE_ROOMS_URL}/${item.img_path}`
  );

  async function bookingAction(prevState, formData) {
    "use server";

    prevState = { ...prevState, isBooking: true };
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const guests_count = parseInt(formData.get("guests_count"));
    const room_id = formData.get("room_id");

    // FORM VALIDATION
    let isValid = true;
    try {
      bookingSchema.parse({ start_date, end_date, guests_count });
    } catch (err) {
      isValid = false;
      err.errors.forEach((element) => {
        prevState[element?.path[0] ?? "unknown"] = element.message;
      });

      return { ...prevState, isBooking: false };
    } finally {
      prevState = { ...prevState, isBooking: false };
    }

    if (isValid) {
      const reservation_cookies = cookies();
      reservation_cookies.set(
        "pending_reservation",
        JSON.stringify({ start_date, end_date, guests_count, room_id }),
        {
          maxAge: 60 * 60 * 2,
          httpOnly: true,
        }
      );

      redirect(`/reservations/checkout`);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <Heading className="text-center mb-8 font-medium tracking-tight text-3xl md:text-4xl text-ink">
        {room.name}
      </Heading>
      <Features room={room} />
      <div className="my-8 md:my-12">
        <RoomSlider images={images} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mt-12 items-start">
        <div className="lg:col-span-2 space-y-12">
          <RoomDescription room={room} />
          <hr className="border-border" />
          <Facilities />
          <hr className="border-border" />
          <BookingPolicy />
        </div>
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <RoomBookingForm
            bookingAction={bookingAction}
            room={room}
            initialRange={initialRange}
            user={session?.user}
          />
        </div>
      </div>
    </div>
  );
}

export default RoomContainer;

