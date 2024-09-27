import React from "react";

import GaugeChart from "../components/guageChart/GaugeChart";
import DashboardLayout from "../layout/DashboardLayout";
import Card from "../components/Card";
import Button from "../components/Button/Button";

export default function VideoDetails() {
  return (
    <DashboardLayout>
      <div>
        <div>
          <p>Coffee Explainer Video</p>
        </div>

        <div>
          <Button color={"secondary"}>Share</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
