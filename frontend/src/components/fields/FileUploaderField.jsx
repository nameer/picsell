import React, { useEffect, useRef, useState } from "react";
import FieldWrapper from "./FieldWrapper";
import { TrashIcon, UploadIcon } from "../../assets/icons";

const FileCard = ({ name, onRemove, removeIcon, fileIcon }) => {
  return (
    <div className="flex items-center w-full py-2">
      {fileIcon}
      <div
        className={`text-[#444444] text-sm/5 font-medium ${
          fileIcon ? "ms-2" : ""
        }`}
      >
        {name}
      </div>
      <div className="cursor-pointer ms-auto" onClick={onRemove}>
        {removeIcon}
      </div>
    </div>
  );
};

const FileUploaderField = ({
  placeholder,
  multiple,
  removeIcon,
  fileIcon,
  onChange,
  ...props
}) => {
  const inputRef = useRef();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleUpload = (e) => {
    const files = [];

    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files[i]);
    }

    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleFileRemove = (file) => {
    setUploadedFiles((prev) => prev.filter((item) => item !== file));
  };

  useEffect(() => {
    if (onChange) onChange(uploadedFiles);
  }, [onChange, uploadedFiles]);

  return (
    <FieldWrapper {...props}>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={handleUpload}
        multiple={multiple}
      />
      <div className="grow border border-dashed border-[#D0D5DD p-6 rounded-md">
        {uploadedFiles.length === 0 && (
          <div
            className="h-full flex flex-col justify-center items-center cursor-pointer"
            onClick={handleClick}
          >
            <UploadIcon className="mb-[10px]" />
            <p className="text-sm/4 text-[#5A5A5A]">{placeholder}</p>
          </div>
        )}
        {uploadedFiles.length > 0 && (
          <div className="flex flex-col gap-2">
            {multiple && (
              <div
                className="flex items-center justify-center gap-2 border rounded-md py-4 mb-2 cursor-pointer"
                onClick={handleClick}
              >
                <UploadIcon />
                <p className="text-sm/4 text-[#5A5A5A]">{placeholder}</p>
              </div>
            )}
            {uploadedFiles.map((uploadedFile, i) => (
              <FileCard
                name={uploadedFile.name}
                onRemove={() => handleFileRemove(uploadedFile)}
                removeIcon={removeIcon ?? <TrashIcon />}
                fileIcon={fileIcon}
              />
            ))}
          </div>
        )}
      </div>
    </FieldWrapper>
  );
};

export default FileUploaderField;
