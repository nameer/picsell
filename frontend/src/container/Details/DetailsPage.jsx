import React, { useEffect, useState } from "react";
import DetailsHeader from "./DetailsHeader";
import DashboardLayout from "../../layout/DashboardLayout";
import Card from "../../components/Card";
import PerformanceSection from "./PerformaceSection";
import ClusteredBubbleChart from "../../components/CategoryChart/ClusteredBubbleChart";

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

  return (
    <DashboardLayout>
      <DetailsHeader />
      <div className="flex border-cyan-300">
        <div className="w-[50%]  p-2">
          <Card></Card>
        </div>
        <div className="w-[50%] p-2 flex flex-col gap-4 overflow-auto h-[calc(100vh-19rem)]">
          <PerformanceSection score={score} />
          <Card title={"CUSTOMER QUERY OVERVIEW"}>
            <ClusteredBubbleChart data={data.topics} />
          </Card>
          <Card title={"PERFORMANCE SUMMARY"}>
            <div className="p-4 bg-gray-50 rounded-md">
              <ul className="list-disc space-y-4">
                {summary.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-800 mb-3 text-xs text-left"
                  >
                    <span className="font-medium text-[16px]">
                      {item.heading}:
                    </span>
                    <ul className="list-disc list-outside ml-7 text-left">
                      {item.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="text-gray-700 p-1 text-xs"
                        >
                          <span className="text-[15px]">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
