import React from "react";
import Card from "../../components/Card";
import { CustomerIcon, LikeIcon, DislikeIcon } from "../../assets/icons";
import GaugeChart from "../../components/scoreChart/GaugeChart";

export default function PerformanceSection(props) {
  return (
    <div className=" grid grid-cols-3 grid-rows-4 gap-4">
      <Card
        className="w-full px-8 text-left"
        title="TOTAL UPLOADS"
        icon={<CustomerIcon />}
      >
        <div className="text-3xl font-bold">3,525</div>
      </Card>
      <Card
        className="w-full px-8 text-left"
        title="TOTAL PROMOTERS"
        icon={<LikeIcon />}
      >
        <div className="text-3xl font-bold">3,525</div>
      </Card>
      <Card
        className="w-full px-8 text-left"
        title="TOTAL RETRACTORS"
        icon={<DislikeIcon />}
      >
        <div className="text-3xl font-bold">3,525</div>
      </Card>

      <Card className="col-span-2 row-span-3" title="OVERALL SCORE">
        <div className="flex items-center justify-center">
          <GaugeChart score={props.score} />
        </div>
        <p className="text-gray-400 text-sm mt-3">
          Last updated on 2 min before
        </p>
      </Card>

      <Card className="w-full px-8 text-left" title="AVG WATCH TIME">
        <div className="text-2xl font-semibold">3:25 min</div>
      </Card>
      <Card className="w-full px-8 text-left" title="PEAK VIEW TIME">
        <div className="text-2xl font-semibold">1:56 - 2:03 min</div>
      </Card>
      <Card className="w-full px-8 text-left" title="VIDEO COMPLETION RATE">
        <div className="text-2xl font-semibold">34%</div>
      </Card>
    </div>
  );
}
