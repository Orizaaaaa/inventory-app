import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export interface DoughnutChartData {
  label: string;
  value: number;
  color: string;
}

export interface DoughnutChartProps {
  data: DoughnutChartData[];
  title?: string;
  centerTitle?: string;
  centerValue?: string | number;
  showCenterText?: boolean;
  showLegend?: boolean;
  showDataLabels?: boolean;
  showTooltip?: boolean;
  width?: string | number;
  height?: string | number;
  chartWidth?: string | number;
  chartHeight?: string | number;
  cutout?: string;
  borderRadius?: number;
  spacing?: number;
  legendPosition?: "top" | "bottom" | "left" | "right";
  legendAlign?: "start" | "center" | "end";
  legendDotSize?: number;
  legendPadding?: number;
  centerTitleColor?: string;
  centerValueColor?: string;
  centerTitleSize?: number;
  centerValueSize?: number;
  centerTitleWeight?: string;
  centerValueWeight?: string;
  dataLabelColor?: string;
  dataLabelSize?: number;
  dataLabelWeight?: string;
  dataLabelFormatter?: (value: number, total: number) => string;
  centerValueFormatter?: (total: number) => string;
}

export default function DoughnutChartRounded({
  data,
  title = "",
  centerTitle = "Total",
  centerValue,
  showCenterText = true,
  showLegend = true,
  showDataLabels = true,
  showTooltip = true,
  width = "300px",
  height = "300px",
  chartWidth = "200px",
  chartHeight = "200px",
  cutout = "60%",
  borderRadius = 4,
  spacing = 5,
  legendAlign = "center",
  legendDotSize = 4,
  legendPadding = 8,
  centerTitleColor = "#666",
  centerValueColor = "#111",
  centerTitleSize = 14,
  centerValueSize = 22,
  centerTitleWeight = "normal",
  centerValueWeight = "600",
  dataLabelColor = "#fff",
  dataLabelSize = 12,
  dataLabelWeight = "bold",
  dataLabelFormatter = (value: number, total: number) => `${Math.round((value / total) * 100)}%`,
  centerValueFormatter = (total: number) => total.toString(),
}: DoughnutChartProps) {

  // Transform data
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderRadius,
        spacing,
        cutout,
      },
    ],
  };

  // Calculate total
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const displayValue = centerValue !== undefined ? centerValue : centerValueFormatter(total);

  // Chart options
  const options: ChartOptions<"doughnut"> = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: showTooltip,
        backgroundColor: "#FFFFFF",
        titleColor: "#111827",
        bodyColor: "#111827",
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw as number;
            return `${label}: ${value}`;
          },
        },
      },
      datalabels: {
        display: showDataLabels,
        color: dataLabelColor,
        font: {
          weight: dataLabelWeight as any,
          size: dataLabelSize,
        },
        formatter: (value: number) => dataLabelFormatter(value, total),
      },
    },
  };

  // Center text plugin
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart: any) => {
      if (!showCenterText) return;

      const { ctx, chartArea } = chart;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Center title
      ctx.fillStyle = centerTitleColor;
      ctx.font = `${centerTitleWeight} ${centerTitleSize}px 'Open Sans'`;
      ctx.fillText(centerTitle, centerX, centerY - 14);

      // Center value
      ctx.fillStyle = centerValueColor;
      ctx.font = `${centerValueWeight} ${centerValueSize}px 'Open Sans'`;
      ctx.fillText(displayValue.toString(), centerX, centerY + 14);

      ctx.restore();
    },
  };

  return (
    <div style={{ width, height }}>
      {title && <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>{title}</h3>}

      <div style={{
        width: chartWidth,
        height: chartHeight,
        margin: "0 auto"
      }}>
        <Doughnut
          data={chartData}
          options={options}
          plugins={[centerTextPlugin]}
          width={typeof chartWidth === 'string' ? parseInt(chartWidth) : chartWidth}
          height={typeof chartHeight === 'string' ? parseInt(chartHeight) : chartHeight}
        />
      </div>

      {/* Custom Legend dengan Tailwind */}
      {showLegend && (
        <div className={`mt-5 flex flex-wrap ${legendAlign === "start" ? "justify-start" :
          legendAlign === "end" ? "justify-end" : "justify-center"
          }`} style={{ gap: `${legendPadding}px` }}>
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-gray-900">
              <div
                className="rounded-full"
                style={{
                  width: `${legendDotSize}px`,
                  height: `${legendDotSize}px`,
                  backgroundColor: item.color
                }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
