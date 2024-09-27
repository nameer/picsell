import React from "react";

import Modal from "../../../components/Modal";
import InputField from "../../../components/fields/InputField";
import Button from "../../../components/Button/Button";
import FileUploaderField from "../../../components/fields/FileUploaderField";
import CampaignTypeField from "./CampaignTypeField";

const CreateCampaignModal = ({ isOpen, setIsOpen, onCreate }) => {
  const handleCreate = () => {
    onCreate();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Create new campaign"
      size="medium"
    >
      <CampaignTypeField className="mb-6" />
      <InputField
        className="w-full mb-6"
        label="Title"
        placeholder="Enter title"
      />
      <FileUploaderField
        className="w-full mb-8 h-60"
        label="Upload associated documents"
        placeholder="Choose files from your computer"
        multiple
      />
      <div className="flex items-center justify-end w-full">
        <Button
          size="large"
          className="px-14"
          onClick={handleCancel}
          color="secondary"
        >
          Cancel
        </Button>
        <Button size="large" className="px-14" onClick={handleCreate}>
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default CreateCampaignModal;
