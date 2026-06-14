function RoomDescription({ room }) {
  return (
    <div className="py-6 text-left">
      <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-gold mb-2">
        About This Room
      </p>
      <h3 className="font-serif font-semibold text-2xl text-ink mb-4">
        Description
      </h3>
      <p className="text-muted text-sm md:text-base leading-relaxed font-sans whitespace-pre-line">
        {room?.description}
      </p>
    </div>
  );
}

export default RoomDescription;

