import React, { useEffect, useState } from "react";
import DetailsHeader from "./DetailsHeader";
import DashboardLayout from "../../layout/DashboardLayout";
import Card from "../../components/Card";
import PerformanceSection from "./PerformaceSection";
import ClusteredBubbleChart from "../../components/CategoryChart/ClusteredBubbleChart";
import PerformanceSummary from "./PerformanceSummary";
import LineChartWithGradient from "../../components/EngagementChart/LineChart";
export default function DetailsPage() {
  const [score] = useState(60);
  const [data] = useState({
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
  const videoTimeLength = 8000;

  const [lineChartData] = useState([
    { x: 1, y: 10 },
    { x: 2, y: 20 },
    { x: 3, y: 70 },
    { x: 4, y: 5 },
    { x: 5, y: 80 },
    { x: 6, y: 0 },
  ]);

  return (
    <DashboardLayout>
      <DetailsHeader />
      <div className="flex border-cyan-300">
        <div className="w-[50%]  p-2">
          <Card>
            <div className="h-80 border border-gray-400 rounded-lg"></div>
            <div className="text-left text-[13px] leading-[18px] tracking-[1px] text-gray-500 mt-4">
              USER ENGAGEMENT
            </div>
            <LineChartWithGradient data={lineChartData} />
          </Card>
        </div>
        <div className="w-[50%] p-2 flex flex-col gap-4 overflow-auto h-[calc(100vh-17rem)] ">
          <PerformanceSection score={score} />
          <ClusteredBubbleChart data={data.topics} />
          <PerformanceSummary summary={summary} />
        </div>
      </div>
    </DashboardLayout>
  );
}
