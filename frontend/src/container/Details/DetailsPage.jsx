import React, { useEffect, useState } from "react";
import DetailsHeader from "./DetailsHeader";
import DashboardLayout from "../../layout/DashboardLayout";
import Card from "../../components/Card";
import PerformanceSection from "./PerformaceSection";
import ClusteredBubbleChart from "../../components/CategoryChart/ClusteredBubbleChart";
import { CHART_CATEGORIES } from "../../components/CategoryChart/constants";
export default function DetailsPage() {
  const [score] = useState(60);
  const bubbleData = [
    { name: "Subcategory 1", value: 30, color: "#ff9999" },
    { name: "Subcategory 1", value: 30, color: "#ff9999" },
    { name: "Subcategory 2", value: 20, color: "blue" },
    { name: "Subcategory 2", value: 20, color: "blue" },
    { name: "Subcategory 3", value: 50, color: "green" },
    { name: "Subcategory 3", value: 50, color: "green" },
    { name: "Subcategory 4", value: 30, color: "grey" },
    { name: "Subcategory 4", value: 60, color: "grey" },
    { name: "Subcategory 4", value: 30, color: "grey" },
    { name: "Subcategory 4", value: 60, color: "grey" },
    { name: "Subcategory 6", value: 10, color: "red" },
    { name: "Subcategory 6", value: 10, color: "red" },
    { name: "Subcategory 7", value: 6, color: "lightblue" },
    { name: "Subcategory 7", value: 6, color: "lightblue" },
    { name: "Subcategory 8", value: 70, color: "#66cc99" },
    { name: "Subcategory 8", value: 70, color: "#66cc99" },
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
          <div>
            <Card title={"CUSTOMER QUERY OVERVIEW"}>
              <ClusteredBubbleChart
                data={bubbleData}
                categories={CHART_CATEGORIES}
              />
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
