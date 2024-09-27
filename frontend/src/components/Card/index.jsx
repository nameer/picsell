import React from "react";

const Card = ({ className, title, children, icon, color }) => {
  const textClasses = "text-left text-sm text-gray-500 ";
  return (
    <div
      className={`border border-gray-200 p-4 rounded-lg bg-white ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        {icon && <span>{icon}</span>}
        {title && <div className={textClasses}>{title}</div>}
      </div>
      {children}
    </div>
  );
};

export default Card;
