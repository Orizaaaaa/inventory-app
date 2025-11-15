import { Dashboard } from "@/components/layout";
import FilterSelect from "@/components/ui/filter-select";
import { SearchInput } from "@/components/ui/search-input";
import { StatCard, StatCardGrid } from "@/components/ui/stat-cards";
import {
    inventoryStats,
} from "@/data/inventory-data";
import TableProduct from "@/modules/product/components/table-product";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
export default function DataProduk() {
    const data = [
        {
            hpp_per_piece: 12500.5,
            product_name: "Kopi Arabika Premium",
            category: "Minuman",
            code: "BRG-001",
            name: "Kopi Arabika 250gr",
            variation: "250gr / Bubuk Halus",
            unit: "pcs",
            stock_in: 100,
            stock_out: 25,
            total_stock: 75,
            location: "Gudang Utama"
        },
        {
            hpp_per_piece: 12500.5,
            product_name: "Kopi Arabika Premium",
            category: "Minuman",
            code: "BRG-001",
            name: "Kopi Arabika 250gr",
            variation: "250gr / Bubuk Halus",
            unit: "pcs",
            stock_in: 100,
            stock_out: 25,
            total_stock: 75,
            location: "Gudang Utama"
        },
        {
            hpp_per_piece: 12500.5,
            product_name: "Kopi Arabika Premium",
            category: "Minuman",
            code: "BRG-001",
            name: "Kopi Arabika 250gr",
            variation: "250gr / Bubuk Halus",
            unit: "pcs",
            stock_in: 100,
            stock_out: 25,
            total_stock: 75,
            location: "Gudang Utama"
        },
    ];
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
                    <div className="flex justify-between px-4 py-4">
                        <SearchInput placeholder="Search Product" />
                        <div className="flex gap-3">
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
                        </div>
                    </div>

                    <TableProduct data={data} />
                </div>
            </div>


        </Dashboard>
    );
}
