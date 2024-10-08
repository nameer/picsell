import React from "react";
import Card from "../../components/Card";
import { SUMMARY_HEADING } from "./consts";
export default function PerformanceSummary({ summary }) {
  return (
    <Card title={"PERFORMANCE SUMMARY"}>
      <div className="p-4 bg-gray-50 rounded-md">
        <ul className="list-disc space-y-4">
          {Object.entries(summary).map(([key, value], index) => (
            <li key={index} className="text-gray-800 mb-3 text-xs text-left">
              <span className="font-medium text-[16px]">
                {SUMMARY_HEADING[key]}:
              </span>
              <ul className="list-disc list-outside ml-7 text-left">
                {value.map((detail, detailIndex) => (
                  <li key={detailIndex} className="text-gray-700 p-1 text-xs">
                    <span className="text-[15px]">{detail}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
