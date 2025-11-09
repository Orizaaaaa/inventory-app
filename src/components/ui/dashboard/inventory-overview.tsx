import { Package, Truck, RotateCcw, X, MoreVertical } from "lucide-react";

// Dummy data untuk Inventory Overview
const inventoryOverviewData = [
  {
    title: "Orders Received",
    value: "4,236",
    change: {
      value: 26,
      type: "increase" as const,
    },
    icon: Package,
    iconColor: "text-blue-600",
    iconBg: "bg-gray-100",
  },
  {
    title: "Orders Shipped",
    value: "2,778",
    change: {
      value: 20,
      type: "decrease" as const,
    },
    icon: Truck,
    iconColor: "text-blue-600",
    iconBg: "bg-gray-100",
  },
  {
    title: "Orders Returned",
    value: "147",
    change: {
      value: 8,
      type: "decrease" as const,
    },
    icon: RotateCcw,
    iconColor: "text-blue-600",
    iconBg: "bg-gray-100",
  },
  {
    title: "Orders Canceled",
    value: "537",
    change: {
      value: 6,
      type: "increase" as const,
    },
    icon: X,
    iconColor: "text-blue-600",
    iconBg: "bg-gray-100",
  },
];

export default function InventoryOverview() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">Inventory Overview</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {inventoryOverviewData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-1 min-w-0">
                <p className="text-xs font-medium text-gray-600 truncate">{item.title}</p>
                <p className="text-xl font-bold text-gray-900">{item.value}</p>
                <div className="flex items-center space-x-1">
                  <span
                    className={`text-xs font-medium ${
                      item.change.type === "increase" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.change.type === "increase" ? "+" : ""}{item.change.value}%
                  </span>
                  {item.change.type === "increase" ? (
                    <svg
                      className="w-3 h-3 text-green-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3 h-3 text-red-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div className={`p-2 rounded-full ${item.iconBg} shrink-0`}>
                <item.icon className={`h-4 w-4 ${item.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

