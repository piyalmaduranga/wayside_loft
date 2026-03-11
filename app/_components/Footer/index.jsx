import Link from "next/link";
import styles from "./styles.module.css";
import NewsletterForm from "./NewsletterForm";

function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={`${styles.footerMenu} container`}>
        <div>
          <h3>About Wayside Loft</h3>
          <p style={{ maxWidth: '300px', fontSize: '14px', lineHeight: '1.6', color: '#666' }}>
            Wayside Loft is a premium <strong>guest house in Mirissa</strong>, offering <strong>comfortable rooms</strong> and a <strong>work-friendly</strong> environment for travelers. Experience the best of <strong>Mirissa accommodation</strong> with us.
          </p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <ul>
            <li>piyaluom@gmail.com</li>
            <li>+94760087674</li>
            <li>Wayside Loft, Yatipila Road, Mirissa</li>
            <li className={styles.icons}></li>
          </ul>
        </div>

        <div>
          <h3>Link Menu</h3>
          <ul>
            <li>
              <Link href="/">Homepage</Link>
            </li>
            <li>
              <Link href="/rooms">Rooms</Link>
            </li>

            {/* <li>Blog</li> */}
            <li>
              <Link href={"/contact"}>Contact Us</Link>
            </li>

            <li>
              <Link href="/signin">Guest Area</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Subscribe To Our Newsletter</h3>
          <NewsletterForm className={styles.newsletter} />
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
