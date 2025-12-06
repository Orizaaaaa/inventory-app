import { useState } from "react";
import { Dashboard } from "@/components/layout";
import { Button } from "@/components/ui/button";
import FilterSelect from "@/components/ui/filter-select";
import { SearchInput } from "@/components/ui/search-input";
import { StatCard, StatCardGrid } from "@/components/ui/stat-cards";
import {
    inventoryStats,
} from "@/data/inventory-data";
import TableBarangMasuk from "@/modules/warehouse/barang-masuk/components/table-barang-masuk";
import { useBarangMasuk } from "@/modules/warehouse/barang-masuk/api/get-all-barang-masuk";
import { useNavigate } from "@/routes";
import { AlertTriangle, DollarSign, Package, Plus, TrendingUp } from "lucide-react";

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
                <StatCardGrid>
                    <StatCard
                        title="Total Barang Masuk"
                        value={pagination?.totalItems || 0}
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
                        title="This Month"
                        value={barangMasuk.length}
                        change={{
                            value: -5,
                            type: 'decrease',
                            period: 'last week'
                        }}
                        icon={AlertTriangle}
                        iconColor="text-yellow-600"
                    />
                    <StatCard
                        title="Total Pages"
                        value={pagination?.totalPages || 0}
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
                        <Button
                            onClick={() => navigate("/warehouse/barang-masuk/create" as Parameters<typeof navigate>[0])}
                            icon={<Plus />}
                            variant={"yellow"}
                            text={" Add Barang Masuk"}
                        />
                    </div>
                    <div className="flex justify-between px-4 py-4">
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
                    </div>
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
