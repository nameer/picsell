import React, { useEffect, useState } from "react";
import DetailsHeader from "./DetailsHeader";
import DashboardLayout from "../../layout/DashboardLayout";
import Card from "../../components/Card";
import PerformanceSection from "./PerformaceSection";
import ClusteredBubbleChart from "../../components/CategoryChart/ClusteredBubbleChart";
import PerformanceSummary from "./PerformanceSummary";
import LineChartWithGradient from "../../components/EngagementChart/LineChart";
import VideoUploader from "./VideoCard";
import AiSuggestionsCard from "./AiSuggestionsCard";
import ShareModal from "./ShareModal";
import { useParams } from "react-router-dom";
import { aiSuggestions, videoUrl } from "./consts";

export default function DetailsPage() {
  const { campaignId } = useParams();
  const [score, setScore] = useState(0);
  const [data, setData] = useState({
    summary:
      "Areas for Improvement: Improved clarity on account management features",
    score: 82,
    topics: [
      {
        name: "Pricing",
        subtopics: [
          {
            name: "Accessing pricing page",
            value: 3,
          },
          {
            name: "Discounts",
            value: 2,
          },
        ],
      },
      {
        name: "Account Management",
        subtopics: [
          {
            name: "Password reset",
            value: 4,
          },
          {
            name: "Account deletion",
            value: 50,
          },
          {
            name: "Two-factor authentication",
            value: 5,
          },
        ],
      },
      {
        name: "Support",
        subtopics: [
          {
            name: "Technical support",
            value: 1,
          },
        ],
      },
      {
        name: "Account Management 2",
        subtopics: [
          {
            name: "Password reset",
            value: 4,
          },
          {
            name: "Account deletion",
            value: 10,
          },
          {
            name: "Two-factor authentication",
            value: 5,
          },
        ],
      },
      {
        name: " Management test",
        subtopics: [
          {
            name: "Password reset",
            value: 4,
          },
          {
            name: "Account deletion",
            value: 10,
          },
          {
            name: "Two-factor authentication",
            value: 5,
          },
        ],
      },
      {
        name: "Account ",
        subtopics: [
          {
            name: "Password reset",
            value: 4,
          },
          {
            name: "Account deletion",
            value: 10,
          },
          {
            name: "Two-factor authentication",
            value: 5,
          },
        ],
      },
      {
        name: " Management",
        subtopics: [
          {
            name: "Password reset",
            value: 4,
          },
          {
            name: "Account deletion",
            value: 10,
          },
          {
            name: "Two-factor authentication",
            value: 5,
          },
        ],
      },
      {
        name: " Management 6",
        subtopics: [
          {
            name: "Password reset",
            value: 4,
          },
          {
            name: "Account deletion",
            value: 10,
          },
          {
            name: "Two-factor authentication",
            value: 5,
          },
        ],
      },
    ],
    leads: {
      positive: 560,
      neutral: 305,
      negative: 282,
    },
  });
  const [campaignData, setCampaignData] = useState({
    id: "",
    name: "",
    status: "",
  });
  const [summary] = useState([
    {
      heading: "Engagement Peak",
      details: [
        "Product setup demonstration (3:00 - 5:30)",
        "45% of interactions occur after this segment",
      ],
    },
    {
      heading: "AI Query Performance",
      details: [
        'Top Query Handled Well: "How does Model X integrate with other devices?" – 95% accuracy',
        "Areas for Improvement: Energy-saving feature questions – 89% accuracy",
      ],
    },
  ]);

  const [lineChartData] = useState([
    { x: 1, y: 10 },
    { x: 2, y: 20 },
    { x: 3, y: 70 },
    { x: 4, y: 5 },
    { x: 5, y: 80 },
    { x: 6, y: 0 },
  ]);

  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const fetchData = (campaignId) => {
    setIsDetailLoading(true);

    fetch(`http://localhost:8000/campaigns/${campaignId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const campaignData = await response.json();
      setCampaignData(campaignData);
      fetch(`http://localhost:8000/campaigns/${campaignId}/overview`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        const overviewData = await response.json();
        setData(overviewData);
        setScore(overviewData.score);
      });
      setIsDetailLoading(false);
    });
  };

  useEffect(() => fetchData(campaignId), [campaignId]);

  const [videoFile, setVideoFile] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const isDraft = campaignData.status === "drafted";

  const handleVideUpload = (file) => {
    setVideoFile(URL.createObjectURL(file));
  };

  const handlePublish = () => {
    setIsPublishing(true);
    fetch(`http://localhost:8000/campaigns/${campaignId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_url: videoUrl,
      }),
    }).then(async (response) => {
      const data = await response.json();
      setCampaignData(data);
      setIsPublishing(false);
    });
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  return (
    <DashboardLayout>
      <DetailsHeader
        status={campaignData.status}
        id={campaignData.id}
        title={campaignData.name}
        isUploaded={videoFile !== null}
        isPublishing={isPublishing}
        onPublish={handlePublish}
        onShare={handleShareClick}
      />
      <div className="flex gap-4">
        <Card className="w-1/2 h-fit">
          <VideoUploader
            file={!isDraft ? campaignData.video_url : videoFile}
            onUpload={handleVideUpload}
          />
          {!isDraft && (
            <>
              <div className="text-left text-[13px] leading-[18px] tracking-[1px] text-gray-500 mt-4">
                USER ENGAGEMENT
              </div>
              <LineChartWithGradient data={lineChartData} />
            </>
          )}
        </Card>
        {isDraft && (
          <AiSuggestionsCard className="w-1/2" aiSuggestions={aiSuggestions} />
        )}
        {!isDraft && (
          <div className="w-1/2 flex flex-col gap-4 overflow-auto h-[calc(100vh-18rem)] ">
            <PerformanceSection score={score} leads={data.leads} />
            <ClusteredBubbleChart data={data.topics} />
            <PerformanceSummary summary={summary} />
          </div>
        )}
      </div>
      <ShareModal isOpen={isShareModalOpen} setIsOpen={setIsShareModalOpen} />
    </DashboardLayout>
  );
}
