import { Dashboard } from "@/components/layout";
import TableCategory from "@/modules/master-data/category/components/category-table";
import { useCategory } from "@/modules/master-data/category/api/get-all-category";
import { StatCard, StatCardGrid } from "@/components/ui/stat-cards";
import { Tag, Package, Plus } from "lucide-react";
import { useState } from "react";
import CreateCategoryModal from "@/modules/master-data/category/components/action/create-category-modal";
import { Button } from "@/components/ui/button";

export default function Category() {
    const { data: categoryResponse, isLoading } = useCategory();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const categories = categoryResponse?.data || [];
    const totalCategories = categories.length;

    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Category", isCurrentPage: true, icon: Tag }
            ]}>
            <div className="space-y-6 mt-6">
                {/* Header Section */}
                <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <Tag className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Category Management</h1>
                                <p className="text-green-100 mt-1">Manage your product categories</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <StatCardGrid>
                    <StatCard
                        title="Total Categories"
                        value={totalCategories}
                        icon={Package}
                        iconColor="text-green-600"
                    />
                </StatCardGrid>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">

                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-green-600" />
                                Category List
                            </h2>
                            <Button text="Add Category" icon={<Plus />} variant={"gradien"} onClick={() => setIsCreateModalOpen(true)} />
                        </div>
                    </div>
                    <TableCategory data={categories} loading={isLoading} />
                </div>
            </div>
            <CreateCategoryModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
            />
        </Dashboard>
    );
}