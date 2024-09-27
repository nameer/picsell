import React from "react";

import { CheckIcon, CopyIcon } from "../../assets/icons";
import { Transition } from "@headlessui/react";

const CopyButton = ({ className, copyText, setIsCopied, isCopied }) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(copyText).then(
      function () {
        setIsCopied(true);
        // alert("Copied to clipboard");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };
  return (
    <>
      <Transition
        show={!isCopied}
        className={`duration-300 ${className}`}
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 scale-1"
        leaveFrom="opacity-100 scale-1"
        leaveTo="opacity-0 scale-0"
      >
        <div
          className="px-2 py-1 rounded-md flex items-center gap-2 cursor-pointer duration-100 bg-white border border-[#BBBBBB]"
          onClick={handleCopyClick}
        >
          <div className="text-sm/6 font-bold">Copy</div>
          <CopyIcon />
        </div>
      </Transition>
      <Transition
        show={isCopied}
        className={`duration-300 ${className}`}
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 scale-1"
        leaveFrom="opacity-100 scale-1"
        leaveTo="opacity-0 scale-0"
      >
        <div className="px-2 py-1 rounded-md  flex items-center gap-2 cursor-pointer duration-100 bg-green-500 text-white shadow-lg shadow-green-500/50">
          <div className="text-sm/6 font-bold">Copied</div>
          <CheckIcon className="stroke-white w-4" />
        </div>
      </Transition>
    </>
  );
};

export default CopyButton;
