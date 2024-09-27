import React, { useEffect, useState } from "react";
import DetailsHeader from "./DetailsHeader";
import DashboardLayout from "../../layout/DashboardLayout";
import Card from "../../components/Card";
import PerformanceSection from "./PerformaceSection";
import ClusteredBubbleChart from "../../components/CategoryChart/ClusteredBubbleChart";
import PerformanceSummary from "./PerformanceSummary";
import LineChartWithGradient from "../../components/EngagementChart/LineChart";
import VideoCard from "./VideoCard";
import AiSuggestionsCard from "./AiSuggestionsCard";

export default function DetailsPage() {
  const [score] = useState(60);
  const [data] = useState({
    id: "12345",
    status: "Draft",
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
      {
        name: " Management 3",
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

  const [videoFile, setVideoFile] = useState(null);

  const isDraft = data.status === "Draft";

  const handleVideUpload = (file) => {
    setVideoFile(URL.createObjectURL(file));
  };

  return (
    <DashboardLayout>
      <DetailsHeader
        status={data.status}
        id={data.id}
        title={data.title}
        isUploaded={videoFile !== null}
      />
      <div className="flex gap-4">
        <VideoCard file={videoFile} onUpload={handleVideUpload} />
        {isDraft && (
          <AiSuggestionsCard
            className="w-1/2"
            aiSuggestions={data.aiSuggestions}
          />
        )}
        {!isDraft && (
          <div className="w-1/2 flex flex-col gap-4 overflow-auto h-[calc(100vh-12rem)] ">
            <PerformanceSection score={score} />
            <ClusteredBubbleChart data={data.topics} />
            <PerformanceSummary summary={summary} />
          </div>
        )}
      </div>
      {data.status !== "Draft" && (
        <div className="flex gap-4">
          <div className="w-1/2">
            <Card>
              <div className="h-80 border border-gray-400 rounded-lg"></div>
              <div className="text-left text-[13px] leading-[18px] tracking-[1px] text-gray-500 mt-4">
                USER ENGAGEMENT
              </div>
              <LineChartWithGradient data={lineChartData} />
            </Card>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
