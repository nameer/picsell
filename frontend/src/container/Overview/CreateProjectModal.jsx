import React, { useEffect, useState } from "react";

import Modal from "../../components/Modal";
import InputField from "../../components/fields/InputField";
import Button from "../../components/Button/Button";
import FileUploaderField from "../../components/fields/FileUploaderField";
import { VideoIcon } from "../../assets/icons";

const CreateProjectModal = ({ isOpen, setIsOpen, onCreate }) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 2) {
      setStep((prev) => ++prev);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => --prev);
    }
  };

  const handleCreate = () => {
    onCreate();
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen === false) {
      setStep(1);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Create new project"
      size="medium"
    >
      {step === 1 && (
        <>
          <InputField
            className="w-full mb-6"
            label="Project title"
            placeholder="Enter title"
          />
          <FileUploaderField
            className="w-full mb-8 "
            label="Upload video"
            placeholder="Upload product video"
            removeIcon={<div className="text-[#D92626] text-sm/5">Delete</div>}
            fileIcon={<VideoIcon />}
          />
        </>
      )}
      {step === 2 && (
        <FileUploaderField
          className="w-full mb-8 h-60"
          label="Upload associated documents"
          placeholder="Choose files from your computer"
          multiple
        />
      )}
      <div className="flex items-center justify-between w-full">
        <div className="text-[#999999] text-xs/6 font-semibold">
          Step {step} of 2
        </div>
        <div className="flex items-center gap-4">
          {step === 2 && (
            <>
              <Button
                size="large"
                className="px-14"
                onClick={handleBack}
                color="secondary"
              >
                Back
              </Button>
              <Button size="large" className="px-14" onClick={handleCreate}>
                Create
              </Button>
            </>
          )}
          {step === 1 && (
            <Button size="large" className="px-14" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;
