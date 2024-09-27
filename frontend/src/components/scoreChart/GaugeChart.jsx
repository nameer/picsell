"use client";

import { useState, useEffect } from "react";
import easeInOutAnimation from "./easeInOutAnimation";
import {
  ARC_INNER_RADIUS,
  ARC_OUTER_RADIUS,
  ARC_PAD_ANGLE,
  DOTTED_ARC_PAD_ANGLE,
  DOTTED_ARC_RADIUS,
  GRAPH_COLORS,
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
    { color: GRAPH_COLORS.BAD, key: 1, startAngle: 0, endAngle: 50 },
    { color: GRAPH_COLORS.NOTBAD, key: 2, startAngle: 51, endAngle: 70 },
    { color: GRAPH_COLORS.AVERAGE, key: 3, startAngle: 71, endAngle: 85 },
    { color: GRAPH_COLORS.GOOD, key: 4, startAngle: 86, endAngle: 100 },
  ];

  const pointColor =
    chartColors.find((item) => {
      return score >= item.startAngle && score <= item.endAngle;
    })?.color || null;

  return (
    <div className="w-[400px] flex items-center flex-col">
      <svg viewBox="-0.9 -0.86 1.8 1">
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
              endAngle: angleScale(100),
              padAngle: DOTTED_ARC_PAD_ANGLE,
            }) ?? ""
          }
          stroke={"grey"}
          strokeWidth="0.007"
          fill="none"
          strokeDasharray="0.017,0.13" // Dotted effect
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
          y="-0.2"
          textAnchor="middle"
          alignmentBaseline="central"
          fill="#000"
          fontSize="0.2"
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
      <div>
        <p className="text-xl font-medium">
          Performance Score is <span> </span>
          <span style={{ color: pointColor }}>Average</span>
        </p>
      </div>
    </div>
  );
};

export default GaugeChart;
