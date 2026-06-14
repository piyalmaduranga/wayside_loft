"use client";

import Slider from "../Slider";
import BookingForm from "../BookingForm";
import BookingButton from "../BookingButton";
import Modal from "@/app/_components/Modal/Modal";

const images = ["/bg.png", "/bg.png", "/bg.png", "/bg.png"];

function HeroSection({ bookingSearchAction }) {
  return (
    <Slider images={images} showArrows={false}>
      <div className="container min-h-screen md:h-full flex flex-col justify-center md:flex-row md:justify-between items-center gap-10 md:gap-16 relative z-30">

        {/* Hero text */}
        <div className="text-white text-center md:text-left flex flex-col items-center md:items-start justify-center flex-1 max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#E8D9BE] font-semibold mb-3">
            Mirissa, Sri Lanka
          </p>

          <h1 className="font-serif font-medium text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
            Wayside Loft Mirissa
          </h1>

          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-2 max-w-sm">
            Experience a Serene Escape and Productive Remote Work Environment
          </p>

          <p className="text-[#E8D9BE] text-sm font-medium">
            Book Now · Pay On Arrival
          </p>

          {/* Mobile CTA */}
          <div className="mt-8 md:hidden flex justify-center w-full">
            <Modal>
              <Modal.ToggleOpen>
                <BookingButton />
              </Modal.ToggleOpen>

              <Modal.Overlay>
                <Modal.Wrapper>
                  <BookingForm bookingSearchAction={bookingSearchAction}>
                    <div className="mt-2">
                      <Modal.ToggleClose>
                        <button
                          type="button"
                          className="w-full py-3 rounded-full border border-white/30 text-white/80 text-sm font-medium hover:bg-white/10 transition-colors"
                        >
                          Cancel
                        </button>
                      </Modal.ToggleClose>
                    </div>
                  </BookingForm>
                </Modal.Wrapper>
              </Modal.Overlay>
            </Modal>
          </div>
        </div>

        {/* Booking form — desktop only */}
        <div className="hidden md:block w-full md:w-[400px] shrink-0">
          <BookingForm bookingSearchAction={bookingSearchAction} />
        </div>
      </div>
    </Slider>
  );
}

export default HeroSection;