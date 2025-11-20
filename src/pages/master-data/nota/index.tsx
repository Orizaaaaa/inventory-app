import { Dashboard } from "@/components/layout";
import TableNota from "@/modules/master-data/nota/components/nota-table";
import { useNota } from "@/modules/master-data/nota/api/get-all-nota";
import { StatCard, StatCardGrid } from "@/components/ui/stat-cards";
import { Receipt, FileText } from "lucide-react";
import { useState } from "react";
import CreateNotaModal from "@/modules/master-data/nota/components/action/create-nota-modal";

export default function Nota() {
    const { data: notaResponse, isLoading } = useNota();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const notas = notaResponse?.data || [];
    const totalNotas = notas.length;

    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Nota", isCurrentPage: true, icon: Receipt }
            ]}>
            <div className="space-y-6 mt-6">
                {/* Header Section */}
                <div className="bg-linear-to-r from-orange-500 to-red-600 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <Receipt className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Nota Management</h1>
                                <p className="text-orange-100 mt-1">Manage your nota types</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <StatCardGrid>
                    <StatCard
                        title="Total Notas"
                        value={totalNotas}
                        icon={FileText}
                        iconColor="text-orange-600"
                    />
                </StatCardGrid>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <Receipt className="w-5 h-5 text-orange-600" />
                            Nota List
                        </h2>
                    </div>
                    <TableNota data={notas} loading={isLoading} />
                </div>
            </div>
            <CreateNotaModal 
                open={isCreateModalOpen} 
                onOpenChange={setIsCreateModalOpen} 
            />
        </Dashboard>
    );
}

