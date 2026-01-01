import React, { useState } from "react";
import { Table, TBody, Th, THead, Tr, Td } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import LoaderData from "@/components/ui/loader-data";
import type { PreOrderType } from "../types/type";
import UpdatePreOrderModal from "./action/update-pre-order-modal";
import ButtonDeletePreOrder from "./action/button-delete-pre-order";
interface TablePreOrderProps {
    data: PreOrderType[]
    loading: boolean;
}

const TablePreOrder: React.FC<TablePreOrderProps> = ({ loading,
    data,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedPreOrder, setSelectedPreOrder] = useState<PreOrderType | null>(null);

    const handleEditClick = (preOrder: PreOrderType) => {
        setSelectedPreOrder(preOrder);
        setIsUpdateModalOpen(true);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        const statusColors: Record<string, string> = {
            "pending": "bg-yellow-100 text-yellow-800",
            "confirmed": "bg-blue-100 text-blue-800",
            "processing": "bg-purple-100 text-purple-800",
            "ready": "bg-green-100 text-green-800",
            "delivered": "bg-gray-100 text-gray-800",
            "cancelled": "bg-red-100 text-red-800",
        };
        const colorClass = statusColors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="border-none shadow-none bg-white rounded-2xl w-full min-w-0 max-w-full ">
            <div className="p-3">
                <Table
                    className="[&_tr]:border-b [&_tr]:border-gray-200"
                >
                    <THead className="bg-slate-200 rounded-t-xl">
                        <Tr>
                            <Th className="font-medium w-32 ">Action</Th>
                            <Th className="font-medium">Order Number</Th>
                            <Th className="font-medium ">Customer</Th>
                            <Th className="font-medium ">Order Date</Th>
                            <Th className="font-medium ">Delivery Date</Th>
                            <Th className="font-medium ">Status</Th>
                            <Th className="font-medium ">Total Amount</Th>
                        </Tr>
                    </THead>
                    <TBody className="bg-white">
                        {data.map((item) => {
                            const preOrderId = item.id || item._id || "";
                            return (
                                <Tr key={preOrderId}>
                                    <Td className="flex gap-3 w-32">
                                        <Button 
                                            icon={<Edit />} 
                                            variant={"warning"} 
                                            size={"iconMd"} 
                                            onClick={() => handleEditClick(item)}
                                        />
                                        <ButtonDeletePreOrder id={preOrderId} />
                                    </Td>
                                    <Td className="font-medium">{item.orderNumber}</Td>
                                    <Td className="whitespace-normal">
                                        <div>
                                            <div className="font-medium">{item.customerName}</div>
                                            {item.customerPhone && (
                                                <div className="text-sm text-gray-500">{item.customerPhone}</div>
                                            )}
                                        </div>
                                    </Td>
                                    <Td className="font-medium">{formatDate(item.orderDate)}</Td>
                                    <Td className="font-medium">{formatDate(item.deliveryDate)}</Td>
                                    <Td>{getStatusBadge(item.status)}</Td>
                                    <Td className="font-medium">{formatCurrency(item.totalAmount)}</Td>
                                </Tr>
                            );
                        })}
                    </TBody>
                </Table>
                <LoaderData data={data ?? []} loading={loading} colCount={10} rowCount={5} />
                <PaginationWrapper
                    totalRows={data.length}
                    page={currentPage}
                    rowsPerPage={rowsPerPage}
                    defaultRowsPerPage={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageChange={setCurrentPage}
                    onRowsPerPageChange={setRowsPerPage}
                />
            </div>
            {selectedPreOrder && (
                <UpdatePreOrderModal
                    open={isUpdateModalOpen}
                    onOpenChange={setIsUpdateModalOpen}
                    preOrder={selectedPreOrder}
                />
            )}
        </div>
    );
};

export default TablePreOrder;

