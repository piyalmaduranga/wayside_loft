import Image from "next/image";
import Card, { Description } from "@/app/_components/Card/Card";
import Badge from "@/app/_ui/Badge";
import { auth } from "@/auth";
import { deleteReservation, getReservationByID } from "@/app/_lib/supabase/reservations";
import { revalidatePath } from "next/cache";
import ControlButtons from "../ControlButtons";
import { reservationCancelAction, reservationUpdateAction } from "@/app/_lib/actions";
import { formatToAbrFormat } from "@/app/utils/datetime";
import { isFuture, isPast } from "date-fns";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

function ReservationCard({ reservation }) {
  async function deleteReservationAction(prevState, formData) {
    "use server";

    prevState = {};
    const session = await auth();
    const active_user = session?.user;

    if (!active_user) return { ...prevState, error: "unauthorized action, please authenticate and try again" };

    const targeted_reservation = await getReservationByID(reservation.id);

    if (targeted_reservation.status === "confirmed")
      return { ...prevState, error: "Cannot delete active reservations! You may want to cancel it instead" };

    if (targeted_reservation.guest_id !== active_user.id) return { ...prevState, error: "unauthorized action!" };

    await deleteReservation(session.supabaseAccessToken, reservation.id);
    revalidatePath("/account/history");

    return { ...prevState, status: "success" };
  }

  const arrivalDate = formatToAbrFormat(reservation.start_date);
  const departureDate = formatToAbrFormat(reservation.end_date);
  const thumbnail = reservation.rooms?.thumbnail ?? "";

  return (
    <Card className="flex flex-col md:flex-row bg-white border border-border rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden">
      <div className="relative aspect-[16/10] md:aspect-square md:w-56 shrink-0 bg-ivory-dark">
        <Image
          fill
          src={
            thumbnail && thumbnail.startsWith("https")
              ? thumbnail
              : `${SUPABASE_ROOMS_URL}/${thumbnail}`
          }
          unoptimized={thumbnail.startsWith("http")}
          alt={reservation.rooms?.name || "Room thumbnail"}
          className="object-cover"
        />
      </div>

      <Description className="p-6 flex flex-col md:flex-row justify-between flex-grow gap-6 text-left">
        <div className="flex flex-col justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h2 className="font-serif text-lg font-semibold text-ink">
                {reservation.rooms?.name ?? "Room"}
              </h2>

              {isPast(reservation.start_date) && isFuture(reservation.end_date) ? (
                <span className="text-[10px] font-sans font-semibold tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                  Ongoing
                </span>
              ) : isFuture(reservation.start_date) ? (
                <span className="text-[10px] font-sans font-semibold tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 uppercase">
                  Upcoming
                </span>
              ) : isPast(reservation.end_date) ? (
                <span className="text-[10px] font-sans font-semibold tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 uppercase">
                  Past
                </span>
              ) : null}
            </div>

            <p className="text-sm font-sans text-muted">
              {arrivalDate} — {departureDate}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-sans">
            <span className="text-ink font-bold text-base">${reservation.reserved_price.toFixed(2)}</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{reservation.guests_count} {reservation.guests_count === 1 ? 'guest' : 'guests'}</span>
          </div>

          <Badge
            type={
              reservation.status === "unconfirmed"
                ? "warning"
                : reservation.status === "canceled" || reservation.status === "finished"
                  ? "danger"
                  : "success"
            }
            className="rounded-full"
          >
            {reservation.status}
          </Badge>
        </div>

        <div className="flex flex-col justify-end md:items-end w-full md:w-auto">
          <ControlButtons
            reservationUpdateAction={reservationUpdateAction}
            deleteAction={deleteReservationAction}
            reservation={reservation}
            reservationCancelAction={reservationCancelAction}
          />
        </div>
      </Description>
    </Card>
  );
}

export default ReservationCard;