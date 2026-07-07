"use client";

import Accordion from "../Accordion";

const faqs = [
  {
    question: "How can I book a guest house or hotel stay in Mirissa?",
    answer: "You can easily book online directly at Wayside Loft. We offer a simple 'Book Now, Pay on Arrival' reservation system with instant confirmation. There are no pre-payment fees required.",
  },
  {
    question: "Do you arrange whale watching excursions in Mirissa?",
    answer: "Yes! Whale watching is one of the most popular ocean experiences in Mirissa. Wayside Loft can arrange whale watching tours for you to spot blue whales, sperm whales, and dolphins in their natural habitat.",
  },
  {
    question: "Is scooter renting available at Wayside Loft in Mirissa?",
    answer: "Yes, we offer convenient scooter renting directly from our boutique guest house. Scooter renting is the easiest and most affordable way to travel around Mirissa beach, Weligama, and surrounding coastal points.",
  },
  {
    question: "What amenities are included in the room price?",
    answer: "Every booking includes a delicious fresh breakfast, high-speed Wi-Fi, air conditioning, daily room cleaning, clean linens, towels, and work-friendly desk spaces.",
  },
  {
    question: "Do you offer airport transfers to Mirissa?",
    answer: "Yes, we provide reliable airport transfer shuttles between Bandaranaike International Airport (CMB) and Wayside Loft guest house, ensuring a comfortable and stress-free journey.",
  },
];

function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C4A87A] mb-3">
            Common Questions
          </p>
          <h2 className="font-serif font-medium text-3xl md:text-4xl text-[#1A1815] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#6C6760] text-base max-w-md mx-auto leading-relaxed">
            Everything you need to know about your stay, scooter rentals, and tours in Mirissa.
          </p>
        </div>

        {/* Accordions */}
        <div className="border-t border-border">
          {faqs.map((faq, index) => (
            <Accordion key={index} label={faq.question}>
              <p>{faq.answer}</p>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
