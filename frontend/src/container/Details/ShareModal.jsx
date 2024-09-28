import React, { useEffect, useState } from "react";

import { embedCode } from "./consts";
import Modal from "../../components/Modal";
import Button from "../../components/Button/Button";
import TextField from "../../components/fields/TextField";
import CopyButton from "../../components/CopyButton";
import InputField from "../../components/fields/InputField";
import { embedLink } from "./consts";

const ShareModal = ({ isOpen, setIsOpen }) => {
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleCopyCode = () => {
    setIsCodeCopied(true);
    setIsLinkCopied(false);

    setTimeout(() => {
      setIsCodeCopied(false);
    }, 2000);
  };

  const handleCopyLink = () => {
    setIsCodeCopied(false);
    setIsLinkCopied(true);

    setTimeout(() => {
      setIsLinkCopied(false);
    }, 2000);
  };

  useEffect(() => {
    if (isOpen === false) {
      setIsCodeCopied(false);
      setIsLinkCopied(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Share via"
      size="medium"
    >
      <div className="relative">
        <TextField
          label="Embed code"
          className="h-52 mb-6"
          value={embedCode}
          disabled
        />
        <CopyButton
          className="!absolute top-10 right-6"
          copyText={embedCode}
          isCopied={isCodeCopied}
          onCopy={handleCopyCode}
        />
      </div>

      <div className="relative">
        <InputField label="Link" value={embedLink} disabled />

        <CopyButton
          className="!absolute top-11 right-6"
          copyText={embedLink}
          isCopied={isLinkCopied}
          onCopy={handleCopyLink}
        />
      </div>
    </Modal>
  );
};

export default ShareModal;
