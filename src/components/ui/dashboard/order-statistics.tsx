import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import type { ChartConfiguration } from "chart.js";
import { MoreVertical } from "lucide-react";

Chart.register(...registerables);

// Dummy data untuk Order Statistics
const labels = ["25", "26", "27", "28", "29", "30"];

const orderStatisticsData = {
  labels,
  datasets: [
    {
      label: "Orders",
      data: [120, 180, 200, 140, 160, 130],
      backgroundColor: "#1e40af", // Dark blue
      borderRadius: 4,
      barPercentage: 0.4,
      categoryPercentage: 0.8,
    },
    {
      label: "Delivered",
      data: [80, 140, 160, 100, 120, 90],
      backgroundColor: "#fbbf24", // Yellow
      borderRadius: 4,
      barPercentage: 0.4,
      categoryPercentage: 0.8,
    },
  ],
};

export default function OrderStatistics() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration<"bar", number[], string> = {
      type: "bar",
      data: orderStatisticsData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#ffffff",
            titleColor: "#111827",
            bodyColor: "#111827",
            borderColor: "rgba(0,0,0,0.08)",
            borderWidth: 1,
            padding: 12,
            displayColors: true,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: "#6b7280",
              font: {
                size: 10,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
        animation: {
          duration: 400,
        },
      },
    };

    const chart = new Chart(ctx, config);
    chartRef.current = chart;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900">Order Statistics</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
      <div style={{ height: "200px" }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

