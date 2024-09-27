import React, { useEffect, useState } from "react";
import DetailsHeader from "./DetailsHeader";
import DashboardLayout from "../../layout/DashboardLayout";
import Card from "../../components/Card";
import PerformanceSection from "./PerformaceSection";
import ClusteredBubbleChart from "../../components/CategoryChart/ClusteredBubbleChart";
import { CHART_CATEGORIES } from "../../components/CategoryChart/constants";

export default function DetailsPage() {
  const [score] = useState(60);

  const data = {
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
            value: 1,
          },
          {
            name: "Account deletion",
            value: 1,
          },
          {
            name: "Two-factor authentication",
            value: 1,
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
    ],
    leads: {
      positive: 560,
      neutral: 305,
      negative: 282,
    },
  };

  const summary = [
    {
      heading: "Heading 1",
      desc: "Description for heading 1",
      details: ["Details 1.1", "Details 1.2"],
    },
    {
      heading: "Heading 2",
      desc: "Description for heading 2",
      details: ["Details 2.1", "Details 2.2"],
    },
  ];
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
            <ClusteredBubbleChart
              data={data.topics}
              categories={CHART_CATEGORIES}
            />
          </Card>
          <Card title={"PERFORMANCE SUMMARY"}>
            <div className="p-4 bg-gray-50 rounded-md">
              <ul className="list-disc list-inside space-y-4 flex flex-col place-items-start">
                {summary.map((item, index) => (
                  <li key={index} className="text-gray-800 mb-3 text-xs">
                    <span className="font-medium text-lg">{item.heading}:</span>
                    <ul className="list-disc list-inside ml-5">
                      {item.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-gray-700 text-xs">
                          <span className="text-lg">{detail}</span>
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
