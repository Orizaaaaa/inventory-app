import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import type { ChartConfiguration } from "chart.js";
import { DateRangePickerComponent, type DateRange } from "@/components/ui/forms/date-range-picker";
import type { ValueTopProduct } from "@/modules/dashboard/types/main";

Chart.register(...registerables);

// Colors untuk kategori sesuai dummy data
const categoryColors = ["#000000", "#d97706", "#f59e0b", "#fbbf24", "#e5e7eb"];

interface ProfitByCategoryProps {
  data?: ValueTopProduct[];
}

export default function ProfitByCategory({ data = [] }: ProfitByCategoryProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"doughnut", number[], string> | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(new Date().getFullYear(), 0, 1), // Start of current year
    endDate: new Date(), // Current date
  });
  // Transform dan limit data ke 5 product top
  const profitData = (data || [])
    .slice(0, 5)
    .map((item, index) => ({
      label: item.name,
      value: item.total_value,
      color: categoryColors[index],
    }));

  const totalProfit = profitData.reduce((sum, item) => sum + item.value, 0);
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
                return `Rp ${value.toLocaleString('id-ID')} (${percentage}%)`;
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
  }, [profitData, totalProfit]);

  return (
    <div className="bg-white rounded-xl p-4  border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">Profit by Category</h3>
          <p className="text-xs text-gray-500 mb-1">Total Value</p>
          <p className="text-2xl font-bold text-gray-900">
            Rp {totalProfit.toLocaleString('id-ID')}
          </p>
        </div>
        <div className="w-[220px]">
          <DateRangePickerComponent
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={(range) => setDateRange(range)}
            placeholder="Pilih periode"
            containerClassName="mb-0 gap-1"
            fieldClassName="h-9"
            dateFormat="dd/MM/yyyy"
          />
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
                  Rp {item.value.toLocaleString('id-ID')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

