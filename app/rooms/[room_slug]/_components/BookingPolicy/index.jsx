import Accordion from "@/app/_components/Accordion";
import Heading from "@/app/_ui/Heading";

import styles from "./styles.module.css";

function BookingPolicy() {
  return (
    <section className={styles.BookingPolicySection}>
      <Heading className="text-center">Booking Policy</Heading>

      <hr className="decriptionDivider" />

      <div className={styles.accordion}>
        <Accordion className={styles.accordionItem} label={"Check-in & Check-out Times"}>
          <p>
            <strong>Check-in:</strong> Detailed instructions for check-in will be provided prior to your arrival. Standard check-in time is from 2:00 PM onwards. Early check-in is subject to availability.
          </p>
          <p>
            <strong>Check-out:</strong> Standard check-out time is by 11:00 AM. Late check-out may be arranged upon request, subject to availability and possible additional charges.
          </p>
        </Accordion>

        <Accordion className={styles.accordionItem} label={"Payment & Reservation Policy"}>
          <p>
            <strong>Book Now, Pay on Arrival:</strong> To make your booking process as smooth as possible, we do not require upfront payment online. You can reserve your room now and pay the full amount upon arrival at the property.
          </p>
          <p>
            We accept cash and major credit/debit cards at the reception.
          </p>
        </Accordion>

        <Accordion className={styles.accordionItem} label={"Cancellation Policy"}>
          <p>
            We understand that travel plans can change. You can cancel or modify your reservation free of charge up to 72 hours before your scheduled arrival date.
          </p>
          <p>
            For cancellations made within 72 hours of arrival, or in the case of a no-show, we kindly ask that you inform us as early as possible so we may accommodate other guests.
          </p>
        </Accordion>

        <Accordion className={styles.accordionItem} label={"House Rules & Additional Information"}>
          <p>
            <strong>Smoking:</strong> Wayside Loft maintains a strict no-smoking policy inside the rooms. Smoking is only permitted in designated outdoor areas.
          </p>
          <p>
            <strong>Pets:</strong> While we love animals, we unfortunately do not allow pets on the premises to ensure the comfort of all our guests.
          </p>
          <p>
            <strong>Quiet Hours:</strong> To ensure a peaceful stay for everyone, please be mindful of noise levels between 10:00 PM and 7:00 AM.
          </p>
        </Accordion>
      </div>
    </section>
  );
}

export default BookingPolicy;
