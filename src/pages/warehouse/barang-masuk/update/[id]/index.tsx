import { Dashboard } from "@/components/layout";
import BackButton from "@/components/ui/back-button";
import { useCurrentRoute } from "@/hooks/use-current-route";
import { useBarangMasukById } from "@/modules/warehouse/barang-masuk/api/get-barang-masuk-id";
import BarangMasukForm from "@/modules/warehouse/barang-masuk/components/form/barang-masuk-form";
import { useMemo } from "react";

export default function CreateBarangMasuk() {
    const pathname = useCurrentRoute();
    // Get id from route parameter (from pathname)
    const id = useMemo(() => {
        const match = pathname.match(/\/barang-masuk\/update\/([^/]+)/);
        return match ? match[1] : "";
    }, [pathname]);

    const { data: barangMasukResponse } = useBarangMasukById({
        id,
        queryConfig: {
            enabled: !!id,
        },
    });

    const barangMasuk = barangMasukResponse?.data;
    return (
        <Dashboard>
            <div className="flex flex-col gap-4">
                <div className="rounded-xl shadow-sm p-6 bg-white">
                    <div className="flex justify-between items-start">
                        <div className="mb-6">
                            <BackButton />
                        </div>
                    </div>

                    <BarangMasukForm mode="edit" initialData={barangMasuk} />
                </div>
            </div>
        </Dashboard>
    );
}

