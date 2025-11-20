import React, { useState } from "react";
import { Table, TBody, Th, THead, Tr, Td } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import LoaderData from "@/components/ui/loader-data";
import type { SupplierType } from "../types/type";
import UpdateSupplierModal from "./action/update-supplier-modal";
import ButtonDeleteSupplier from "./action/button-delete-supplier";
interface TableSupplierProps {
    data: SupplierType[]
    loading: boolean;
}

const TableSupplier: React.FC<TableSupplierProps> = ({ loading,
    data,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierType | null>(null);

    const handleEditClick = (supplier: SupplierType) => {
        setSelectedSupplier(supplier);
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
                            <Th className="font-medium ">No Telpon </Th>
                        </Tr>
                    </THead>
                    <TBody className="bg-white">
                        {data.map((item) => {
                            const supplierId = item.id || item._id || "";
                            return (
                                <Tr key={supplierId}>
                                    <Td className="flex gap-3 w-32">
                                        <Button 
                                            icon={<Edit />} 
                                            variant={"warning"} 
                                            size={"iconMd"} 
                                            onClick={() => handleEditClick(item)}
                                        />
                                        <ButtonDeleteSupplier id={supplierId} />
                                    </Td>
                                    <Td className="whitespace-normal">{item.name}</Td>
                                    <Td className="font-medium">{item.phone}</Td>
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
            {selectedSupplier && (
                <UpdateSupplierModal
                    open={isUpdateModalOpen}
                    onOpenChange={setIsUpdateModalOpen}
                    supplier={selectedSupplier}
                />
            )}
        </div>
    );
};

export default TableSupplier;
