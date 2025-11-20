import React, { useState } from "react";
import { Table, TBody, Th, THead, Tr, Td } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import LoaderData from "@/components/ui/loader-data";
import type { CategoryType } from "../types/types";
import UpdateCategoryModal from "./action/update-category-modal";
import ButtonDeleteCategory from "./action/button-delete-category";

interface TableCategoryProps {
    data: CategoryType[]
    loading: boolean;
}

const TableCategory: React.FC<TableCategoryProps> = ({ loading,
    data,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

    const handleEditClick = (category: CategoryType) => {
        setSelectedCategory(category);
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
                        </Tr>
                    </THead>
                    <TBody className="bg-white">
                        {data.map((item) => {
                            const categoryId = item.id || item._id || "";
                            return (
                                <Tr key={categoryId}>
                                    <Td className="flex gap-3 w-32">
                                        <Button
                                            icon={<Edit />}
                                            variant={"warning"}
                                            size={"iconMd"}
                                            onClick={() => handleEditClick(item)}
                                        />
                                        <ButtonDeleteCategory id={categoryId} />
                                    </Td>
                                    <Td className="whitespace-normal">{item.name}</Td>
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
            {selectedCategory && (
                <UpdateCategoryModal
                    open={isUpdateModalOpen}
                    onOpenChange={setIsUpdateModalOpen}
                    category={selectedCategory}
                />
            )}
        </div>
    );
};

export default TableCategory;
