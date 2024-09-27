import React from "react";

import Button from "../../components/Button/Button";
import { EditLogo, ShareLogo } from "../../assets/icons";

export default function DetailsHeader({ onShareClick }) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <p className="text-2xl font-semibold">Coffee Explainer Video</p>
        <div className="p-1 bg-green-100 w-fit rounded-2xl mt-1 flex items-center">
          <span className="bg-green-600 w-2 h-2 rounded-xl mx-2"></span>
          <p className="text-sm text-green-900 pr-3">Completed</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Button color={"secondary"} icon={<ShareLogo />} onClick={onShareClick}>
          Share
        </Button>
        <Button icon={<EditLogo />}>Edit</Button>
      </div>
    </div>
  );
}
