import { Dashboard } from "@/components/layout";
import TableSupplier from "@/modules/master-data/supplier/components/supplier-table";
import { useSupplier } from "@/modules/master-data/supplier/api/get-all-supplier";
import { StatCard, StatCardGrid } from "@/components/ui/stat-cards";
import { Users, Truck } from "lucide-react";
import { useState } from "react";
import CreateSupplierModal from "@/modules/master-data/supplier/components/action/crete-supplier";

export default function Supplier() {
    const { data: supplierResponse, isLoading } = useSupplier();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const suppliers = supplierResponse?.data || [];
    const totalSuppliers = suppliers.length;

    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Supplier", isCurrentPage: true, icon: Users }
            ]}>
            <div className="space-y-6 mt-6">
                {/* Header Section */}
                <div className="bg-linear-to-r from-purple-500 to-pink-600 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Supplier Management</h1>
                                <p className="text-purple-100 mt-1">Manage your suppliers</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <StatCardGrid>
                    <StatCard
                        title="Total Suppliers"
                        value={totalSuppliers}
                        icon={Truck}
                        iconColor="text-purple-600"
                    />
                </StatCardGrid>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-600" />
                            Supplier List
                        </h2>
                    </div>
                    <TableSupplier data={suppliers} loading={isLoading} />
                </div>
            </div>
            <CreateSupplierModal 
                open={isCreateModalOpen} 
                onOpenChange={setIsCreateModalOpen} 
            />
        </Dashboard>
    );
}