import { Dashboard } from "@/components/layout"
import { LayoutDashboard } from "lucide-react";
import { InventoryTable } from "@/components/ui/inventory-table";
import RevenueChart from "@/components/ui/dashboard/revenue-chart";
import ProfitByCategory from "@/components/ui/dashboard/profit-by-category";
import DashboardStats from "@/components/ui/dashboard/dashboard-stats";
import { useDashboard } from "@/modules/dashboard/api/get-dashboard";

export default function Home() {
    const { data: dashboardData } = useDashboard();

    const summary = dashboardData?.data?.summary;
    const topSellingProducts = dashboardData?.data?.top_selling_product || [];
    const valueTopProducts = dashboardData?.data?.value_top_product || [];
    const weeklyRevenue = dashboardData?.data?.weekly_revenue || [];

    // Transform topSellingProducts to InventoryTable format
    const transformedProducts = topSellingProducts.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category.name,
        stock: product.total_qty,
        price: parseInt(product.hpp) || 0,
        sales: product.total_qty_out,
        status: product.total_qty === 0 ? 'out-of-stock' : product.total_qty < 10 ? 'low-stock' : 'in-stock',
    } as const));


    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Dashboard", isCurrentPage: true, icon: LayoutDashboard }
            ]}

        >

            <div className="space-y-6 mt-6">

                {/* Main Stats Cards */}
                <DashboardStats summary={summary} />


                <div className="grid grid-cols-2 gap-4">
                    <ProfitByCategory data={valueTopProducts} />
                    <RevenueChart data={weeklyRevenue} />
                </div>

                {/* <InventoryOverview /> */}

                <InventoryTable data={transformedProducts} />

            </div>
        </Dashboard>
    );
}