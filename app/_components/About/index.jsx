import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import Image from "next/image";

function About() {
  return (
    <section className={styles.aboutSection}>
      <div className={`container ${styles.aboutContainer}`}>
        <div className={styles.description}>
          <Heading>About Wayside Loft Mirissa</Heading>
          <p>
            Nestled amidst the lush greenery of Mirissa, <strong>Wayside Loft</strong> offers a tranquil escape where nature meets comfort.
            As a premier <strong>guest house in Mirissa</strong>, we specialize in providing <strong>comfortable rooms</strong> for travelers
            seeking a serene environment. Our boutique villa is <strong>remote work friendly</strong> and perfect for digital nomads,
            offering high-speed internet and quiet spaces for <strong>remote work</strong>.
          </p>
          <p>
            Whether you&apos;re here as a <strong>couple</strong> seeking a romantic getaway or to experience the thrill of
            <strong>whale watching in Mirissa</strong>, our location and <strong>modern accommodation</strong> provide the
            perfect backdrop for your Sri Lankan adventure.
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
