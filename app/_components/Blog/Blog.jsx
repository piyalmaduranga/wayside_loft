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
              <Image fill src="/airport-shuttle-1.png" alt="Airport Transfers Mirissa" />
            </Card.Thumbnail>
            <Card.Description className={styles.blogDescriptionContainer}>
              <h2 className={styles.blogHeading}>Airport Transfers</h2>
              <p className={styles.blogLabel}>Reliable and comfortable transportation to and from Mirissa.</p>
              <p className={styles.blogDescription}>
                Travel with ease. We offer convenient transfers between the airport and your <strong>accommodation in Mirissa</strong>, ensuring a smooth and hassle-free journey.
              </p>
            </Card.Description>
          </Card>
          <Card>
            <Card.Thumbnail>
              <Image fill src="/whale-watching.png" alt="Whale Watching in Mirissa" />
            </Card.Thumbnail>
            <Card.Description className={styles.blogDescriptionContainer}>
              <h2 className={styles.blogHeading}>Whale Watching in Mirissa</h2>
              <p className={styles.blogLabel}>Witness the gentle giants of the ocean in Sri Lanka.</p>
              <p className={styles.blogDescription}>
                Experience the thrill of <strong>whale watching in Mirissa</strong>, one of the best places in the world to spot blue whales and dolphins in their natural habitat.
              </p>
            </Card.Description>
          </Card>

          <Card>
            <Card.Thumbnail>
              <Image fill src="/yala-safari.png" alt="Yala Safari from Mirissa" />
            </Card.Thumbnail>
            <Card.Description className={styles.blogDescriptionContainer}>
              <h2 className={styles.blogHeading}>Yala Safari Tours</h2>
              <p className={styles.blogLabel}>Explore the wilderness of Sri Lanka from Mirissa.</p>
              <p className={styles.blogDescription}>
                Embark on an unforgettable safari adventure through Yala National Park, arranged directly from our <strong>guest house in Mirissa</strong>. Spot elephants, leopards, and diverse bird species.
              </p>
            </Card.Description>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Blog;
