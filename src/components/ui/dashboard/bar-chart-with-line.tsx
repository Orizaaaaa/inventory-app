// BarChartWithLine.tsx
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import type { ChartConfiguration, ScriptableContext, TooltipItem } from "chart.js";

Chart.register(...registerables);

const idr = new Intl.NumberFormat("id-ID");
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const quantityData = [90, 150, 185, 50, 190, 95, 150, 210, 170, 65, 20, 175];
const rupiahData = [160_000, 180_000, 195_000, 170_000, 140_000, 120_000, 95_000, 75_000, 105_000, 125_000, 145_000, 165_000];

export default function BarChartWithLine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!;

    // ✅ Gradient per bar yang aman saat initial layout
    const gradientPerBar = (c: ScriptableContext<"bar">) => {
      const { chart, datasetIndex, dataIndex, parsed } = c;
      const { ctx, chartArea } = chart;

      // cari scale dari yAxisID dataset (default "y")
      const ds: any = chart.config.data.datasets[datasetIndex];
      const axisId = ds?.yAxisID || "y";
      const yScale = chart.scales[axisId];

      // jika belum siap (layout awal), pakai warna fallback dulu
      if (!chartArea || !yScale) return "rgba(24,116,165,0.3)";

      // ambil nilai y untuk bar ini
      let value =
        (parsed as any)?.y ??
        (Array.isArray(ds.data) ? (ds.data as number[])[dataIndex] : 0);

      if (!Number.isFinite(value)) value = 0;

      const yTop = yScale.getPixelForValue(value);
      const yBase = yScale.getPixelForValue(0);

      // guard: kalau masih non-finite, pakai fallback
      if (!Number.isFinite(yTop) || !Number.isFinite(yBase)) {
        return "rgba(24,116,165,0.3)";
      }

      const g = ctx.createLinearGradient(0, yTop, 0, yBase);
      g.addColorStop(0.0, "rgba(24,116,165,0.85)");
      g.addColorStop(0.55, "rgba(24,116,165,0.35)");
      g.addColorStop(0.85, "rgba(24,116,165,0.10)");
      g.addColorStop(1.0, "rgba(24,116,165,0.00)"); // transparan penuh di bawah
      return g;
    };

    const config: ChartConfiguration<"bar" | "line", number[], string> = {
      type: "bar",
      data: {
        labels: MONTHS,
        datasets: [
          {
            type: "bar",
            label: "Quantity",
            yAxisID: "yQty",
            data: quantityData,
            backgroundColor: gradientPerBar,
            borderSkipped: false,
            borderWidth: 0,
            barPercentage: 1,
            categoryPercentage: 1,
            order: 1,
          } as any,
          {
            type: "line",
            label: "Rupiah (Rp)",
            yAxisID: "yRp",
            data: rupiahData,
            tension: 0.35,
            borderWidth: 3,
            borderColor: "#6b00ff",
            pointBackgroundColor: "#6b00ff",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 5,
            order: 99, // line di depan bar
          } as any,
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: { bar: { borderWidth: 0 } },
        plugins: {
          legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8 } },
          tooltip: {
            backgroundColor: "#ffffff",
            titleColor: "#111827",
            bodyColor: "#111827",
            borderColor: "rgba(0,0,0,0.08)",
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
              title(items) { return `${items[0].label} 2025`; },
              label(item: TooltipItem<"bar" | "line">) {
                const v = typeof item.raw === "number" ? item.raw : Number(item.formattedValue);
                return item.dataset.yAxisID === "yQty"
                  ? ` Quantity : ${v}`
                  : ` Rupiah (Rp) : ${idr.format(v)}`;
              },
            },
          },
          ...({ datalabels: { display: false } } as any),
        },
        scales: {
          x: {
            offset: false,
            grid: { display: false, drawOnChartArea: false, drawTicks: false },
            border: { display: false },
            ticks: { color: "#6b7280" },
          },
          yQty: {
            type: "linear",
            position: "left",
            beginAtZero: true,
            title: { display: true, text: "Quantity" },
            grid: { display: false, drawOnChartArea: false },
            border: { display: false },
          },
          yRp: {
            type: "linear",
            position: "right",
            beginAtZero: true,
            title: { display: true, text: "Rupiah (RP)" },
            grid: { display: false, drawOnChartArea: false },
            border: { display: false },
            ticks: {
              callback: (v) => (typeof v === "number" ? `Rp ${idr.format(v)}` : String(v)),
            },
          },
        },
        animation: { duration: 400 },
      },
    };

    const chart = new Chart(ctx, config);
    chartRef.current = chart;

    // 🔁 trigger satu kali update setelah layout siap
    requestAnimationFrame(() => chart.update());

    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 320 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
