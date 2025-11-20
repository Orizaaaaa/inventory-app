import { Dashboard } from "@/components/layout";
import TableLocation from "@/modules/master-data/location/components/location-table";
import { useLocation } from "@/modules/master-data/location/api/get-all-location";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateLocationModal from "@/modules/master-data/location/components/action/create-location-modal";

export default function Location() {
    const { data: locationResponse, isLoading } = useLocation();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const locations = locationResponse?.data || [];

    return (
        <Dashboard>
            <div className="space-y-6 mt-6">
                <div className="bg-white rounded-t-2xl">
                    <div className="flex justify-end pt-4 px-4">
                        <Button 
                            onClick={() => setIsCreateModalOpen(true)} 
                            icon={<Plus />} 
                            variant={"gradien"} 
                            text={" Add Location"} 
                        />
                    </div>
                    <TableLocation data={locations} loading={isLoading} />
                </div>
            </div>
            <CreateLocationModal 
                open={isCreateModalOpen} 
                onOpenChange={setIsCreateModalOpen} 
            />
        </Dashboard>
    );
}

