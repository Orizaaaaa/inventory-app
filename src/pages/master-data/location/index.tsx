import { Dashboard } from "@/components/layout";
import TableLocation from "@/modules/master-data/location/components/location-table";
import { useLocation } from "@/modules/master-data/location/api/get-all-location";
import { StatCard, StatCardGrid } from "@/components/ui/stat-cards";
import { MapPin, Building2, Plus } from "lucide-react";
import { useState } from "react";
import CreateLocationModal from "@/modules/master-data/location/components/action/create-location-modal";
import { Button } from "@/components/ui/button";

export default function Location() {
    const { data: locationResponse, isLoading } = useLocation();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const locations = locationResponse?.data || [];
    const totalLocations = locations.length;

    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Location", isCurrentPage: true, icon: MapPin }
            ]}>
            <div className="space-y-6 mt-6">
                {/* Header Section */}
                <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Location Management</h1>
                                <p className="text-blue-100 mt-1">Manage your storage locations</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Stats Card */}
                <StatCardGrid>
                    <StatCard
                        title="Total Locations"
                        value={totalLocations}
                        icon={Building2}
                        iconColor="text-indigo-600"
                    />
                </StatCardGrid>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-indigo-600" />
                                Location List
                            </h2>
                            <Button text="Add Location" icon={<Plus />} variant={"gradien"} onClick={() => setIsCreateModalOpen(true)} />
                        </div>

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

