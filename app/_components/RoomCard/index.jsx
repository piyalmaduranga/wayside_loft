import Image from "next/image";
import styles from "./styles.module.css";
import Card from "../Card/Card";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

function RoomCard({ room }) {
  return (
    <Card>
      <Card.Thumbnail>
        <Image fill src={room.thumbnail?.startsWith("https") ? room.thumbnail : `${SUPABASE_ROOMS_URL}/${room.thumbnail}`} unoptimized={room.thumbnail?.startsWith("http")} alt="" />
      </Card.Thumbnail>

      <Card.Description className={styles.roomDescription}>
        <h2>{room.name}</h2>

        <details className={styles.details}>
          <summary className={styles.summary}>
            <p className={styles.descriptionClamp}>{room.description}</p>
            <span className={styles.viewMore}>View more</span>
          </summary>
          <p className={styles.fullDescription}>{room.description}</p>
        </details>
      </Card.Description>
    </Card>
  );
}

export default RoomCard;
