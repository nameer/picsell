import React from "react";
import { tv } from "tailwind-variants";

const chipVariants = tv({
  base: "flex items-center gap-2 w-fit rounded-full ps-[9px] pe-[11px] text-sm font-medium py-1",
  variants: {
    variant: {
      info: "bg-blue-100 text-blue-900",
      success: "bg-green-100 text-green-900",
      warning: "bg-yellow-100 text-yellow-900",
      error: "bg-red-100 text-red-900",
      muted: "bg-gray-200 text-gray-500",
    },
  },
});

const chipDotVariants = tv({
  base: "size-2 rounded-full",
  variants: {
    variant: {
      info: "bg-blue-500",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      error: "bg-red-500",
      muted: "bg-gray-400",
    },
  },
});

const Chip = ({ className, text, variant }) => {
  return (
    <div className={`${chipVariants({ variant })} ${className}`}>
      <div className={chipDotVariants({variant})}></div>
      <div>{text}</div>
    </div>
  );
};

export default Chip;
