import React, { useState } from "react";

import Modal from "../../../components/Modal";
import InputField from "../../../components/fields/InputField";
import Button from "../../../components/Button/Button";
import FileUploaderField from "../../../components/fields/FileUploaderField";
import CampaignTypeField from "./CampaignTypeField";

const CreateCampaignModal = ({ isOpen, setIsOpen, onCreate }) => {
  const [data, setData] = useState({ name: "", document_urls: [] });

  const isValid = data.name !== "" && data.document_urls.length > 0;

  const handleCreate = () => {
    fetch("http://localhost:8000/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      onCreate();
      setIsOpen(false);
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleTitleChange = (value) => {
    setData((prev) => ({ ...prev, name: value }));
  };

  const handleFilesChange = (files) => {
    // const filePaths = [];

    // for (let i = 0; i < files.length; i++) {
    //   filePaths.push(files[i].name);
    // }

    setData((prev) => ({
      ...prev,
      document_urls: ["https://example.com/"],
    }));
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
        onChange={handleTitleChange}
      />
      <FileUploaderField
        className="w-full mb-8 h-60"
        label="Upload associated documents"
        placeholder="Choose files from your computer"
        onChange={handleFilesChange}
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
        <Button
          size="large"
          className="px-14"
          onClick={handleCreate}
          disabled={!isValid}
        >
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default CreateCampaignModal;
