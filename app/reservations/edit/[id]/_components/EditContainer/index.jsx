"use client";
import { useCallback, useState } from "react";
import CheckoutOverview from "../CheckoutOverview";
import ReservationForm from "../ReservationForm";

import FormDayPicker from "@/app/rooms/[room_slug]/_components/FormDayPicker";
import { formatISO, addDays } from "date-fns";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

const parseLocalDate = (dateStr) => {
  if (!dateStr) return undefined;
  if (dateStr instanceof Date) return dateStr;
  const cleanStr = dateStr.split("T")[0];
  const parts = cleanStr.split("-").map(Number);
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return new Date(year, month - 1, day);
  }
  return undefined;
};

const initialState = {};

function EditContainer({ reservation, reservationUpdateAction }) {
  const [state, formAction] = useFormState(reservationUpdateAction, initialState);

  const [startDate, setStartDate] = useState(reservation.start_date ? formatISO(new Date(reservation.start_date), { representation: "date" }) : "");
  const [endDate, setEndDate] = useState(reservation.end_date ? formatISO(new Date(reservation.end_date), { representation: "date" }) : "");
  const [guests, setGuests] = useState(reservation.guests_count);


  const handleDateSelection = useCallback((range) => {
    console.log(range);
    if (!range) return;

    const from = range.from ? formatISO(range.from, { representation: "date" }) : "";
    const to = range.to ? formatISO(range.to, { representation: "date" }) : "";

    console.log(from, to);
    setStartDate(from);
    setEndDate(to);
  }, []);

  async function handleSubmit() {
    if (!startDate || !endDate) {
      toast.error("Please select both check-in and check-out dates.");
      return;
    }
    const reservationFormData = new FormData();
    reservationFormData.set("start_date", startDate);
    reservationFormData.set("end_date", endDate);
    reservationFormData.set("guests", guests);
    reservationFormData.set("reservation_id", reservation.id);

    await formAction(reservationFormData);
  }

  if (state.status === "success") toast.success("Your reservation has been updated!");
  else if (state.error) toast.error(state.error);

  return (
    <>
      <div className="order-2 lg:order-1 lg:col-span-2">
        <ReservationForm
          handleDateSelection={handleDateSelection}
          capacity={reservation.rooms.capacity}
          setGuests={setGuests}
          guests={guests}
          handleSubmit={handleSubmit}
        >
          <FormDayPicker roomId={reservation.room_id} handleDateSelection={handleDateSelection} start={parseLocalDate(startDate)} end={parseLocalDate(endDate)} />
        </ReservationForm>
      </div>
      <div className="order-1 lg:order-2 lg:col-span-1 lg:sticky lg:top-24">
        <CheckoutOverview reservation={reservation} start={startDate} end={endDate} guests={guests} />
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}

export default EditContainer;

