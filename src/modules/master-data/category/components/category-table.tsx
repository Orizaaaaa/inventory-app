import React, { useState } from "react";
import { Table, TBody, Th, THead, Tr, Td } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, EyeIcon, Trash } from "lucide-react";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import LoaderData from "@/components/ui/loader-data";
import type { CategoryType } from "../types/types";

interface TableCategoryProps {
    data: CategoryType[]
    loading: boolean;
}

const TableCategory: React.FC<TableCategoryProps> = ({ loading,
    data,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    return (
        <div className="border-none shadow-none bg-white rounded-2xl w-full min-w-0 max-w-full ">
            <div className="p-3">
                <Table
                    className="[&_tr]:border-b [&_tr]:border-gray-200"
                >
                    <THead className="bg-slate-200 rounded-t-xl">
                        <Tr>
                            <Th className="font-medium w-52 ">Action</Th>
                            <Th className="font-medium">Name</Th>
                        </Tr>
                    </THead>
                    <TBody className="bg-white">
                        {data.map((item) => (
                            <Tr key={item.id}>
                                <Td className="flex gap-3 w-52">
                                    <Button icon={<EyeIcon />} variant={"primary"} size={"iconMd"} />
                                    <Button icon={<Edit />} variant={"warning"} size={"iconMd"} />
                                    <Button icon={<Trash />} variant={"dangers"} size={"iconMd"} />
                                </Td>
                                <Td className="whitespace-normal">{item.name}</Td>
                            </Tr>
                        ))}
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
        </div>
    );
};

export default TableCategory;
