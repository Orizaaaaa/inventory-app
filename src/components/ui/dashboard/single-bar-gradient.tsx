// BarChartLeadSource.tsx
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import type { ChartConfiguration, ScriptableContext, TooltipItem } from "chart.js";

Chart.register(...registerables);

const SOURCES = ["Event", "Website", "Reference", "Google Ads", "Field Visit"];
const QUANTITY = [150, 647, 330, 650, 780];

export default function SingleBarGradient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!;

    const gradientPerBar = (c: ScriptableContext<"bar">) => {
      const { chart, parsed } = c;
      const { ctx, chartArea } = chart;
      const yScale = chart.scales.y as any;
      if (!chartArea || !yScale) return "rgba(17,94,133,0.3)";

      const val = (parsed as any)?.y ?? 0;
      const yTop = yScale.getPixelForValue(val);
      const yBase = yScale.getPixelForValue(0);
      if (!Number.isFinite(yTop) || !Number.isFinite(yBase)) return "rgba(17,94,133,0.3)";

      const g = ctx.createLinearGradient(0, yTop, 0, yBase);
      g.addColorStop(0.0, "rgba(17, 94, 133, 0.95)");
      g.addColorStop(0.55, "rgba(17, 94, 133, 0.35)");
      g.addColorStop(0.85, "rgba(17, 94, 133, 0.10)");
      g.addColorStop(1.0, "rgba(17, 94, 133, 0.00)");
      return g;
    };

    const config: ChartConfiguration<"bar", number[], string> = {
      type: "bar",
      data: {
        labels: SOURCES,
        datasets: [
          {
            label: "Quantity",
            data: QUANTITY,
            backgroundColor: gradientPerBar,
            borderWidth: 0,
            borderSkipped: false,
            categoryPercentage: 1, // bar saling nempel
            barPercentage: 1,      // bar saling nempel
            // opsional: jika masih terlihat kepotong pada DPI tertentu, longgarkan clip sedikit:
            clip: { left: 6, right: 6, top: 0, bottom: 0 } as any,
          } as any,
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#ffffff",
            titleColor: "#111827",
            bodyColor: "#111827",
            borderColor: "rgba(0,0,0,0.08)",
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
              title(items) { return items[0]?.label ?? ""; },
              label(item: TooltipItem<"bar">) {
                const v = typeof item.raw === "number" ? item.raw : Number(item.formattedValue);
                return ` Quantity : ${v}`;
              },
            },
          },
          ...({ datalabels: { display: false } } as any),
        },
        layout: { padding: { top: 8, right: 8, bottom: 8, left: 8 } },
        scales: {
          x: {
            offset: true, // <<< bikin bar pertama & terakhir tampil penuh (tak terpotong)
            grid: { display: false, drawOnChartArea: false, drawTicks: false },
            border: { display: false },
            ticks: { color: "#6b7280", font: { size: 16 } },
            title: {
              display: true,
              text: "Source Leads",
              color: "#6b7280",
              font: { size: 16, weight: "normal" },
              padding: { top: 12 },
            },
          },
          y: {
            beginAtZero: true,
            suggestedMax: 1000,
            ticks: { stepSize: 200, color: "#6b7280", font: { size: 14 } },
            grid: { display: false, drawOnChartArea: false },
            border: { display: true, color: "#e5e7eb", width: 1 },
            title: {
              display: true,
              text: "Quantity",
              color: "#6b7280",
              font: { size: 16, weight: "normal" },
              padding: { bottom: 8 },
            },
          },
        },
        animation: { duration: 400 },
      },
    };

    const chart = new Chart(ctx, config);
    chartRef.current = chart;
    requestAnimationFrame(() => chart.update());

    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="w-fu">
      <div style={{ height: 360 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
