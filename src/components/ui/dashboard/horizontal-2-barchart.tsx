import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";
import type { JSX } from "react";

/* ====================== Types ====================== */
export type ChartItemDual = { label: string; onTime: number | string; overdue: number | string };
export type ChartItemMono = { label: string; value: number | string };
type InputItem = ChartItemDual | ChartItemMono;

type Props = {
  data?: InputItem[];           // ← bisa {label,value} atau {label,onTime,overdue}
  monthLabel?: string;
};

/* ====================== Default ====================== */
const DEFAULT_DATA: InputItem[] = [
  { label: "Raw Leads",    onTime: 83, overdue: 0 },
  { label: "Potential",    onTime: 78, overdue: 10 },
  { label: "Introduction", onTime: 75, overdue: 3 },
  { label: "Offering",     onTime: 68, overdue: 3 },
  { label: "Sales Order",  onTime: 57, overdue: 3 },
  { label: "Closed Won",   onTime: 55, overdue: 4 },
  { label: "Closed Lost",  onTime: 58, overdue: 3 },
];

/* ====================== Helpers ====================== */
function toNum(v: any): number {
  const n = typeof v === "string" ? Number(v) : v;
  return Number.isFinite(n) ? n : 0;
}
function normalize(items: InputItem[]): { label: string; onTime: number; overdue: number }[] {
  return items.map((it) => {
    // format dual
    if ("onTime" in it || "overdue" in it) {
      return { label: it.label, onTime: toNum((it as ChartItemDual).onTime), overdue: toNum((it as ChartItemDual).overdue) };
    }
    // format mono
    const mono = it as ChartItemMono;
    return { label: mono.label, onTime: toNum(mono.value), overdue: 10 };
  });
}
function OnTimeLabel(props: any) {
  const { x, y, width, height, value } = props;
  if (!value || !width) return null;
  return (
    <text x={x + width + 8} y={y + height / 2} textAnchor="start" dominantBaseline="central" fontSize={12} fill="#0F172A" fontWeight={600}>
      {value}
    </text>
  );
}
function OverdueLabel(props: any) {
  const { x, y, width, height, value } = props;
  if (!value || !width) return null;
  return (
    <text x={x + width - 6} y={y + height / 2} textAnchor="end" dominantBaseline="central" fontSize={12} fill="#FFFFFF" fontWeight={700}>
      {value}
    </text>
  );
}

/* ====================== Component ====================== */
export function HorizontalTwoBarChart({
  data = DEFAULT_DATA,
}: Props): JSX.Element {
  const rows = normalize(data);                                // ✅ adapt dua format
  const chartHeight = Math.max(220, rows.length * 48);

  const totals = rows.map(d => d.onTime + d.overdue);
  const maxX = Math.max(1, ...totals);                         // ✅ domain X aman

  return (
    <div className="w-full rounded-2xl bg-white p-4">
      {/* Header */}

      {/* Chart */}
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={rows}
          layout="vertical"
          margin={{ top: 8, right: 48, left: 8, bottom: 0 }}
          barSize={20}
          barCategoryGap="32%"
        >
          <ReferenceLine x={0} stroke="#E11D28" strokeWidth={3} ifOverflow="extendDomain"
            label={{ value: "0", position: "top", fill: "#E11D28", fontSize: 12 }} />

          <XAxis type="number" domain={[0, maxX]} hide />        {/* ❗ tanpa dataKey */}
          <YAxis
            type="category"
            dataKey="label"
            width={120}
            tickMargin={10}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={{ stroke: "#E5E7EB", strokeWidth: 2 }}
            tick={{ fontSize: 12, fill: "#667085" }}
          />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }}
            wrapperStyle={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)", borderRadius: 12 }}
            contentStyle={{ borderRadius: 12, border: "1px solid #eee" }} />

          {/* Order: merah kiri, biru kanan */}
          <Bar dataKey="overdue" stackId="s" fill="#E11D28" radius={[4, 0, 0, 4]} label={<OverdueLabel />} />
          <Bar dataKey="onTime"  stackId="s" fill="#145A88" radius={[0, 4, 4, 0]} label={<OnTimeLabel />} />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-6">
        <span className="inline-flex items-center gap-2 text-[13px] text-gray-700">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#145A88" }} />
          On Time
        </span>
        <span className="inline-flex items-center gap-2 text-[13px] text-gray-700">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#E11D28" }} />
          SLA Overdue
        </span>
      </div>
    </div>
  );
}
