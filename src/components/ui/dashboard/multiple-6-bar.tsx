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
      label: "Raw Leads",
      data: [500, 540, 530, 550, 570, 560, 580, 590, 570, 580, 590, 600],
      backgroundColor: "#887CFD",
      borderRadius: 3,
    },
    {
      label: "Potential Leads",
      data: [450, 470, 460, 480, 490, 480, 500, 510, 495, 500, 510, 520],
      backgroundColor: "#5347CE",
      borderRadius: 3,
    },
    {
      label: "Introduction",
      data: [400, 420, 410, 430, 440, 430, 450, 460, 445, 450, 460, 470],
      backgroundColor: "#4896FE",
      borderRadius: 3,
    },
    {
      label: "Offering",
      data: [350, 370, 360, 380, 390, 380, 400, 410, 395, 400, 410, 420],
      backgroundColor: "#19ACC1",
      borderRadius: 3,
    },
    {
      label: "Deals/Sales Order",
      data: [300, 320, 310, 330, 340, 330, 350, 360, 345, 350, 360, 370],
      backgroundColor: "#96E1EB",
      borderRadius: 3,
    },
    {
      label: "Close Won",
      data: [250, 270, 260, 280, 290, 280, 300, 310, 295, 300, 310, 320],
      backgroundColor: "#FAB55A",
      borderRadius: 3,
    },
    {
      label: "Close Lost",
      data: [200, 220, 210, 230, 240, 230, 250, 260, 245, 250, 260, 270],
      backgroundColor: "#A98D7A",
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

export default function Multiple6Bar() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
