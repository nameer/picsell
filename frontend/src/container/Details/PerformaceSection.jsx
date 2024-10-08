import React from "react";
import Card from "../../components/Card";
import { HotLead, ColdLead, WarmLead } from "../../assets/icons";
import GaugeChart from "../../components/scoreChart/GaugeChart";

export default function PerformanceSection(props) {
  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-4">
      <Card
        className="w-full px-8 text-left"
        title="HOT LEADS"
        icon={<HotLead />}
      >
        <div className="text-3xl font-bold">{props.leads.positive}</div>
      </Card>
      <Card
        className="w-full px-8 text-left"
        title="WARM LEADS"
        icon={<WarmLead />}
      >
        <div className="text-3xl font-bold">{props.leads.neutral}</div>
      </Card>
      <Card
        className="w-full px-8 text-left"
        title="COLD LEADS"
        icon={<ColdLead />}
      >
        <div className="text-3xl font-bold">{props.leads.negative}</div>
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
        <div className="text-xl font-semibold">
          {!(
            props.leads.negative ||
            props.leads.positive ||
            props.leads.neutral
          )
            ? "-"
            : "3:25 min"}
        </div>
      </Card>
      <Card className="w-full px-8 text-left" title="PEAK VIEW TIME">
        <div className="text-xl font-semibold">
          {!(
            props.leads.negative ||
            props.leads.positive ||
            props.leads.neutral
          )
            ? "-"
            : "0:12 - 0:56 min"}
        </div>
      </Card>
      <Card className="w-full px-8 text-left" title="VIDEO COMPLETION RATE">
        <div className="text-xl font-semibold">
          {!(
            props.leads.negative ||
            props.leads.positive ||
            props.leads.neutral
          )
            ? "-"
            : "4%"}
        </div>
      </Card>
    </div>
  );
}
