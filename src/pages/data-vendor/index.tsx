import { Dashboard } from "@/components/layout";
import TableVendor from "@/modules/data-vendor/components/vendor-table";
import { StatCard, StatCardGrid } from "@/components/ui/stat-cards";
import { Building2, Plus } from "lucide-react";
import { useState } from "react";
import CreateVendorModal from "@/modules/data-vendor/components/action/create-vendor";
import { Button } from "@/components/ui/button";
import type { VendorType } from "@/modules/data-vendor/types/type";
import { useVendor } from "@/modules/data-vendor/api/get-list-vendor";

// Dummy data
const dummyVendors: VendorType[] = [
    {
        id: "1",
        name: "PT Vendor Maju Jaya",
        email: "contact@vendormaju.com",
        phone: "081234567890",
        address: "Jl. Raya Sudirman No. 123, Jakarta Pusat"
    },
    {
        id: "2",
        name: "CV Supplier Terpercaya",
        email: "info@supplierterpercaya.com",
        phone: "082345678901",
        address: "Jl. Gatot Subroto No. 45, Jakarta Selatan"
    },
    {
        id: "3",
        name: "PT Mitra Bisnis",
        email: "hello@mitrabisnis.com",
        phone: "083456789012",
        address: "Jl. Thamrin No. 78, Jakarta Pusat"
    },
    {
        id: "4",
        name: "UD Sumber Rezeki",
        email: "sales@sumberrezeki.com",
        phone: "084567890123",
        address: "Jl. Kebon Jeruk No. 12, Jakarta Barat"
    },
    {
        id: "5",
        name: "PT Barokah Sejahtera",
        email: "info@barokahsejahtera.com",
        phone: "085678901234",
        address: "Jl. Cikini Raya No. 56, Jakarta Pusat"
    }
];

export default function DataVendor() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const vendors = dummyVendors;
    const totalVendors = vendors.length;
    const { data: vendorResponse, isLoading } = useVendor();
    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Data Vendor", isCurrentPage: true, icon: Building2 }
            ]}>
            <div className="space-y-6 mt-6">
                {/* Header Section */}
                <div className="bg-linear-to-r from-purple-500 to-pink-600 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Vendor Management</h1>
                                <p className="text-purple-100 mt-1">Manage your vendors</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <StatCardGrid>
                    <StatCard
                        title="Total Vendors"
                        value={totalVendors}
                        icon={Building2}
                        iconColor="text-purple-600"
                    />
                </StatCardGrid>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-purple-600" />
                                Vendor List
                            </h2>
                            <Button text="Add Vendor" icon={<Plus />} variant={"yellow"} onClick={() => setIsCreateModalOpen(true)} />
                        </div>
                    </div>
                    <TableVendor data={vendorResponse?.data || []} loading={isLoading} />
                </div>
            </div>
            <CreateVendorModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
            />
        </Dashboard>
    );
}
