import React from "react";
import FieldWrapper from "./FieldWrapper";

const TextField = ({ placeholder, onChange, disabled, value, ...props }) => {
  return (
    <FieldWrapper {...props}>
      <textarea
        className={`grow border rounded-md outline-blue-500 outline-1 p-3 text-sm/5 placeholder:text-[#605E5F] w-full ${
          disabled ? "text-[#5A5A5A]" : ""
        }`}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        value={value}
      />
    </FieldWrapper>
  );
};

export default TextField;
