"use client";
import { createPortal } from "react-dom";
import { useState, createContext, cloneElement, useContext, useEffect } from "react";

const ModalContext = createContext();

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return <ModalContext.Provider value={{ isOpen, open, close }}>{children}</ModalContext.Provider>;
}

function Overlay({ hideOnLargerScreens = true, children }) {
  const { isOpen } = useContext(ModalContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  if (!isOpen) return null;

  return createPortal(
    <div className={`fixed inset-0 backdrop-blur-sm bg-black/40 z-[99999] ${hideOnLargerScreens ? "min-[820px]:hidden" : ""}`}>
      {children}
    </div>,
    document.body
  );
}

function Heading({ children }) {
  return <h2 className="text-xl font-serif font-medium mb-4 text-[#1A1815]">{children}</h2>;
}

function ToggleOpen({ children }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: open });
}

function Wrapper({ hideOnLargerScreens = true, children }) {
  return (
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[420px] p-6 bg-[#F8F6F1] rounded-lg shadow-xl border border-neutral-200 flex flex-col ${hideOnLargerScreens ? "min-[820px]:hidden" : ""}`}>
      {children}
    </div>
  );
}

function ToggleClose({ children }) {
  const { close } = useContext(ModalContext);
  return cloneElement(children, { onClick: close });
}

Modal.Heading = Heading;
Modal.ToggleOpen = ToggleOpen;
Modal.Wrapper = Wrapper;
Modal.Overlay = Overlay;
Modal.ToggleClose = ToggleClose;

export default Modal;
