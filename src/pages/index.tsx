import { Dashboard } from "@/components/layout"
import { HomeIcon } from "lucide-react";


export default function Home() {
    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Dashboard", isCurrentPage: true, icon: HomeIcon }
            ]}
            title="Welcome to Inventory App"
            description="Manage your inventory efficiently with our modern dashboard"
        >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-card text-card-foreground rounded-lg border p-6">
                    <h3 className="text-lg font-semibold">Total Products</h3>
                    <p className="text-3xl font-bold">1,234</p>
                    <p className="text-sm text-muted-foreground">+20.1% from last month</p>
                </div>
                <div className="bg-card text-card-foreground rounded-lg border p-6">
                    <h3 className="text-lg font-semibold">Orders</h3>
                    <p className="text-3xl font-bold">+573</p>
                    <p className="text-sm text-muted-foreground">+201 since last hour</p>
                </div>
                <div className="bg-card text-card-foreground rounded-lg border p-6">
                    <h3 className="text-lg font-semibold">Revenue</h3>
                    <p className="text-3xl font-bold">$45,231.89</p>
                    <p className="text-sm text-muted-foreground">+20.1% from last month</p>
                </div>
                <div className="bg-card text-card-foreground rounded-lg border p-6">
                    <h3 className="text-lg font-semibold">Active Users</h3>
                    <p className="text-3xl font-bold">+2,350</p>
                    <p className="text-sm text-muted-foreground">+180.1% from last month</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="bg-card text-card-foreground rounded-lg border p-6 col-span-4">
                    <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
                    <div className="h-[300px] bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <p className="text-muted-foreground">Chart will be displayed here</p>
                        </div>
                    </div>
                </div>
                <div className="bg-card text-card-foreground rounded-lg border p-6 col-span-3">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">New order received</p>
                                <p className="text-xs text-muted-foreground">2 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Product updated</p>
                                <p className="text-xs text-muted-foreground">5 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Low stock alert</p>
                                <p className="text-xs text-muted-foreground">10 minutes ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}