import { Dashboard } from "@/components/layout";
import TableCategory from "@/modules/master-data/category/components/category-table";
import { useCategory } from "@/modules/master-data/category/api/get-all-category";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateCategoryModal from "@/modules/master-data/category/components/action/create-category-modal";

export default function Category() {
    const { data: categoryResponse, isLoading, isError } = useCategory();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const categories = categoryResponse?.data || [];

    return (
        <Dashboard>
            <div className="space-y-6 mt-6">
                <div className="bg-white rounded-t-2xl">
                    <div className="flex justify-end pt-4 px-4">
                        <Button 
                            onClick={() => setIsCreateModalOpen(true)} 
                            icon={<Plus />} 
                            variant={"gradien"} 
                            text={" Add Category"} 
                        />
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