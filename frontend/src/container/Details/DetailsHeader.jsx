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
  isPublishing,
  onPublish,
  onShare,
}) {
  const isProcessing = status === "processing";
  const isCompleted = status === "completed";
  const isDraft = status === "drafted";

  return (
    <div className="flex justify-between mb-3">
      <div className="flex flex-col items-start">
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
          {isDraft && (
            <Button
              icon={
                isPublishing ? (
                  <Spinner className="!text-white size-4" />
                ) : (
                  <ShareLogo className="fill-white size-4" />
                )
              }
              onClick={onPublish}
              disabled={isPublishing}
            >
              Publish
            </Button>
          )}
          {isProcessing && (
            <Button icon={<ShareLogo className="fill-white size-4" />} disabled>
              Share
            </Button>
          )}
          {isCompleted && (
            <Button
              icon={<ShareLogo className="fill-white size-4" />}
              onClick={onShare}
            >
              Share
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
