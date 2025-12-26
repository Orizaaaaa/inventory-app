import { Dashboard } from "@/components/layout";
import BackButton from "@/components/ui/back-button";
import { useCurrentRoute } from "@/hooks/use-current-route";
import { useBarangKeluarById } from "@/modules/warehouse/barang-keluar/api/get-barang-keluar-id";
import BarangKeluarForm from "@/modules/warehouse/barang-keluar/components/form/barang-keluar-form";
import { useMemo } from "react";

export default function UpdateBarangKeluar() {
    const pathname = useCurrentRoute();
    // Get id from route parameter (from pathname)
    const id = useMemo(() => {
        const match = pathname.match(/\/barang-keluar\/update\/([^/]+)/);
        return match ? match[1] : "";
    }, [pathname]);

    const { data: barangKeluarResponse } = useBarangKeluarById({
        id,
        queryConfig: {
            enabled: !!id,
        },
    });

    const barangKeluar = barangKeluarResponse?.data;
    return (
        <Dashboard>
            <div className="flex flex-col gap-4">
                <div className="rounded-xl shadow-sm p-6 bg-white">
                    <div className="flex justify-between items-start">
                        <div className="mb-6">
                            <BackButton />
                        </div>
                    </div>

                    <BarangKeluarForm mode="edit" initialData={barangKeluar} barangKeluarId={id} />
                </div>
            </div>
        </Dashboard>
    );
}

