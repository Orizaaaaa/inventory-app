import React, { useState } from "react";
import { Table, TBody, Th, THead, Tr, Td } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import LoaderData from "@/components/ui/loader-data";
import type { BahanBakuType } from "../types/type";
import UpdateBahanBakuModal from "./action/update-bahan-baku-modal";
import ButtonDeleteBahanBaku from "./action/button-delete-bahan-baku";
interface TableBahanBakuProps {
    data: BahanBakuType[]
    loading: boolean;
}

const TableBahanBaku: React.FC<TableBahanBakuProps> = ({ loading,
    data,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedBahanBaku, setSelectedBahanBaku] = useState<BahanBakuType | null>(null);

    const handleEditClick = (bahanBaku: BahanBakuType) => {
        setSelectedBahanBaku(bahanBaku);
        setIsUpdateModalOpen(true);
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
                            <Th className="font-medium">Name</Th>
                            <Th className="font-medium ">Code</Th>
                            <Th className="font-medium ">Unit</Th>
                            <Th className="font-medium ">Stock</Th>
                            <Th className="font-medium ">Location</Th>
                            <Th className="font-medium ">Supplier</Th>
                        </Tr>
                    </THead>
                    <TBody className="bg-white">
                        {data.map((item) => {
                            const bahanBakuId = item.id || item._id || "";
                            return (
                                <Tr key={bahanBakuId}>
                                    <Td className="flex gap-3 w-32">
                                        <Button 
                                            icon={<Edit />} 
                                            variant={"warning"} 
                                            size={"iconMd"} 
                                            onClick={() => handleEditClick(item)}
                                        />
                                        <ButtonDeleteBahanBaku id={bahanBakuId} />
                                    </Td>
                                    <Td className="whitespace-normal">{item.name}</Td>
                                    <Td className="font-medium">{item.code}</Td>
                                    <Td className="font-medium">{item.unit}</Td>
                                    <Td className="font-medium">{item.stock}</Td>
                                    <Td className="font-medium">{item.location}</Td>
                                    <Td className="font-medium">{item.supplier || "-"}</Td>
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
            {selectedBahanBaku && (
                <UpdateBahanBakuModal
                    open={isUpdateModalOpen}
                    onOpenChange={setIsUpdateModalOpen}
                    bahanBaku={selectedBahanBaku}
                />
            )}
        </div>
    );
};

export default TableBahanBaku;



