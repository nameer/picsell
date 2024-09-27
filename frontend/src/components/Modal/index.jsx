import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { CloseIcon } from "../../assets/icons";
import { tv } from "tailwind-variants";

const modalPanelVariants = tv({
  base: "w-full border shadow-lg rounded-xl bg-white p-6",
  variants: {
    size: {
      small: "max-w-lg",
      medium: "max-w-3xl",
      large: "max-w-5xl",
    },
  },
});

const Modal = ({ isOpen, setIsOpen, title, children, size }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full bg-black/20 items-center justify-center p-4">
          <DialogPanel transition className={modalPanelVariants({ size })}>
            <DialogTitle className="mb-6 flex items-center justify-between">
              <div className="text-base/6 font-bold">{title}</div>
              <CloseIcon className="cursor-pointer" onClick={handleClose} />
            </DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
