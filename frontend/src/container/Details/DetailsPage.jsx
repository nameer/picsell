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

export default function DetailsPage() {
  const { campaignId } = useParams();
  const [score, setScore] = useState(0);
  const [data, setData] = useState({
    id: "12345",
    status: "Completed",
    title: "Coffee Explainer Video",
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
    aiSuggestions: `Content Recommendations:

Key Messaging:
“Celebrate Diwali with Evernote!”
“Stay organized this festive season—capture ideas and plan celebrations!”

Call-to-Action:
“Start your free trial for exclusive Diwali discounts!”

Media Recommendations:

Video Structure:
Intro (0:00 - 0:15): Festive visuals with the Evernote logo.
Features (0:15 - 0:60): Highlight note-taking, web clipper, and themed notebooks.
Collaboration (0:60 - 1:10): Showcase family planning in real-time.
Mobile Access (1:10 - 1:30): Capture notes on the go.
Closing (1:30 - 1:45): Reinforce the message and include a call-to-action.
Visual Style:
Use festive colors and motifs—golds, reds, greens.
Engagement Elements:
Include clickable links for special offers.
Feature user-generated content.`,
  });
  const [campaignData, setCampaignData] = useState();
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
        setSummary(overviewData.summary);
      });
      setIsDetailLoading(false);
    });
  };

  const fetchLineChartData = (campaignId) => {
    fetch(`http://localhost:8000/campaigns/${campaignId}/hot-spots`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const chartData = await response.json();
      setLineChartData(chartData);
    });
  };

  useEffect(() => {
    fetchData(campaignId);
    fetchLineChartData(campaignId);
  }, [campaignId]);

  const [videoFile, setVideoFile] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const isDraft = data.status === "drafted";

  const handleVideUpload = (file) => {
    setVideoFile(URL.createObjectURL(file));
  };

  const handlePublish = () => {
    setData((prev) => ({ ...prev, status: "processing" }));
  };
  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  return (
    <DashboardLayout>
      <DetailsHeader
        status={data.status}
        id={data.id}
        title={data.title}
        isUploaded={videoFile !== null}
        onPublish={handlePublish}
        onShare={handleShareClick}
      />
      <div className="flex gap-4">
        <Card className="w-1/2 h-fit">
          <VideoUploader file={videoFile} onUpload={handleVideUpload} />
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
          <AiSuggestionsCard
            className="w-1/2"
            aiSuggestions={data.aiSuggestions}
          />
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
