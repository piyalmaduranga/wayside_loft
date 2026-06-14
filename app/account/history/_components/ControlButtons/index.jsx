"use client";
import Modal from "@/app/_components/Modal/Modal";
import ReservationOverview from "../ReservationOverview";
import DeleteForm from "../DeleteFrom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEye } from "@fortawesome/free-solid-svg-icons";

function ControlButtons({ deleteAction, reservation, reservationCancelAction }) {
  return (
    <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto md:h-full">
      <Modal>
        <Modal.ToggleOpen>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-surface border border-ink/20 hover:border-ink text-ink font-sans text-sm font-semibold rounded-full transition-all duration-200 outline-none cursor-pointer w-full md:min-w-[120px]">
            <FontAwesomeIcon icon={faEye} className="text-xs" />
            <span>View details</span>
          </button>
        </Modal.ToggleOpen>
        <Modal.Overlay hideOnLargerScreens={false}>
          <Modal.Wrapper hideOnLargerScreens={false}>
            <ReservationOverview
              reservation={reservation}
              allowDelete={false}
              reservationCancelAction={reservationCancelAction}
              deleteAction={deleteAction}
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
        {reservation.status !== "confirmed" && <DeleteForm deleteAction={deleteAction} />}
      </Modal>
    </div>
  );
}

export default ControlButtons;