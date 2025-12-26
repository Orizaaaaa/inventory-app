import { Dashboard } from "@/components/layout";
import BackButton from "@/components/ui/back-button";
import BarangKeluarForm from "@/modules/warehouse/barang-keluar/components/form/barang-keluar-form";

export default function CreateBarangKeluar() {
    return (
        <Dashboard>
            <div className="flex flex-col gap-4">
                <div className="rounded-xl shadow-sm p-6 bg-white">
                    <div className="flex justify-between items-start">
                        <div className="mb-6">
                            <BackButton />
                        </div>
                    </div>

                    <BarangKeluarForm />
                </div>
            </div>
        </Dashboard>
    );
}

