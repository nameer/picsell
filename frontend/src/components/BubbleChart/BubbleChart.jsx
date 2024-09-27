import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ClusteredBubbleChart = () => {
  // Sample data for clustered bubble chart
  const data = {
    datasets: [
      {
        label: "Group 1",
        data: [
          { x: 10, y: 20, r: 15 },
          { x: 30, y: 40, r: 25 },
          { x: 50, y: 10, r: 20 },
        ],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Group 2",
        data: [
          { x: 40, y: 50, r: 10 },
          { x: 20, y: 30, r: 15 },
          { x: 60, y: 40, r: 25 },
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Group 3",
        data: [
          { x: 60, y: 20, r: 30 },
          { x: 70, y: 50, r: 10 },
          { x: 80, y: 30, r: 20 },
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "X Axis",
        },
      },
      y: {
        title: {
          display: true,
          text: "Y Axis",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            return `(${tooltipItem.raw.x}, ${tooltipItem.raw.y}) - Size: ${tooltipItem.raw.r}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-[500px] p-4">
      <Bubble data={data} options={options} />
    </div>
  );
};

export default ClusteredBubbleChart;
