import React from "react";

import logo from "../assets/images/logo.svg";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-16 py-4 bg-white">
        <img src={logo} alt="Picsell logo" />
        <div className="bg-[#38456C] flex items-center justify-center size-8 text-white rounded-full">
          E
        </div>
      </div>
      <div className="grow bg-gray-50 px-16 py-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
