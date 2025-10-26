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
      label: "Field Visit",
      data: [500, 540, 530, 550, 570, 560, 580, 590, 570, 580, 590, 600],
      backgroundColor: "#96E1EB",
      borderRadius: 3,
    },
    {
      label: "Google Ads",
      data: [550, 590, 580, 600, 620, 610, 630, 640, 620, 625, 635, 645],
      backgroundColor: "#19ACC1",
      borderRadius: 3,
    },
    {
      label: "Reference",
      data: [600, 640, 620, 630, 650, 640, 660, 670, 650, 660, 670, 680],
      backgroundColor: "#4896FE",
      borderRadius: 3,
    },
    {
      label: "Website",
      data: [650, 700, 680, 690, 710, 695, 720, 710, 700, 705, 715, 725],
      backgroundColor: "#887CFD",
      borderRadius: 3,
    },
    {
      label: "Event",
      data: [700, 750, 720, 740, 760, 730, 770, 780, 750, 760, 770, 780],
      backgroundColor: "#5347CE",
      borderRadius: 3,
    },
  ],
};

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
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
      mode: "index",
      intersect: false,
      backgroundColor: "#fff",
      titleColor: "#000",
      bodyColor: "#000",
      borderColor: "#ccc",
      borderWidth: 1,
      callbacks: {
        title: (context: any) => {
          const month = context[0].label; // contoh: "Mar"
          return `${month} 2025`;
        },
        label: (context: any) => {
          return `${context.dataset.label} : ${context.raw}`;
        },
      },
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
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
        drawOnChartArea: false,
        color: "#eee",
      },
    },
  },
};

export default function Multiple5Bar() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
