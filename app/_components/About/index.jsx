import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import Image from "next/image";

function About() {
  return (
    <section className={styles.aboutSection}>
      <div className={`container ${styles.aboutContainer}`}>
        <div className={styles.description}>
          <Heading>About Us</Heading>
          <p>
            Nestled amidst the lush greenery of Mirissa, Wayside Loft offers a tranquil escape where nature meets comfort.
            Our boutique villa combines modern amenities with a serene environment, providing the perfect backdrop for
            your Sri Lankan adventure. Whether you're here to relax on the beach or explore the island's vibrant culture,
            we're dedicated to making your stay unforgettable.
          </p>
        </div>
        <div className={styles.gallery}>
          <div>
            <Image fill src="/bg.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
