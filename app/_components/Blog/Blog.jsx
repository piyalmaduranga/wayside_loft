import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import Card from "../Card/Card";
import Image from "next/image";
function Blog() {
  return (
    <section className={styles.blogSection}>
      <div className="container">
        <Heading className={styles.heading}>Services</Heading>
        <p className={styles.description}>We offer a range of services to make your stay comfortable and enjoyable.</p>

        <div className={styles.blogGrid}>
          <Card>
            <Card.Thumbnail>
              <Image fill src="/airport-shuttle-1.png" alt="" />
            </Card.Thumbnail>
            <Card.Description className={styles.blogDescriptionContainer}>
              <h2 className={styles.blogHeading}>Airport Transfers</h2>
              <p className={styles.blogLabel}>Reliable and comfortable transportation to and from the airport.</p>
              <p className={styles.blogDescription}>
                Skip the hassle of finding a taxi upon arrival. We offer convenient airport transfers to get you to your
                accommodation quickly and comfortably.
              </p>
            </Card.Description>
          </Card>
          <Card>
            <Card.Thumbnail>
              <Image fill src="/whale-watching.png" alt="" />
            </Card.Thumbnail>
            <Card.Description className={styles.blogDescriptionContainer}>
              <h2 className={styles.blogHeading}>Whale Watching</h2>
              <p className={styles.blogLabel}>Witness the gentle giants of the ocean.</p>
              <p className={styles.blogDescription}>
                Experience the thrill of spotting whales and dolphins in their natural habitat. Our whale watching tours
                offer a unique opportunity to witness these magnificent creatures up close.
              </p>
            </Card.Description>
          </Card>

          <Card>
            <Card.Thumbnail>
              <Image fill src="/yala-safari.png" alt="" />
            </Card.Thumbnail>
            <Card.Description className={styles.blogDescriptionContainer}>
              <h2 className={styles.blogHeading}>Yala Safari</h2>
              <p className={styles.blogLabel}>Explore the wilderness of Sri Lanka.</p>
              <p className={styles.blogDescription}>
                Embark on an unforgettable safari adventure through Yala National Park, home to a diverse range of
                wildlife including elephants, leopards, and diverse bird species.
              </p>
            </Card.Description>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Blog;
