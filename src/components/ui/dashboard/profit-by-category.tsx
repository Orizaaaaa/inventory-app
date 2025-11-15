import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import type { ChartConfiguration } from "chart.js";
import { ChevronDown } from "lucide-react";

Chart.register(...registerables);

// Dummy data untuk Profit by Category
const profitData = [
  {
    label: "Women's Clothing",
    value: 400000,
    color: "#000000", // Black
  },
  {
    label: "Accessories",
    value: 250000,
    color: "#d97706", // Dark yellow
  },
  {
    label: "Men's Clothing",
    value: 200000,
    color: "#f59e0b", // Lighter yellow
  },
  {
    label: "Footwear",
    value: 100000,
    color: "#fbbf24", // Very light yellow
  },
  {
    label: "Children's Clothing",
    value: 50000,
    color: "#e5e7eb", // White/light gray
  },
];

const totalProfit = profitData.reduce((sum, item) => sum + item.value, 0);

export default function ProfitByCategory() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"doughnut", number[], string> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration<"doughnut", number[], string> = {
      type: "doughnut",
      data: {
        labels: profitData.map((item) => item.label),
        datasets: [
          {
            data: profitData.map((item) => item.value),
            backgroundColor: profitData.map((item) => item.color),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
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
            callbacks: {
              label: (context) => {
                const value = context.parsed as number;
                const percentage = ((value / totalProfit) * 100).toFixed(0);
                return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
              },
            },
          },
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
    <div className="bg-white rounded-xl p-4  border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">Profit by Category</h3>
          <p className="text-xs text-gray-500 mb-1">Total Annual Profit</p>
          <p className="text-2xl font-bold text-gray-900">
            ${totalProfit.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
          <span>This Year</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      {/* Chart and Legend */}
      <div className="flex items-center gap-6">
        {/* Donut Chart */}
        <div className="shrink-0" style={{ width: "200px", height: "200px" }}>
          <canvas ref={canvasRef} />
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {profitData.map((item, index) => {
            const percentage = ((item.value / totalProfit) * 100).toFixed(0);
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: item.color, flexShrink: 0 }}
                  />
                  <span className="text-sm text-gray-900 truncate">
                    {item.label}
                  </span>
                  <span className="text-xs text-gray-500 shrink-0">
                    ({percentage}%)
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900 ml-2 shrink-0">
                  ${item.value.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

