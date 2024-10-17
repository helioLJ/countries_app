"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type PopulationData = {
  year: number;
  value: number;
};

type PopulationChartProps = {
  populationData: PopulationData[];
};

export default function PopulationChart({
  populationData,
}: PopulationChartProps) {
  const data = {
    labels: populationData.map((d) => d.year),
    datasets: [
      {
        label: "Population",
        data: populationData.map((d) => d.value),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Population Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value: number | string) {
            return typeof value === "number" ? value.toLocaleString() : value;
          },
        },
      },
    },
  };

  return <Line options={options} data={data} />;
}
