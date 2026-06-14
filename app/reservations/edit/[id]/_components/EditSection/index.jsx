import EditContainer from "../EditContainer";
import { reservationUpdateAction } from "@/app/_lib/actions";

async function EditSection({ reservation }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start py-12 px-4 max-w-7xl mx-auto container">
      <EditContainer reservation={reservation} reservationUpdateAction={reservationUpdateAction} />
    </div>
  );
}

export default EditSection;

