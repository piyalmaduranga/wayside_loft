import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faDollarSign, faUsers } from "@fortawesome/free-solid-svg-icons";

function Features({ room }) {
  const stats = [
    { icon: faBed, label: "Sleeps", value: `${room.sleeps || 2} Adults` },
    { icon: faUsers, label: "Capacity", value: `${room.capacity} Guests` },
    { icon: faDollarSign, label: "From", value: `$${room.price} / night` },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-6 border-y border-border">
      {stats.map(({ icon, label, value }) => (
        <div key={label} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-muted flex items-center justify-center">
            <FontAwesomeIcon icon={icon} className="text-gold text-sm" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider text-muted font-sans font-semibold mb-0.5 leading-none">
              {label}
            </p>
            <p className="text-ink font-semibold text-sm font-sans">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Features;

