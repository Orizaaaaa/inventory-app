// BarChartLeadSource.tsx
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import type { ChartConfiguration, ScriptableContext, TooltipItem } from "chart.js";

Chart.register(...registerables);

// ====== 12 bulan & nilai (≈ miliaran Rupiah, disesuaikan dengan contoh) ======
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const AMOUNTS = [
  4_500_000_000, // Jan
  2_300_000_000, // Feb
  4_000_000_000, // Mar
  1_600_000_000, // Apr
  3_000_000_000, // May
  2_200_000_000, // Jun
  4_100_000_000, // Jul
  2_100_000_000, // Aug
  3_400_000_000, // Sep
  2_400_000_000, // Oct
  900_000_000,   // Nov
  4_300_000_000, // Dec
];

// helper tampilkan nama bulan panjang untuk tooltip
const MONTH_LONG: Record<string, string> = {
  Jan: "January", Feb: "February", Mar: "March", Apr: "April",
  May: "May", Jun: "June", Jul: "July", Aug: "August",
  Sep: "September", Oct: "October", Nov: "November", Dec: "December",
};

export default function SingleBarSmallGradient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!;

    // ✅ Gradient: pekat di atas → memudar ke putih di bawah
    const gradientPerBar = (c: ScriptableContext<"bar">) => {
      const { chart, parsed } = c;
      const { ctx } = chart;
      const yScale = chart.scales.y as any;
      if (!yScale) return "#145A88";

      const val = (parsed as any)?.y ?? 0;
      const yTop = yScale.getPixelForValue(val);
      const yBase = yScale.getPixelForValue(0);
      if (!Number.isFinite(yTop) || !Number.isFinite(yBase)) return "#145A88";

      const g = ctx.createLinearGradient(0, yTop, 0, yBase);
      g.addColorStop(0.0,  "rgba(20, 90, 136, 0.98)");
      g.addColorStop(0.35, "rgba(20, 90, 136, 0.65)");
      g.addColorStop(0.65, "rgba(20, 90, 136, 0.28)");
      g.addColorStop(1.0,  "rgba(255, 255, 255, 0.00)");
      return g;
    };

    // hitung saran max sumbu Y ke kelipatan 1 miliar terdekat
    const max = Math.max(...AMOUNTS);
    const niceMax = Math.max(5_000_000_000, Math.ceil(max / 1_000_000_000) * 1_000_000_000);

    const config: ChartConfiguration<"bar", number[], string> = {
      type: "bar",
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: "Rp",
            data: AMOUNTS,
            backgroundColor: gradientPerBar,
            borderSkipped: false,
            borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 } as any,
            categoryPercentage: 0.7,
            barPercentage: 0.9,
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
              title(items) {
                const m = items[0]?.label ?? "";
                return `${MONTH_LONG[m as keyof typeof MONTH_LONG] ?? m} 2025`;
              },
              label(item: TooltipItem<"bar">) {
                const raw = typeof item.raw === "number" ? item.raw : Number(item.formattedValue);
                return `  Rp : ${raw.toLocaleString("id-ID")}`;
              },
            },
          },
          ...( { datalabels: { display: false } } as any ),
        },
        layout: { padding: { top: 8, right: 8, bottom: 8, left: 8 } },
        scales: {
          x: {
            offset: true, // bar ujung tidak kepotong
            grid: { display: false, drawOnChartArea: false, drawTicks: false },
            border: { display: false },
            ticks: { color: "#6b7280", font: { size: 14 } },
            title: {
              display: true,
              text: "Month",
              color: "#6b7280",
              font: { size: 14, weight: "normal" },
              padding: { top: 12 },
            },
          },
          y: {
            beginAtZero: true,
            suggestedMax: niceMax,
            ticks: {
              stepSize: 1_000_000_000,
              color: "#6b7280",
              font: { size: 13 },
              callback(value) {
                // tampilkan dengan pemisah titik: 1.000.000.000
                return Number(value).toLocaleString("id-ID");
              },
            },
            grid: { display: false, drawOnChartArea: false },
            border: { display: true, color: "#e5e7eb", width: 1 },
            title: {
              display: true,
              text: "Rp (Rupiah)",
              color: "#6b7280",
              font: { size: 14, weight: "normal" },
              padding: { bottom: 6 },
            },
          },
        },
        animation: { duration: 450 },
      },
    };

    const chart = new Chart(ctx, config);
    chartRef.current = chart;
    requestAnimationFrame(() => chart.update());

    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="w-full">
      <div style={{ height: 360 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
