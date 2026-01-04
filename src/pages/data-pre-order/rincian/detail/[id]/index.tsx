import React from "react";
import { useNavigate } from "@/routes";
import { useParams as useRRParams } from "react-router";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/back-button";
import { StatusPill } from "@/components/ui/data-display/status-pill";
import { formatRupiah } from "@/utils/format";
import { Dashboard } from "@/components/layout";
import { Edit, ShoppingCart, User, Calendar, DollarSign } from "lucide-react";
import type { PreOrderType } from "@/modules/data-pre-order/types/type";
import { useMemo } from "react";
import { formatDate } from "@/utils/format-date";

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

const getStatusColor = (status: string): "green" | "blue" | "purple" | "yellow" | "red" | "gray" => {
    const statusMap: Record<string, "green" | "blue" | "purple" | "yellow" | "red" | "gray"> = {
        "pending": "yellow",
        "confirmed": "blue",
        "processing": "purple",
        "ready": "green",
        "delivered": "gray",
        "cancelled": "red",
    };
    return statusMap[status.toLowerCase()] || "gray";
};

const DetailItem: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => {
    return (
        <div className="flex flex-col rounded-lg border border-gray-100 p-4">
            <span className="text-xs text-gray-500">{label}</span>
            <span className="text-base font-semibold text-black">{value ?? "-"}</span>
        </div>
    );
};

const PreOrderDetailPage: React.FC = () => {
    const params = (useRRParams() as unknown as { id?: string }) ?? {};
    const id = params?.id ?? "";
    const navigate = useNavigate();

    // TODO: Replace with API call - usePreOrderById
    const preOrder = useMemo(() => {
        return dummyPreOrders.find((po) => po.id === id || po._id === id);
    }, [id]);

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
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
                            ID pre-order tidak ditemukan.
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
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
                            Terjadi kesalahan saat memuat detail pre-order.
                        </div>
                    </div>
                </div>
            </Dashboard>
        );
    }

    const statusColor = getStatusColor(preOrder.status);

    return (
        <Dashboard>
            <div className="flex flex-col gap-4">
                <div className="rounded-xl shadow-sm p-6 bg-white">
                    <div className="flex justify-between items-start">
                        <div className="mb-6">
                            <BackButton />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={"gradien"}
                                icon={<Edit />}
                                text="Edit Pre-Order"
                                onClick={() =>
                                    navigate(`/data-pre-order/rincian/edit/${id}` as Parameters<typeof navigate>[0])
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            {preOrder.orderNumber}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2">
                            <StatusPill label={preOrder.status.toUpperCase()} color={statusColor} width="auto" />
                        </div>
                    </div>

                    {/* Order Information Section */}
                    <div className="mt-6 bg-linear-to-br from-yellow-500/25 to-yellow-50/50 rounded-xl p-6 border border-yellow-100/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[linear-gradient(90deg,#ffb300,#ffdd32)] rounded-lg">
                                <ShoppingCart className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Informasi Pre-Order</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem label="Order Number" value={preOrder.orderNumber} />
                            <DetailItem label="Status" value={preOrder.status.toUpperCase()} />
                        </div>
                    </div>

                    {/* Customer Information Section */}
                    <div className="mt-6 bg-linear-to-br from-blue-50/50 to-cyan-50/50 rounded-xl p-6 border border-blue-100/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-600 rounded-lg">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Informasi Pelanggan</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem label="Customer Name" value={preOrder.customerName} />
                            <DetailItem label="Customer Email" value={preOrder.customerEmail || "-"} />
                            <DetailItem label="Customer Phone" value={preOrder.customerPhone || "-"} />
                        </div>
                    </div>

                    {/* Date Information Section */}
                    <div className="mt-6 bg-linear-to-br from-green-50/50 to-emerald-50/50 rounded-xl p-6 border border-green-100/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Tanggal Order</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem 
                                label="Order Date" 
                                value={preOrder.orderDate ? formatDate(preOrder.orderDate, "long") : "-"} 
                            />
                            <DetailItem 
                                label="Delivery Date" 
                                value={preOrder.deliveryDate ? formatDate(preOrder.deliveryDate, "long") : "-"} 
                            />
                        </div>
                    </div>

                    {/* Amount & Notes Section */}
                    <div className="mt-6 bg-linear-to-br from-orange-50/50 to-amber-50/50 rounded-xl p-6 border border-orange-100/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-linear-to-br from-orange-500 to-amber-600 rounded-lg">
                                <DollarSign className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Total Amount & Notes</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem label="Total Amount" value={formatRupiah(preOrder.totalAmount)} />
                            <DetailItem label="Notes" value={preOrder.notes || "-"} />
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default PreOrderDetailPage;

