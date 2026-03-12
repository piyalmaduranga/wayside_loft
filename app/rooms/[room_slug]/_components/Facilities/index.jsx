import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
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
import Heading from "@/app/_ui/Heading";

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
    <div className={styles.facilitiesSection}>
      <Heading className="text-center">Facilities</Heading>
      <hr className="decriptionDivider" />
      <div className={styles.facilitiesGrid}>
        {amenities.map((item, index) => (
          <div key={index} className={styles.facilityItem}>
            <FontAwesomeIcon className={styles.facilitiyIcon} icon={item.icon} />
            <div className={styles.facilityContent}>
              <h3 className={styles.facilityName}>{item.name}</h3>
              {item.desc && <p className={styles.facilityDesc}>{item.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Facilities;
