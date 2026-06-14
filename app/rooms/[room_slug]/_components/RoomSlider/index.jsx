import Slider from "@/app/_components/Slider";

function RoomSlider({ images }) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-sm">
      <Slider images={images} imgPriority={true} />
    </div>
  );
}

export default RoomSlider;

