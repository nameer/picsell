"use client";

import { useState, useEffect } from "react";
import easeInOutAnimation from "./easeInOutAnimation";
import {
  ARC_INNER_RADIUS,
  ARC_OUTER_RADIUS,
  ARC_PAD_ANGLE,
  DOTTED_ARC_PAD_ANGLE,
  DOTTED_ARC_RADIUS,
} from "./constants";
import { angleScale, arcGenerator, getCoordsOnArc } from "./utils";

const GaugeChart = ({ score: _score }) => {
  const [score, setScore] = useState(0);

  console.log(score);

  useEffect(() => {
    const cancelAnimation = easeInOutAnimation(
      (value) => setScore(value),
      2000,
      _score
    );

    return cancelAnimation;
  }, [_score]);

  const angle = angleScale(score);
  const markerLocation = getCoordsOnArc(angle);
  const chartColors = [
    { color: "#D76B66", key: 1, startAngle: 0, endAngle: 500 },
    { color: "#F6CF7D", key: 2, startAngle: 501, endAngle: 700 },
    { color: "#EA973D", key: 3, startAngle: 701, endAngle: 850 },
    { color: "#75C57F", key: 4, startAngle: 851, endAngle: 1000 },
  ];

  const pointColor =
    chartColors.find((item) => {
      return score >= item.startAngle && score <= item.endAngle;
    })?.color || null;

  return (
    <div className="w-[600px]">
      <svg viewBox="-1.2 -1.2 2.4 1.3">
        {chartColors.map((item) => (
          <path
            key={item.key}
            d={
              arcGenerator({
                innerRadius: ARC_INNER_RADIUS,
                outerRadius: ARC_OUTER_RADIUS,
                startAngle: angleScale(item.startAngle),
                endAngle: angleScale(item.endAngle),
                padAngle: ARC_PAD_ANGLE,
              }) ?? ""
            }
            fill={item.color}
          />
        ))}
        <path
          d={
            arcGenerator({
              innerRadius: DOTTED_ARC_RADIUS,
              outerRadius: DOTTED_ARC_RADIUS,
              startAngle: angleScale(0),
              endAngle: angleScale(10),
              padAngle: DOTTED_ARC_PAD_ANGLE,
            }) ?? ""
          }
          stroke={"red"}
          strokeWidth="0.02"
          fill="none"
          strokeDasharray="0.016,0.2" // Dotted effect
        />
        <circle
          cx={markerLocation[0]}
          cy={markerLocation[1]}
          r="0.065"
          strokeWidth="0.05"
          fill="white"
          stroke={pointColor}
          filter="url(#shadow)"
        />
        <text
          x="0"
          y="-0.4"
          textAnchor="middle"
          alignmentBaseline="central"
          fill="#000"
          fontSize="0.25"
          fontWeight="500"
        >
          {score.toFixed(1)}
        </text>
        <text
          x="0"
          y="-0.2"
          textAnchor="middle"
          alignmentBaseline="central"
          fill="#000"
          fontSize="0.08"
          fontWeight="600"
        ></text>
      </svg>
    </div>
  );
};

export default GaugeChart;
