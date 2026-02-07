import { useState } from "react";
import { Dashboard } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
    inventoryStats,
} from "@/data/inventory-data";
import TableBarangMasuk from "@/modules/warehouse/barang-masuk/components/table-barang-masuk";
import { useBarangMasuk } from "@/modules/warehouse/barang-masuk/api/get-all-barang-masuk";
import { useNavigate } from "@/routes";
import { Package, Plus, } from "lucide-react";
import DashboardStats from "@/components/ui/dashboard/dashboard-stats";

export default function BarangMasuk() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: barangMasukResponse, isLoading } = useBarangMasuk({
        params: {
            page,
            limit,
        },
    });

    const barangMasuk = barangMasukResponse?.data || [];
    const pagination = barangMasukResponse?.pagination;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };

    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Barang Masuk", isCurrentPage: true, icon: Package }
            ]}>
            <div className="space-y-6 mt-6">
                {/* Main Stats Cards */}
                <DashboardStats summary={{
                    total_product: inventoryStats.totalProducts,
                    total_product_low_stok: inventoryStats.lowStockItems,
                    total_hpp_barang_masuk: inventoryStats.totalValue,
                    total_hpp_barang_keluar: 0,
                }} />
                <div className="bg-white rounded-t-2xl">
                    <div className="flex justify-end pt-4 px-4">
                        <Button
                            onClick={() => navigate("/warehouse/barang-masuk/create" as Parameters<typeof navigate>[0])}
                            icon={<Plus />}
                            variant={"yellow"}
                            text={" Add Barang Masuk"}
                        />
                    </div>
                    {/* <div className="flex justify-between px-4 py-4">
                        <SearchInput placeholder="Search Barang Masuk" />
                        <div className="flex gap-3">
                            <FilterSelect
                                placeholder="All Status"
                                options={[
                                    { label: "SUBMITTED", value: "SUBMITTED" },
                                    { label: "APPROVED", value: "APPROVED" },
                                ]}
                            />
                            <FilterSelect
                                placeholder="Supplier"
                                options={[
                                    { label: "All", value: "all" },
                                ]}
                            />
                            <FilterSelect
                                placeholder="Note Type"
                                options={[
                                    { label: "All", value: "all" },
                                ]}
                            />
                        </div>
                    </div> */}
                    <TableBarangMasuk
                        loading={isLoading}
                        data={barangMasuk}
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </div>
            </div>
        </Dashboard>
    );
}
