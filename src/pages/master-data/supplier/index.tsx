import { Dashboard } from "@/components/layout";
import TableSupplier from "@/modules/master-data/supplier/components/supplier-table";
import { useSupplier } from "@/modules/master-data/supplier/api/get-all-supplier";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateSupplierModal from "@/modules/master-data/supplier/components/action/crete-supplier";

export default function Supplier() {
    const { data: supplierResponse, isLoading, isError } = useSupplier();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const suppliers = supplierResponse?.data || [];

    return (
        <Dashboard>
            <div className="space-y-6 mt-6">
                <div className="bg-white rounded-t-2xl">
                    <div className="flex justify-end pt-4 px-4">
                        <Button 
                            onClick={() => setIsCreateModalOpen(true)} 
                            icon={<Plus />} 
                            variant={"gradien"} 
                            text={" Add Supplier"} 
                        />
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