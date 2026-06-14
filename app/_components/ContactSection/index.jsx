import Heading from "@/app/_ui/Heading";
import ContactForm from "../ContactForm";
import ContactMap from "../ContactMap";
import { contactAction } from "@/app/_lib/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ContactSection() {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1px_1fr]">

            {/* Contact info */}
            <div className="flex flex-col gap-10 p-8 md:p-10">
              <div className="flex flex-col items-center text-center gap-2">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/15 text-gold text-lg">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <h3 className="font-serif font-semibold text-ink text-base">Address</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Mirissa, Matara District
                  <br />
                  Southern Province, Sri Lanka
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/15 text-gold text-lg">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <h3 className="font-serif font-semibold text-ink text-base">Phone</h3>
                <p className="text-muted text-sm leading-relaxed">
                  +94 77 123 4567
                  <br />
                  +94 71 987 6543
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/15 text-gold text-lg">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <h3 className="font-serif font-semibold text-ink text-base">Email</h3>
                <p className="text-muted text-sm leading-relaxed">
                  hello@waysideloft.com
                  <br />
                  bookings@waysideloft.com
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block bg-border" />

            {/* Form */}
            <div className="p-8 md:p-10 flex flex-col gap-2">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink">
                Send Us a Message
              </h2>
              <p className="text-muted text-sm leading-relaxed max-w-xl mb-4">
                Have a question about your stay, availability, or anything else? Fill in the
                form below and we&apos;ll get back to you as soon as possible.
              </p>

              <ContactForm contactAction={contactAction} />

              {/* <div className="h-[300px] rounded-lg overflow-hidden shadow-sm border border-border relative mt-8">
                <ContactMap />
              </div> */}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

