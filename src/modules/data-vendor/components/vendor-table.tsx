import React, { useState } from "react";
import { Table, TBody, Th, THead, Tr, Td } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import LoaderData from "@/components/ui/loader-data";
import type { VendorType } from "../types/type";
import UpdateVendorModal from "./action/update-vendor-modal";
import ButtonDeleteVendor from "./action/button-delete-vendor";
interface TableVendorProps {
    data: VendorType[]
    loading: boolean;
}

const TableVendor: React.FC<TableVendorProps> = ({ loading,
    data,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState<VendorType | null>(null);

    const handleEditClick = (vendor: VendorType) => {
        setSelectedVendor(vendor);
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
                            <Th className="font-medium ">Email</Th>
                            <Th className="font-medium ">Phone</Th>
                            <Th className="font-medium ">Address</Th>
                        </Tr>
                    </THead>
                    <TBody className="bg-white">
                        {data.map((item) => {
                            const vendorId = item.id || item._id || "";
                            return (
                                <Tr key={vendorId}>
                                    <Td className="flex gap-3 w-32">
                                        <Button 
                                            icon={<Edit />} 
                                            variant={"warning"} 
                                            size={"iconMd"} 
                                            onClick={() => handleEditClick(item)}
                                        />
                                        <ButtonDeleteVendor id={vendorId} />
                                    </Td>
                                    <Td className="whitespace-normal">{item.name}</Td>
                                    <Td className="font-medium">{item.email}</Td>
                                    <Td className="font-medium">{item.phone}</Td>
                                    <Td className="font-medium">{item.address}</Td>
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
            {selectedVendor && (
                <UpdateVendorModal
                    open={isUpdateModalOpen}
                    onOpenChange={setIsUpdateModalOpen}
                    vendor={selectedVendor}
                />
            )}
        </div>
    );
};

export default TableVendor;

