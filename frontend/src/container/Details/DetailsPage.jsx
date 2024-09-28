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
import { videoDuration, videoUrl } from "./consts";

export default function DetailsPage() {
  const { campaignId } = useParams();
  const [score, setScore] = useState(0);
  const [data, setData] = useState({
    summary: {
      engagement_peak: [],
      ai_query_performance: [],
      customer_feedback: [],
      additional_insights: [],
    },
    score: 0,
    topics: [],
    leads: {
      positive: 0,
      neutral: 0,
      negative: 0,
    },
  });
  const [campaignData, setCampaignData] = useState({
    id: "",
    name: "",
    status: "drafted",
  });

  const isDraft = campaignData.status === "drafted";
  const isProcessing = campaignData.status === "processing";
  const isCompleted = campaignData.status === "completed";

  const [summary, setSummary] = useState({
    engagement_peak: [],
    ai_query_performance: [],
    customer_feedback: [],
    additional_insights: [],
  });

  const [lineChartData, setLineChartData] = useState({
    total_duration: 0,
    max_heat: 0,
    plot: [],
  });

  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const fetchOverview = () => {
    if (!isDraft) {
      fetch(`http://localhost:8000/campaigns/${campaignId}/overview`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        const overviewData = await response.json();
        setData(overviewData);
        setScore(overviewData.score);
        setSummary(overviewData.summary);
      });
    }
  };

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
      setIsDetailLoading(false);
    });
  };

  const fetchLineChartData = (campaignId) => {
    if (!isDraft) {
      fetch(`http://localhost:8000/campaigns/${campaignId}/hot-spots`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        const chartData = await response.json();
        chartData.plot.unshift({ x: 0, y: 0 });
        chartData.plot.push({ x: chartData.total_duration, y: 0 });
        setLineChartData(chartData);
      });
    }
  };

  useEffect(() => {
    fetchData(campaignId);
    fetchLineChartData(campaignId);
    fetchOverview();
  }, [campaignId]);

  const [videoFile, setVideoFile] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleVideUpload = (file) => {
    setVideoFile(URL.createObjectURL(file));
  };

  const handlePublish = () => {
    setIsPublishing(true);
    fetch(`http://localhost:8000/campaigns/${campaignId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_url: videoUrl,
        video_duration: videoDuration,
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
        isUploaded={
          isDraft ? videoFile !== null : campaignData.video_url !== ""
        }
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
        {isDraft && <AiSuggestionsCard className="w-1/2" campaignId={campaignId}/>}
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
