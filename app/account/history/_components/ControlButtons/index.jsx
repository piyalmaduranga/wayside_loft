"use client";
import Modal from "@/app/_components/Modal/Modal";
import ReservationOverview from "../ReservationOverview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEye } from "@fortawesome/free-solid-svg-icons";

function ControlButtons({ reservation, reservationCancelAction }) {
  return (
    <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto md:h-full items-center justify-center">
      <Modal>
        <Modal.ToggleOpen>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-ink hover:text-white border border-gold hover:border-ink text-gold font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 outline-none cursor-pointer w-full md:w-auto md:min-w-[140px] shadow-xs hover:shadow-md">
            <FontAwesomeIcon icon={faEye} className="text-xs" />
            <span>View details</span>
          </button>
        </Modal.ToggleOpen>
        <Modal.Overlay hideOnLargerScreens={false}>
          <Modal.Wrapper hideOnLargerScreens={false}>
            <ReservationOverview
              reservation={reservation}
              reservationCancelAction={reservationCancelAction}
            >
              <Modal.ToggleClose>
                <button
                  type="button"
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-ink bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] cursor-pointer border-none outline-none hover:bg-surface hover:scale-105 transition-all duration-200"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-base" />
                </button>
              </Modal.ToggleClose>
            </ReservationOverview>
          </Modal.Wrapper>
        </Modal.Overlay>
      </Modal>
    </div>
  );
}

export default ControlButtons;