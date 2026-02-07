import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import { StatCard, StatCardGrid } from "@/components/ui/stat-cards";
import type { Summary } from "@/modules/dashboard/types/main";
import { useDashboard } from "@/modules/dashboard/api/get-dashboard";

interface DashboardStatsProps {
    summary?: Summary;
}

export default function DashboardStats({ summary: fallbackSummary }: DashboardStatsProps) {
    const { data: dashboardData } = useDashboard();
    const summary = dashboardData?.data?.summary ?? fallbackSummary;

    return (
        <StatCardGrid>
            <StatCard
                title="Total Products"
                value={summary?.total_product || 0}
                change={{
                    value: 0,
                    type: 'increase',
                    period: 'last month'
                }}
                icon={Package}
                iconColor="text-blue-600"
            />

            <StatCard
                title="Low Stock Items"
                value={summary?.total_product_low_stok || 0}
                change={{
                    value: 0,
                    type: 'decrease',
                    period: 'last week'
                }}
                icon={AlertTriangle}
                iconColor="text-yellow-600"
            />
            <StatCard
                title="Total Barang Masuk"
                value={`Rp ${((summary?.total_hpp_barang_masuk ?? 0)).toLocaleString('id-ID')}`}
                change={{
                    value: 0,
                    type: 'increase',
                    period: 'last week'
                }}
                icon={DollarSign}
                iconColor="text-green-600"
            />
            <StatCard
                title="Total Barang Keluar"
                value={`Rp ${((summary?.total_hpp_barang_keluar ?? 0)).toLocaleString('id-ID')}`}
                change={{
                    value: 0,
                    type: 'decrease',
                    period: 'last week'
                }}
                icon={TrendingUp}
                iconColor="text-red-600"
            />
        </StatCardGrid>
    );
}
