import React, { useState } from "react";

import Button from "../../components/Button/Button";
import { EditLogo, ShareLogo } from "../../assets/icons";
import Chip from "../../components/Chip";
import { getChipValueFromStatus, getChipVariantFromStatus } from "../../utils";
import Spinner from "../../components/Spinner";

export default function DetailsHeader({
  status,
  title,
  id,
  isUploaded,
  onPublish,
  onShare,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const isPublished = status === "completed";

  const handlePublishClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      onPublish();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-between mb-3">
      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-gray-500 text-sm">ID: {id}</div>
          <Chip
            text={getChipValueFromStatus(status)}
            variant={getChipVariantFromStatus(status)}
          />
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
          {!isPublished && (
            <Button
              icon={
                isLoading ? (
                  <Spinner className="!text-white size-4" />
                ) : (
                  <ShareLogo className="fill-white size-4" />
                )
              }
              onClick={handlePublishClick}
              disabled={isLoading}
            >
              Publish
            </Button>
          )}
          {isPublished && (
            <Button
              icon={<ShareLogo className="fill-white size-4" />}
              onClick={onShare}
              disabled={isLoading}
            >
              Share
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
