import { Dashboard } from "@/components/layout";
import TableNota from "@/modules/master-data/nota/components/nota-table";
import { useNota } from "@/modules/master-data/nota/api/get-all-nota";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateNotaModal from "@/modules/master-data/nota/components/action/create-nota-modal";

export default function Nota() {
    const { data: notaResponse, isLoading } = useNota();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const notas = notaResponse?.data || [];

    return (
        <Dashboard>
            <div className="space-y-6 mt-6">
                <div className="bg-white rounded-t-2xl">
                    <div className="flex justify-end pt-4 px-4">
                        <Button 
                            onClick={() => setIsCreateModalOpen(true)} 
                            icon={<Plus />} 
                            variant={"gradien"} 
                            text={" Add Nota"} 
                        />
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

