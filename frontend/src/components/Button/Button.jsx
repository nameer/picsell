import { tv } from "tailwind-variants";

const button = tv(
  {
    base: "flex m-1 items-center justify-center gap-x-2 rounded-lg text-sm font-medium leading-5 text-JET_GREY transition-all duration-300",
    variants: {
      color: {
        primary: "bg-[#205BF1] text-white shadow-lg shadow-[#205BF133]",
        secondary: "text-black bg-WHITE border border-[#BBBBBB]",
        nonActive: "border bg-PALE_SILVER text-black",
      },
      size: {
        normal: "px-9 py-2",
        large: "p-4",
        small: "p-2",
      },
      fullWidth: {
        true: "w-full",
      },
      disabled: {
        true: "bg-neutral-400",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "normal",
      fullWidth: false,
    },
  },
  { twMerge: true }
);

const Button = ({
  children,
  className,
  color,
  disabled,
  fullWidth,
  icon,
  size,
  ...restProps
}) => {
  return (
    <button
      className={button({
        className,
        color,
        disabled,
        fullWidth,
        size,
      })}
      {...restProps}
    >
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
