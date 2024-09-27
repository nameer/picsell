import React from "react";

const Card = ({ className, title, children }) => {
  return (
    <div className={`border border-gray-200 p-4 rounded-lg bg-white ${className}`}>
      {title && <div className="text-left text-sm text-gray-500 mb-3">{title}</div>}
      {children}
    </div>
  );
};

export default Card;
