import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const data = {
  labels,
  datasets: [
    {
      label: "Potential Leads",
      data: [300, 300, 800, 350, 450, 900, 300, 550, 650, 200, 350, 650],
      backgroundColor: "#96E1EB",
      borderRadius: 6,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: false,
    },
    legend: {
      display: true,
      position: "bottom" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        font: {
          size: 12,
          family: "Open Sans",
        },
      },
    },
    tooltip: {
      enabled: true,
      mode: "index" as const,
      intersect: false,
      backgroundColor: "#fff",
      titleColor: "#000",
      bodyColor: "#000",
      borderColor: "#ddd",
      borderWidth: 1,
      callbacks: {
        title: (context: any) => {
          const monthMap: Record<string, string> = {
            Jan: "January",
            Feb: "February",
            Mar: "March",
            Apr: "April",
            May: "May",
            Jun: "June",
            Jul: "July",
            Aug: "August",
            Sep: "September",
            Oct: "October",
            Nov: "November",
            Dec: "December",
          };

          const month = context[0].label; // label sumbu X (contoh: "Mar")
          return `${monthMap[month]} 2025`; // hasil: "March 2025"
        },
        label: (context: any) => `Quantity : ${context.raw}`
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // hilangkan garis vertikal
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 200,
        color: "#000",
      },
      grid: {
        drawTicks: true,
        drawOnChartArea: false, // hilangkan garis horizontal
        color: "#eee",
      },
    },
  },
};

export default function SingleBarChart() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
