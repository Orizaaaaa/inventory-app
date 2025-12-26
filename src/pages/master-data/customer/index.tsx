import { Dashboard } from "@/components/layout";
import TableCustomer from "@/modules/master-data/customer/components/customer-table";
import { useCustomer } from "@/modules/master-data/customer/api/get-all-customer";
import { StatCard, StatCardGrid } from "@/components/ui/stat-cards";
import { Users, UserCircle, Plus } from "lucide-react";
import { useState } from "react";
import CreateCustomerModal from "@/modules/master-data/customer/components/action/create-customer";
import { Button } from "@/components/ui/button";

export default function Customer() {
    const { data: customerResponse, isLoading } = useCustomer();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const customers = customerResponse?.data || [];
    const totalCustomers = customers.length;

    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Customer", isCurrentPage: true, icon: Users }
            ]}>
            <div className="space-y-6 mt-6">
                {/* Header Section */}
                <div className="bg-linear-to-r from-purple-500 to-pink-600 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <UserCircle className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Customer Management</h1>
                                <p className="text-purple-100 mt-1">Manage your customers</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <StatCardGrid>
                    <StatCard
                        title="Total Customers"
                        value={totalCustomers}
                        icon={UserCircle}
                        iconColor="text-purple-600"
                    />
                </StatCardGrid>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <UserCircle className="w-5 h-5 text-purple-600" />
                                Customer List
                            </h2>
                            <Button text="Add Customer" icon={<Plus />} variant={"yellow"} onClick={() => setIsCreateModalOpen(true)} />
                        </div>
                    </div>
                    <TableCustomer data={customers} loading={isLoading} />
                </div>
            </div>
            <CreateCustomerModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
            />
        </Dashboard>
    );
}

