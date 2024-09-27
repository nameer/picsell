import React from "react";

import Button from "../../components/Button/Button";
import { EditLogo, ShareLogo } from "../../assets/icons";
import Chip from "../../components/Chip";

export default function DetailsHeader() {
  return (
    <div className="ml-4 flex justify-between">
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <div className="text-gray-500 text-sm">ID 12345</div>
          <Chip text={"Completed"} variant={"success"} />
        </div>

        <p className="text-2xl font-semibold">Coffee Explainer Video</p>
      </div>
      <div className="flex gap-2 items-center">
        <Button color={"secondary"} icon={<ShareLogo />}>
          Share
        </Button>
        <Button icon={<EditLogo />}>Edit</Button>
      </div>
    </div>
  );
}
