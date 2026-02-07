import { useState } from "react";
import { Dashboard } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import DashboardStats from "@/components/ui/dashboard/dashboard-stats";
import {
    inventoryStats,
} from "@/data/inventory-data";
import TableProduct from "@/modules/product/components/table-product";
import { useProduct } from "@/modules/product/api/get-all-product";
import { useNavigate } from "@/routes";
import { Package, Plus, } from "lucide-react";

export default function DataProduk() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");

    const { data: productResponse, isLoading, isError } = useProduct({
        params: {
            page,
            limit,
            search,
        } as any,
    });
    console.log(isError);

    const products = productResponse?.data?.products || [];
    const pagination = productResponse?.data?.pagination;

    const summaryForStats = {
        total_product: inventoryStats.totalProducts,
        total_product_low_stok: inventoryStats.lowStockItems,
        total_hpp_barang_masuk: inventoryStats.totalValue,
        total_hpp_barang_keluar: 0,
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1); // Reset to page 1 when searching
    };
    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Products", isCurrentPage: true, icon: Package }
            ]}>
            <div className="space-y-6 mt-6">
                {/* Main Stats Cards */}
                <DashboardStats summary={summaryForStats} />
                <div className="bg-white rounded-t-2xl">
                    <div className="flex justify-end pt-4 px-4">
                        <Button onClick={() => navigate("/data-produk/create" as Parameters<typeof navigate>[0])} icon={<Plus />} variant={"yellow"} text={" Add Product"} />
                    </div>
                    <div className="flex justify-between px-4 py-4">
                        <SearchInput
                            placeholder="Search Product"
                            value={search}
                            onChange={handleSearchChange}
                        />
                        {/* <div className="flex gap-3">
                            <FilterSelect
                                placeholder="All Status"
                                options={[
                                    { label: "SUBMITTED", value: "SUBMITTED" },
                                    { label: "APPROVED", value: "APPROVED" },
                                ]}
                            />
                            <FilterSelect
                                placeholder="Category"
                                options={[
                                    { label: "SUBMITTED", value: "SUBMITTED" },
                                    { label: "APPROVED", value: "APPROVED" },
                                ]}
                            />
                            <FilterSelect
                                placeholder="Stock Status"
                                options={[
                                    { label: "SUBMITTED", value: "SUBMITTED" },
                                    { label: "APPROVED", value: "APPROVED" },
                                ]}
                            />
                        </div> */}
                    </div>
                    <TableProduct
                        loading={isLoading}
                        data={products}
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </div>
            </div>
        </Dashboard>
    );
}
