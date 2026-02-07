import { useState } from "react";
import { Dashboard } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { StatCard, StatCardGrid } from "@/components/ui/stat-cards";
import {
    inventoryStats,
} from "@/data/inventory-data";
import TableProduct from "@/modules/product/components/table-product";
import { useProduct } from "@/modules/product/api/get-all-product";
import { useNavigate } from "@/routes";
import { AlertTriangle, DollarSign, Package, Plus, TrendingUp } from "lucide-react";

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
                <StatCardGrid>
                    <StatCard
                        title="Total Products"
                        value={inventoryStats.totalProducts}
                        change={{
                            value: inventoryStats.monthlyGrowth,
                            type: 'increase',
                            period: 'last month'
                        }}
                        icon={Package}
                        iconColor="text-blue-600"
                    />
                    <StatCard
                        title="Total Value"
                        value={`Rp ${(inventoryStats.totalValue / 1000000).toFixed(0)}M`}
                        change={{
                            value: inventoryStats.weeklyGrowth,
                            type: 'increase',
                            period: 'last week'
                        }}
                        icon={DollarSign}
                        iconColor="text-green-600"
                    />
                    <StatCard
                        title="Low Stock Items"
                        value={inventoryStats.lowStockItems}
                        change={{
                            value: -5,
                            type: 'decrease',
                            period: 'last week'
                        }}
                        icon={AlertTriangle}
                        iconColor="text-yellow-600"
                    />
                    <StatCard
                        title="Out of Stock"
                        value={inventoryStats.outOfStockItems}
                        change={{
                            value: -2,
                            type: 'decrease',
                            period: 'last week'
                        }}
                        icon={TrendingUp}
                        iconColor="text-red-600"
                    />
                </StatCardGrid>
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
