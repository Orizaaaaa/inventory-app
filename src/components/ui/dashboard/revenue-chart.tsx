import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import type { ChartConfiguration, TooltipItem } from "chart.js";
import type { WeeklyRevenue } from "@/modules/dashboard/types/main";

Chart.register(...registerables);

// Default data labels
const defaultDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface RevenueChartProps {
  data?: WeeklyRevenue[];
}

// Format tanggal untuk tooltip
const getDateForDay = (dayIndex: number) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayIndex - dayOfWeek;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + diff);
  return targetDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function RevenueChart({ data = [] }: RevenueChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"line", number[], string> | null>(null);

  // Transform API data
  const chartData = (data || []).length > 0 ? data : [];
  const labels = chartData.length > 0 ? chartData.map((_, i) => defaultDays[i]) : defaultDays;
  const revenueData = chartData.length > 0 ? chartData.map(item => item.revenue) : [0, 0, 0, 0, 0, 0, 0];

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Create gradient for area fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "rgba(250, 204, 21, 0.3)");
    gradient.addColorStop(1, "rgba(250, 204, 21, 0)");

    const config: ChartConfiguration<"line", number[], string> = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Revenue",
            data: revenueData,
            borderColor: "#facc15",
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#facc15",
            pointBorderWidth: 2,
            pointHoverBackgroundColor: "#ffffff",
            pointHoverBorderColor: "#facc15",
            pointHoverBorderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#000000",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "rgba(255,255,255,0.1)",
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              title: (items: TooltipItem<"line">[]) => {
                const index = items[0].dataIndex;
                return getDateForDay(index);
              },
              label: (item: TooltipItem<"line">) => {
                const value = item.parsed.y;
                if (value === null || value === undefined) return "$0";
                return `$${value.toLocaleString()}`;
              },
            },
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
              color: "rgba(0,0,0,0.05)",
              drawTicks: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: "#6b7280",
              font: {
                size: 9,
              },
              callback: function (value) {
                if (typeof value === "number") {
                  if (value >= 1000) {
                    return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
                  }
                  return `$${value}`;
                }
                return value;
              },
            },
          },
        },
        animation: {
          duration: 400,
        },
        onHover: (_event, activeElements) => {
          // Hover handling can be added here if needed
          if (activeElements.length > 0) {
            // Handle hover state if needed
          }
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
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-900 mb-0.5">Weekly Revenue</h3>
        <p className="text-xs text-gray-500">Revenue overview for the past week</p>
      </div>
      <div style={{ height: "200px" }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

