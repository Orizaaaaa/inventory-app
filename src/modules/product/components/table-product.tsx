import React, { useState } from "react";
import { Table, TBody, Th, THead, Tr, Td } from "@/components/ui/table";
import { formatRupiah } from "@/utils/format";
import { Button } from "@/components/ui/button";
import type { Product } from "../types/main";
import { Edit, EyeIcon } from "lucide-react";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import { useNavigate } from "@/routes";
import ButtonDeleteProduct from "./action/button-delete-product";
import LoaderData from "@/components/ui/loader-data";
interface TableProductProps {
    data: Product[]
    loading: boolean;
}

const TableProduct: React.FC<TableProductProps> = ({ loading,
    data,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();


    return (
        <div className="border-none shadow-none bg-white rounded-2xl w-full min-w-0 max-w-full ">
            <div className="p-3">
                <Table
                    className="[&_tr]:border-b [&_tr]:border-gray-200"
                >
                    <THead className="bg-slate-200 rounded-t-xl">
                        <Tr>
                            <Th className="font-medium  pr-9 ">Action</Th>
                            <Th className="font-medium">Image</Th>
                            <Th className="font-medium">Product Name</Th>
                            <Th className="font-medium ">Code</Th>
                            <Th className="font-medium hidden md:table-cell">Category</Th>
                            <Th className="font-medium hidden lg:table-cell">Variation</Th>
                            <Th className="w-20 font-medium">Unit</Th>
                            <Th className="font-medium text-center hidden sm:table-cell">Stock In</Th>
                            <Th className="font-medium text-center hidden sm:table-cell">Stock Out</Th>
                            <Th className="font-medium text-center">Total Stock</Th>
                            <Th className="font-medium hidden md:table-cell">Location</Th>
                            <Th className="font-medium text-right">HPP per Piece</Th>
                        </Tr>
                    </THead>
                    <TBody className="bg-white">
                        {data.map((item) => (
                            <Tr key={item.id || item._id}>
                                <Td className="flex gap-3">
                                    <Button onClick={() => navigate(`/data-produk/detail/${item._id}` as Parameters<typeof navigate>[0])} icon={<EyeIcon />} variant={"primary"} size={"iconMd"} />
                                    <Button onClick={() => navigate(`/data-produk/edit/${item._id}` as Parameters<typeof navigate>[0])} icon={<Edit />} variant={"warning"} size={"iconMd"} />
                                    <ButtonDeleteProduct id={item.id ?? item._id} />
                                </Td>
                                <Td className="whitespace-normal">{item.image_url && <img src={item.image_url} alt={item.product_name} className="w-10 h-10 object-cover rounded-full" />}</Td>
                                <Td className="whitespace-normal">{item.product_name}</Td>
                                <Td className="font-medium">{item.code}</Td>
                                <Td className="hidden md:table-cell">{item.category}</Td>
                                <Td className="hidden lg:table-cell">{item.variation}</Td>
                                <Td>{item.unit}</Td>
                                <Td className="text-center hidden sm:table-cell">{item.stock_in}</Td>
                                <Td className="text-center hidden sm:table-cell">{item.stock_out}</Td>
                                <Td className="text-center font-medium">{item.total_stock}</Td>
                                <Td className="hidden md:table-cell">{item.location}</Td>
                                <Td className="text-right">{formatRupiah(item.hpp_per_piece)}</Td>
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

export default TableProduct;
