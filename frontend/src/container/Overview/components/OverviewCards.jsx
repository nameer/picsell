import React from "react";

import Card from "../../../components/Card";
import { ArrowUpIcon } from "../../../assets/icons";

const OverViewCard = ({ title, value, subValue, isLoading }) => {
  return (
    <Card className="w-full px-8 text-left" title={title}>
      {isLoading && (
        <div className="animate-pulse h-8 w-20 bg-gray-200 rounded-lg "></div>
      )}
      {!isLoading && (
        <div className="flex items-end justify-between">
          <div className="text-[21px] leading-8 font-bold">{value ?? "-"}</div>
          {subValue && (
            <div className="flex items-center gap-1">
              <div className="text-green-500 font-medium text-[13px] leading-[21px]">
                +36%
              </div>
              <ArrowUpIcon />
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

const OverviewCards = ({
  totalCampaigns,
  activeCampaigns,
  totalImpressions,
  engagementRate,
  isLoading,
}) => {
  return (
    <div className="flex items-center gap-4 mb-10">
      <OverViewCard
        title="TOTAL CAMPAIGNS"
        value={totalCampaigns}
        isLoading={isLoading}
      />
      <OverViewCard
        title="ACTIVE CAMPAIGNS"
        value={activeCampaigns}
        isLoading={isLoading}
      />
      <OverViewCard
        title="TOTAL IMPRESSIONS"
        value={totalImpressions}
        subValue="+36%"
        isLoading={isLoading}
      />
      <OverViewCard
        title="ENGAGEMENT RATE"
        value={engagementRate}
        subValue="+36%"
        isLoading={isLoading}
      />
    </div>
  );
};

export default OverviewCards;
