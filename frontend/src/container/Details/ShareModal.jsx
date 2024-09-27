import React, { useEffect, useState } from "react";

import Modal from "../../components/Modal";
import TextField from "../../components/fields/TextField";
import { embedCode } from "./consts";
import Button from "../../components/Button/Button";
import CopyButton from "../../components/CopyButton";

const ShareModal = ({ isOpen, setIsOpen }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen === false) {
      setIsCopied(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Share embed code"
      size="small"
    >
      <div className="relative">
        <TextField className="h-52 mb-8" value={embedCode} disabled />
        <CopyButton
          className="!absolute top-3 right-6"
          copyText={embedCode}
          isCopied={isCopied}
          setIsCopied={setIsCopied}
        />
      </div>

      <Button className="w-full" size="large" onClick={handleClose}>
        Okey
      </Button>
    </Modal>
  );
};

export default ShareModal;
