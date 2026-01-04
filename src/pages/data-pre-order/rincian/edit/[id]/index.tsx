import { Dashboard } from "@/components/layout";
import BackButton from "@/components/ui/back-button";
import PreOrderForm from "@/modules/data-pre-order/components/form/pre-order-form";
import { useNavigate } from "@/routes";
import { useMemo } from "react";
import { useCurrentRoute } from "@/hooks/use-current-route";
import type { PreOrderType } from "@/modules/data-pre-order/types/type";

// Dummy data - should be replaced with API call
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

export default function EditPreOrderPage() {
    const navigate = useNavigate();
    const pathname = useCurrentRoute();

    // Get id from route parameter (from pathname)
    const id = useMemo(() => {
        const match = pathname.match(/\/data-pre-order\/rincian\/edit\/([^/]+)/);
        return match ? match[1] : "";
    }, [pathname]);

    // TODO: Replace with API call - usePreOrderById
    const preOrder = useMemo(() => {
        return dummyPreOrders.find((po) => po.id === id || po._id === id);
    }, [id]);

    const handleUpdateSuccess = () => {
        navigate("/data-pre-order/rincian" as Parameters<typeof navigate>[0]);
    };

    if (!id) {
        return (
            <Dashboard>
                <div className="flex flex-col gap-4">
                    <div className="rounded-xl shadow-sm p-6 bg-white">
                        <div className="flex justify-between items-start">
                            <div className="mb-6">
                                <BackButton />
                            </div>
                        </div>
                        <div className="text-center py-8">
                            <p className="text-red-500">ID pre-order tidak ditemukan</p>
                        </div>
                    </div>
                </div>
            </Dashboard>
        );
    }

    if (!preOrder) {
        return (
            <Dashboard>
                <div className="flex flex-col gap-4">
                    <div className="rounded-xl shadow-sm p-6 bg-white">
                        <div className="flex justify-between items-start">
                            <div className="mb-6">
                                <BackButton />
                            </div>
                        </div>
                        <div className="text-center py-8">
                            <p className="text-red-500">Gagal memuat data pre-order</p>
                        </div>
                    </div>
                </div>
            </Dashboard>
        );
    }

    return (
        <Dashboard>
            <div className="flex flex-col gap-4">
                <div className="rounded-xl shadow-sm p-6 bg-white">
                    <div className="flex justify-between items-start">
                        <div className="mb-6">
                            <BackButton />
                        </div>
                    </div>

                    <PreOrderForm
                        mode="edit"
                        initialData={preOrder}
                        preOrderId={id}
                        onUpdateSuccess={handleUpdateSuccess}
                    />
                </div>
            </div>
        </Dashboard>
    );
}

