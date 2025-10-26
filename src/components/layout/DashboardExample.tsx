import React from 'react';
import { Home, BarChart3, TrendingUp } from 'lucide-react';
import { Dashboard } from './Dashboard';

// Contoh penggunaan komponen Dashboard
export function DashboardExample() {
    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Home", href: "/", icon: Home },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Analytics", isCurrentPage: true }
            ]}
            title="Analytics Dashboard"
            description="View your business metrics and performance indicators"
        >
            {/* Konten halaman Anda di sini */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-card text-card-foreground rounded-lg border p-6">
                    <h3 className="text-lg font-semibold">Total Sales</h3>
                    <p className="text-3xl font-bold">$45,231.89</p>
                    <p className="text-sm text-muted-foreground">+20.1% from last month</p>
                </div>
                <div className="bg-card text-card-foreground rounded-lg border p-6">
                    <h3 className="text-lg font-semibold">Subscriptions</h3>
                    <p className="text-3xl font-bold">+2350</p>
                    <p className="text-sm text-muted-foreground">+180.1% from last month</p>
                </div>
                <div className="bg-card text-card-foreground rounded-lg border p-6">
                    <h3 className="text-lg font-semibold">Sales</h3>
                    <p className="text-3xl font-bold">+12,234</p>
                    <p className="text-sm text-muted-foreground">+19% from last month</p>
                </div>
                <div className="bg-card text-card-foreground rounded-lg border p-6">
                    <h3 className="text-lg font-semibold">Active Now</h3>
                    <p className="text-3xl font-bold">+573</p>
                    <p className="text-sm text-muted-foreground">+201 since last hour</p>
                </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="bg-card text-card-foreground rounded-lg border p-6 col-span-4">
                    <h3 className="text-lg font-semibold mb-4">Overview</h3>
                    <div className="h-[300px] bg-muted/50 rounded flex items-center justify-center">
                        <span className="text-muted-foreground">Chart akan ditampilkan di sini</span>
                    </div>
                </div>
                <div className="bg-card text-card-foreground rounded-lg border p-6 col-span-3">
                    <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Olivia Martin</p>
                                <p className="text-xs text-muted-foreground">olivia.martin@email.com</p>
                            </div>
                            <div className="text-sm font-medium">+$1,999.00</div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Jackson Lee</p>
                                <p className="text-xs text-muted-foreground">jackson.lee@email.com</p>
                            </div>
                            <div className="text-sm font-medium">+$39.00</div>
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
