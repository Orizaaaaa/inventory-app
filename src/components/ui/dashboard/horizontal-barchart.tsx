import { Bar, BarChart, XAxis, YAxis, LabelList, Tooltip } from "recharts";
import type { JSX } from "react";

// ✅ tipe data chart
export type ChartItem = {
  label: string;
  value: number;
};

type HorizontalBarChartProps = {
  data?: ChartItem[];
  width?: number;
  barColor?: string;
};

// ✅ default data
const defaultData: ChartItem[] = [
  { label: "Zaki W", value: 83 },
  { label: "Tono H", value: 78 },
  { label: "Ageng P", value: 75 },
  { label: "Ratih K", value: 68 },
  { label: "Budi S", value: 55 },
];

export function HorizontalBarChart({
  data = defaultData,
  width = 600,
  barColor = "#1874A5",
}: HorizontalBarChartProps): JSX.Element {
  return (
    <div className="w-full">
      <BarChart
        width={width}
        height={data.length * 40} // otomatis menyesuaikan jumlah data
        data={data}
        layout="vertical"
        margin={{ left: -30, right: 40 }}
        barSize={20}
        barCategoryGap="30%"
      >
        {/* axis */}
        <XAxis
          type="number"
          dataKey="value"
          domain={[0, "dataMax"]}
          hide
          padding={{ left: 10 }}
        />

        <YAxis
          dataKey="label"
          type="category"
          width={120}
          tickLine={{ stroke: "#ccc" }}
          axisLine={{ stroke: "#ccc" }}
          tickMargin={10}
          tick={{ fontSize: 12, fill: "#667085" }}
        />

        {/* tooltip bawaan recharts */}
        <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />

        {/* bar */}
        <Bar dataKey="value" fill={barColor} radius={3}>
          <LabelList
            dataKey="value"
            position="right"
            className="fill-black text-sm"
          />
        </Bar>
      </BarChart>
    </div>
  );
}
