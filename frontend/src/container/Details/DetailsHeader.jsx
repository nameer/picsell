import React from "react";

import Button from "../../components/Button/Button";
import { EditLogo, ShareLogo } from "../../assets/icons";
import Chip from "../../components/Chip";
import { getChipVariantFromStatus } from "../../utils";

export default function DetailsHeader({ status, title, id, isUploaded }) {
  const isDraft = status === "Draft";
  return (
    <div className="flex justify-between mb-3">
      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-gray-500 text-sm">ID: {id}</div>
          <Chip text={status} variant={getChipVariantFromStatus(status)} />
        </div>

        <p className="text-2xl font-semibold">{title}</p>
      </div>
      {!isUploaded && (
        <div className="flex gap-2 items-center">
          <Button color="secondary" icon={<EditLogo className="fill-black" />}>
            Edit
          </Button>
          <Button icon={<ShareLogo className="fill-white size-4" />} disabled>
            Publish
          </Button>
        </div>
      )}
      {isUploaded && (
        <div className="flex gap-2 items-center">
          <Button color="secondary" icon={<EditLogo className="fill-black" />}>
            Edit
          </Button>
          <Button icon={<ShareLogo className="fill-white size-4" />}>
            Publish
          </Button>
        </div>
      )}
    </div>
  );
}
