import React from "react";

const Card = ({ className, title, children, icon }) => {
  return (
    <div
      className={`border border-gray-200 p-4 rounded-lg bg-white ${className}`}
    >
      {(icon || title) && (
        <div className="flex items-center gap-2 mb-3">
          {icon && <span>{icon}</span>}
          {title && (
            <div className="text-left text-[13px] leading-[18px] tracking-[1px] text-gray-500">
              {title}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
