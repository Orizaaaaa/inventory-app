import React from "react";
import { Table, TBody, Th, THead, Tr, Td } from "@/components/ui/table";
import { formatRupiah } from "@/utils/format";
import { formatDate } from "@/utils/format-date";
import type { BarangKeluar } from "../types/main";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import LoaderData from "@/components/ui/loader-data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Edit, EyeIcon } from "lucide-react";
import ButtonDeleteBarangKeluar from "./action/button-delete-barang-keluar";

interface TableBarangKeluarProps {
    data: BarangKeluar[];
    loading: boolean;
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (rows: number) => void;
}

const TableBarangKeluar: React.FC<TableBarangKeluarProps> = ({
    loading,
    data,
    pagination,
    onPageChange,
    onRowsPerPageChange,
}) => {
    const navigate = useNavigate();
    return (
        <div className="border-none shadow-none bg-white rounded-2xl w-full min-w-0 max-w-full">
            <div className="p-3">
                <Table className="[&_tr]:border-b [&_tr]:border-gray-200">
                    <THead className="bg-slate-200 rounded-t-xl">
                        <Tr>
                            <Th className="font-medium">Action</Th>
                            <Th className="font-medium">Date</Th>
                            <Th className="font-medium">Note Number</Th>
                            <Th className="font-medium">Note Type</Th>
                            <Th className="font-medium">Customer</Th>
                            <Th className="font-medium">Product</Th>
                            <Th className="font-medium text-center">Qty Out</Th>
                            <Th className="font-medium">Unit</Th>
                            <Th className="font-medium">Location</Th>
                            <Th className="font-medium">Handled By</Th>
                            <Th className="font-medium text-right">Total HPP</Th>
                        </Tr>
                    </THead>
                    <TBody className="bg-white">
                        {data.map((item) => {
                            const itemId = item.id || item._id;
                            const noteType = typeof item.note_type_id === 'object' ? item.note_type_id?.name : '-';
                            const customer = typeof item.customer_id === 'object' ? item.customer_id?.name : '-';
                            const product = typeof item.product_id === 'object' ? item.product_id?.product_name : item.product_name_snapshot || '-';
                            const handledBy = typeof item.handled_by === 'object' ? item.handled_by?.name : '-';
                            
                            return (
                                <Tr key={itemId}>
                                    <Td className="flex gap-3">
                                        <Button onClick={() => navigate(`/warehouse/barang-keluar/detail/${itemId}`)} icon={<EyeIcon />} variant={"primary"} size={"iconMd"} />
                                        <Button onClick={() => navigate(`/warehouse/barang-keluar/update/${itemId}`)} icon={<Edit />} variant={"warning"} size={"iconMd"} />
                                        <ButtonDeleteBarangKeluar id={itemId} />
                                    </Td>
                                    <Td>{formatDate(item.date, "short")}</Td>
                                    <Td className="font-medium">{item.note_number}</Td>
                                    <Td>{noteType}</Td>
                                    <Td>{customer}</Td>
                                    <Td className="whitespace-normal">{product}</Td>
                                    <Td className="text-center">{item.qty_out}</Td>
                                    <Td>{item.unit_snapshot}</Td>
                                    <Td>{item.location}</Td>
                                    <Td>{handledBy}</Td>
                                    <Td className="text-right">{formatRupiah(item.total_hpp)}</Td>
                                </Tr>
                            );
                        })}
                    </TBody>
                </Table>
                <LoaderData data={data ?? []} loading={loading} colCount={10} rowCount={5} />
                {pagination && (
                    <PaginationWrapper
                        totalRows={pagination.totalItems}
                        page={pagination.currentPage}
                        rowsPerPage={pagination.itemsPerPage}
                        defaultRowsPerPage={pagination.itemsPerPage}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                )}
            </div>
        </div>
    );
};

export default TableBarangKeluar;

