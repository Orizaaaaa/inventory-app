import { Dashboard } from "@/components/layout"
import { Package, TrendingUp, AlertTriangle, DollarSign, LayoutDashboard } from "lucide-react";
import { StatCard, StatCardGrid, } from "@/components/ui/stat-cards";
import { InventoryTable } from "@/components/ui/inventory-table";
import RevenueChart from "@/components/ui/dashboard/revenue-chart";
import ProfitByCategory from "@/components/ui/dashboard/profit-by-category";
import {
    inventoryStats,
    topProducts,
} from "@/data/inventory-data";

export default function Home() {
    // Transform data for charts


    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Dashboard", isCurrentPage: true, icon: LayoutDashboard }
            ]}

        >

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


                <div className="grid grid-cols-2 gap-4">
                    <ProfitByCategory />
                    <RevenueChart />
                </div>

                {/* <InventoryOverview /> */}

                <InventoryTable data={topProducts} />

            </div>
        </Dashboard>
    );
}