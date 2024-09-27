import React from "react";
import FieldWrapper from "../../../components/fields/FieldWrapper";
import { AudioIcon, ImageIcon, VideoIcon } from "../../../assets/icons";

const CampaignTypeField = ({ className }) => {
  return (
    <FieldWrapper className={className} label="Type">
      <div className="flex gap-4">
        <div className="flex items-center justify-center gap-2.5 w-full py-5 px-12 border-[#205BF1] border bg-[#205BF11A] rounded-md">
          <VideoIcon />
          <div>Video</div>
        </div>
        <div className="flex items-center justify-center gap-2.5 w-full py-5 px-12 border-[#D9D9D9] border bg-[#EAECF080] text-[#B3B3B3] rounded-md">
          <ImageIcon />
          <div>Image</div>
        </div>
        <div className="flex items-center justify-center gap-2.5 w-full py-5 px-12 border-[#D9D9D9] border bg-[#EAECF080] text-[#B3B3B3] rounded-md">
          <AudioIcon />
          <div>Audio</div>
        </div>
      </div>
    </FieldWrapper>
  );
};

export default CampaignTypeField;
