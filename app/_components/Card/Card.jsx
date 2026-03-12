import styles from "./styles.module.css";

function Card({ children, className = "" }) {
  // Allow overriding or extending styles via className prop
  return <article className={`${styles.Card} ${className}`}>{children}</article>;
}

function Thumbnail({ zoomOnHover = true, className = "", children }) {
  return (
    <div className={`${styles.thumbnailContainer} ${zoomOnHover ? styles.zoomOnHover : ""} ${className}`}> 
      {children}
    </div>
  );
}

function Description({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

Card.Thumbnail = Thumbnail;
Card.Description = Description;

export default Card;
