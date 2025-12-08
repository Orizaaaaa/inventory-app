import React from "react";
import { Table, TBody, Th, THead, Tr, Td } from "@/components/ui/table";
import { formatRupiah } from "@/utils/format";
import { formatDate } from "@/utils/format-date";
import type { BarangMasuk } from "../types/main";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import LoaderData from "@/components/ui/loader-data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Edit, EyeIcon } from "lucide-react";
import ButtonDeleteBarangMasuk from "./action/button-delete-product";

interface TableBarangMasukProps {
    data: BarangMasuk[];
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

const TableBarangMasuk: React.FC<TableBarangMasukProps> = ({
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
                            <Th className="font-medium">Supplier</Th>
                            <Th className="font-medium">Product</Th>
                            <Th className="font-medium text-center">Qty In</Th>
                            <Th className="font-medium">Unit</Th>
                            <Th className="font-medium">Storage Location</Th>
                            <Th className="font-medium">Entered By</Th>
                            <Th className="font-medium text-right">HPP</Th>
                        </Tr>
                    </THead>
                    <TBody className="bg-white">
                        {data.map((item) => (
                            <Tr key={item.id || item._id}>
                                <Td className="flex gap-3">
                                    <Button onClick={() => navigate(`/warehouse/barang-masuk/detail/${item.id ?? item._id}`)} icon={<EyeIcon />} variant={"primary"} size={"iconMd"} />
                                    <Button onClick={() => navigate(`/warehouse/barang-masuk/update/${item.id ?? item._id}`)} icon={<Edit />} variant={"warning"} size={"iconMd"} />
                                    <ButtonDeleteBarangMasuk id={item.id ?? item._id} />
                                </Td>
                                <Td>{formatDate(item.date, "short")}</Td>
                                <Td className="font-medium">{item.note_number}</Td>
                                <Td>{item.note_type?.name || "-"}</Td>
                                <Td>{item.supplier?.name || "-"}</Td>
                                <Td className="whitespace-normal">{item.product?.product_name || "-"}</Td>
                                <Td className="text-center">{item.qty_in}</Td>
                                <Td>{item.unit}</Td>
                                <Td>{item.storage_location?.name || "-"}</Td>
                                <Td>{item.entered_by?.name || "-"}</Td>
                                <Td className="text-right">{formatRupiah(item.hpp)}</Td>
                            </Tr>
                        ))}
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

export default TableBarangMasuk;

