import React from "react";
import FieldWrapper from "./FieldWrapper";

const InputField = ({ value, placeholder, onChange, disabled,  ...props }) => {
  return (
    <FieldWrapper {...props}>
      <input
        className="border rounded-md outline-blue-500 outline-1 py-5 px-4 text-sm/5 placeholder:text-[#605E5F] w-full"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </FieldWrapper>
  );
};

export default InputField;
