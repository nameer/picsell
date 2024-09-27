import DashboardLayout from "../../layout/DashboardLayout";
import { PlusIcon } from "../../assets/icons";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import CreateCampaignModal from "./components/CreateCampaignModal";
import CampaignsTable from "./components/CampaignsTable";
import OverviewCards from "./components/OverviewCards";
import { overviewData } from "./consts";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    campaigns: [],
    overviews: {
      totalUploads: 0,
      totalUserEngaged: 0,
      totalPromoters: 0,
      totalUserDetractors: 0,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateModalClick = () => {
    setIsOpen(true);
  };

  const handleCreateCampaign = () => {
    fetchData();
  };

  const getActiveCampaigns = () => {
    return data.campaigns.filter((item) => item.status === "completed");
  };

  const fetchData = () => {
    setIsLoading(true);

    fetch("http://localhost:8000/campaigns", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const data = await response.json();

      setData((prev) => ({ ...prev, campaigns: data }));
      setIsLoading(false);
    });
  };

  useEffect(fetchData, []);

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="flex items-start justify-between">
          <div className="text-left mb-6">
            <h1 className="text-[28px] leading-6 font-bold text-gray-900 mb-3">
              Hey David
            </h1>
            <p className="text-gray-500 text-base leading-[26px]">
              here’s your overall product performance today
            </p>
          </div>
          <Button
            icon={<PlusIcon />}
            size="large"
            onClick={handleCreateModalClick}
          >
            New Campaign
          </Button>
        </div>
        <OverviewCards
          totalCampaigns={data.campaigns.length}
          activeCampaigns={getActiveCampaigns().length}
          isLoading={isLoading}
        />
        <CampaignsTable
          className="grow"
          campaigns={data.campaigns}
          isLoading={isLoading}
        />
      </div>
      <CreateCampaignModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCreate={handleCreateCampaign}
      />
    </DashboardLayout>
  );
};

export default Overview;
