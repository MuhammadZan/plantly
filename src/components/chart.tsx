import React, { useRef } from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip
);

const DrawChart = ({
  tooltipText,
  labels,
  data,
  colors = "#588534",
}: {
  tooltipText: string;
  labels: string[];
  data: any;
  colors?: string | string[];
  title: string;
}) => {
  const chartRef = useRef<any | null>(null);
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: tooltipText.toUpperCase(),
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw} ${tooltipText}`,
        },
      },
    },
  };
  const drawChart = () => {
    return (
      <Line
        ref={chartRef}
        data={{
          labels,
          datasets: [
            {
              label: tooltipText,
              data,
              fill: true,
              borderColor: colors,
              tension: 0.3,
              borderWidth: 2,
            },
          ],
        }}
        options={chartOptions as any}
      />
    );
  };

  return <div className="w-full h-[300px] mt-5">{drawChart()}</div>;
};

export default DrawChart;
