import React from "react";

import { DotsHorizontalIcon } from "../../../assets/icons";
import Chip from "../../../components/Chip";
import Table from "../../../components/Table";
import Spinner from "../../../components/Spinner";
import {
  getChipValueFromStatus,
  getChipVariantFromStatus,
} from "../../../utils";
import { useNavigate } from "react-router-dom";

export const projectsTableColumns = [
  { id: "id", heading: "ID", value: (item) => item.id },
  { id: "fileName", heading: "File name", value: (item) => item.name },
  {
    id: "createOn",
    heading: "Create on",
    value: (item) => new Date(item.created_at).toDateString(),
  },
  {
    id: "updatedOn",
    heading: "Updated On",
    value: (item) => new Date(item.updated_at).toDateString(),
  },
  {
    id: "status",
    heading: "Status",
    value: (item) => (
      <Chip
        text={getChipValueFromStatus(item.status)}
        variant={getChipVariantFromStatus(item.status)}
      />
    ),
  },
  {
    id: "actions",
    heading: "Actions",
    value: (item) => <DotsHorizontalIcon />,
  },
];

const CampaignsTable = ({ className, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleCampaignClick = (item) => {
    navigate(`/details/${item.id}`);
  };
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="text-lg font-semibold text-left mb-4">Campaigns</div>
      {!isLoading && campaigns.length > 0 && (
        <Table
          className="grow h-0 overflow-y-auto"
          columns={projectsTableColumns}
          data={campaigns}
          onItemSelect={handleCampaignClick}
        />
      )}
      {!isLoading && campaigns.length === 0 && "Empty"}
      {isLoading && (
        <div className="grow flex flex-col items-center justify-center">
          <Spinner className="size-10 mb-2" />
          <div className="text-gray-600">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default CampaignsTable;
