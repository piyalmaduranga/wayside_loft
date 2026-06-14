import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faSnowflake,
  faBed,
  faSoap,
  faFan,
  faBroom,
  faBox,
  faUtensils,
  faLaptop,
  faChair,
  faSpoon,
  faCouch,
  faParking,
  faWind,
  faShower,
  faMugHot,
  faSink,
  faCalendarCheck,
  faSuitcaseRolling,
  faMoon,
  faBath
} from "@fortawesome/free-solid-svg-icons";

const amenities = [
  { name: "Air conditioning", icon: faSnowflake, desc: "A system that cools and controls the humidity" },
  { name: "Bed linens", icon: faBed, desc: "Cotton" },
  { name: "Body soap", icon: faSoap, desc: "" },
  { name: "Ceiling fan", icon: faFan, desc: "" },
  { name: "Cleaning available", icon: faBroom, desc: "Saturday, Sunday" },
  { name: "Clothing storage", icon: faBox, desc: "Wardrobe" },
  { name: "Cooking basics", icon: faUtensils, desc: "Pots, pans, oil, salt, pepper" },
  { name: "Dedicated workspace", icon: faLaptop, desc: "Desk & power source" },
  { name: "Dining table", icon: faChair, desc: "1 space" },
  { name: "Dishes and silverware", icon: faSpoon, desc: "Plates, bowls, cups, cutlery" },
  { name: "Extra pillows & blankets", icon: faCouch, desc: "" },
  { name: "Free parking", icon: faParking, desc: "On-site, free of charge" },
  { name: "Freezer", icon: faSnowflake, desc: "" },
  { name: "Hair dryer", icon: faWind, desc: "" },
  { name: "Hot water", icon: faShower, desc: "Sink and shower" },
  { name: "Hot water kettle", icon: faMugHot, desc: "" },
  { name: "Kitchen", icon: faSink, desc: "Refrigerator, oven, stovetop" },
  { name: "Kitchenette", icon: faUtensils, desc: "Refrigerate and heat up food" },
  { name: "Long term stays", icon: faCalendarCheck, desc: "28 days or longer" },
  { name: "Luggage dropoff", icon: faSuitcaseRolling, desc: "Before/after check-in" },
  { name: "Refrigerator", icon: faSnowflake, desc: "abans" },
  { name: "Room-darkening shades", icon: faMoon, desc: "" },
  { name: "Shower gel", icon: faBath, desc: "" },
  { name: "Wifi", icon: faWifi, desc: "Wireless internet access" },
];

function Facilities() {
  return (
    <div className="py-8 text-left">
      <h3 className="font-serif text-2xl font-semibold text-ink mb-6">What this place offers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {amenities.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <FontAwesomeIcon className="text-gold w-5 h-5 mt-1 shrink-0" icon={item.icon} />
            <div className="flex flex-col">
              <span className="text-sm font-sans font-medium text-ink">{item.name}</span>
              {item.desc && <span className="text-xs text-muted font-sans font-light mt-0.5">{item.desc}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Facilities;

