import { Dashboard } from "@/components/layout";
import TablePreOrder from "@/modules/data-pre-order/components/pre-order-table";
import { StatCard, StatCardGrid } from "@/components/ui/stat-cards";
import { ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PreOrderType } from "@/modules/data-pre-order/types/type";
import { useNavigate } from "@/routes";

// Dummy data
const dummyPreOrders: PreOrderType[] = [
    {
        id: "1",
        orderNumber: "PO-2024-001",
        customerName: "Budi Santoso",
        customerEmail: "budi@example.com",
        customerPhone: "081234567890",
        orderDate: "2024-01-15",
        deliveryDate: "2024-01-25",
        status: "confirmed",
        totalAmount: 2500000,
        notes: "Urgent order"
    },
    {
        id: "2",
        orderNumber: "PO-2024-002",
        customerName: "Siti Nurhaliza",
        customerEmail: "siti@example.com",
        customerPhone: "082345678901",
        orderDate: "2024-01-16",
        deliveryDate: "2024-01-26",
        status: "processing",
        totalAmount: 1800000,
        notes: ""
    },
    {
        id: "3",
        orderNumber: "PO-2024-003",
        customerName: "Ahmad Fauzi",
        customerEmail: "ahmad@example.com",
        customerPhone: "083456789012",
        orderDate: "2024-01-17",
        deliveryDate: "2024-01-27",
        status: "pending",
        totalAmount: 3200000,
        notes: "Payment pending"
    },
    {
        id: "4",
        orderNumber: "PO-2024-004",
        customerName: "Dewi Lestari",
        customerEmail: "dewi@example.com",
        customerPhone: "084567890123",
        orderDate: "2024-01-18",
        deliveryDate: "2024-01-28",
        status: "ready",
        totalAmount: 1500000,
        notes: ""
    },
    {
        id: "5",
        orderNumber: "PO-2024-005",
        customerName: "Rudi Hartono",
        customerEmail: "rudi@example.com",
        customerPhone: "085678901234",
        orderDate: "2024-01-10",
        deliveryDate: "2024-01-20",
        status: "delivered",
        totalAmount: 4500000,
        notes: "Delivered on time"
    },
    {
        id: "6",
        orderNumber: "PO-2024-006",
        customerName: "Maya Sari",
        customerEmail: "maya@example.com",
        customerPhone: "086789012345",
        orderDate: "2024-01-12",
        deliveryDate: "2024-01-22",
        status: "cancelled",
        totalAmount: 1200000,
        notes: "Cancelled by customer"
    }
];

export default function RincianPreOrder() {
    const navigate = useNavigate();
    const preOrders = dummyPreOrders;
    const isLoading = false;
    const totalPreOrders = preOrders.length;

    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Data Pre-Order", isCurrentPage: true, icon: ShoppingCart }
            ]}>
            <div className="space-y-6 mt-6">
                {/* Header Section */}
                <div className="bg-[linear-gradient(90deg,#ffb300,#ffdd32)] rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <ShoppingCart className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Pre-Order Management</h1>
                                <p className="text-yellow-50 mt-1">Manage your pre-orders</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <StatCardGrid>
                    <StatCard
                        title="Total Pre-Orders"
                        value={totalPreOrders}
                        icon={ShoppingCart}
                        iconColor="text-yellow-600"
                    />
                </StatCardGrid>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-yellow-600" />
                                Pre-Order List
                            </h2>
                            <Button text="Add Pre-Order" icon={<Plus />} variant={"yellow"} onClick={() => navigate("/data-pre-order/rincian/create" as Parameters<typeof navigate>[0])} />
                        </div>
                    </div>
                    <TablePreOrder data={preOrders} loading={isLoading} />
                </div>
            </div>
        </Dashboard>
    );
}
