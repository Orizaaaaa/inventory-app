import { Dashboard } from "@/components/layout";
import TableBahanBaku from "@/modules/data-bahan-baku/components/bahan-baku-table";
import { StatCard, StatCardGrid } from "@/components/ui/stat-cards";
import { Package, Plus } from "lucide-react";
import { useState } from "react";
import CreateBahanBakuModal from "@/modules/data-bahan-baku/components/action/create-bahan-baku";
import { Button } from "@/components/ui/button";
import type { BahanBakuType } from "@/modules/data-bahan-baku/types/type";

// Dummy data
const dummyBahanBaku: BahanBakuType[] = [
    {
        id: "1",
        name: "Tepung Terigu",
        code: "BB001",
        unit: "kg",
        stock: 500,
        location: "Gudang A",
        supplier: "PT Supplier Terpercaya"
    },
    {
        id: "2",
        name: "Gula Pasir",
        code: "BB002",
        unit: "kg",
        stock: 300,
        location: "Gudang A",
        supplier: "CV Sumber Manis"
    },
    {
        id: "3",
        name: "Mentega",
        code: "BB003",
        unit: "kg",
        stock: 150,
        location: "Gudang B",
        supplier: "PT Duta Margarin"
    },
    {
        id: "4",
        name: "Telur Ayam",
        code: "BB004",
        unit: "kg",
        stock: 200,
        location: "Gudang C",
        supplier: "UD Peternakan Sejahtera"
    },
    {
        id: "5",
        name: "Vanili Essence",
        code: "BB005",
        unit: "ml",
        stock: 50,
        location: "Gudang B",
        supplier: "PT Rasa Nusantara"
    },
    {
        id: "6",
        name: "Coklat Bubuk",
        code: "BB006",
        unit: "kg",
        stock: 100,
        location: "Gudang A",
        supplier: "CV Coklat Indonesia"
    }
];

export default function DataBahanBaku() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const bahanBaku = dummyBahanBaku;
    const isLoading = false;
    const totalBahanBaku = bahanBaku.length;

    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Data Bahan Baku", isCurrentPage: true, icon: Package }
            ]}>
            <div className="space-y-6 mt-6">
                {/* Header Section */}
                <div className="bg-linear-to-r from-purple-500 to-pink-600 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <Package className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Bahan Baku Management</h1>
                                <p className="text-purple-100 mt-1">Manage your raw materials</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <StatCardGrid>
                    <StatCard
                        title="Total Bahan Baku"
                        value={totalBahanBaku}
                        icon={Package}
                        iconColor="text-purple-600"
                    />
                </StatCardGrid>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Package className="w-5 h-5 text-purple-600" />
                                Bahan Baku List
                            </h2>
                            <Button text="Add Bahan Baku" icon={<Plus />} variant={"yellow"} onClick={() => setIsCreateModalOpen(true)} />
                        </div>
                    </div>
                    <TableBahanBaku data={bahanBaku} loading={isLoading} />
                </div>
            </div>
            <CreateBahanBakuModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
            />
        </Dashboard>
    );
}
