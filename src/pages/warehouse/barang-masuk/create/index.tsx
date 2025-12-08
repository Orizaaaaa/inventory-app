import { Dashboard } from "@/components/layout";
import BackButton from "@/components/ui/back-button";
import BarangMasukForm from "@/modules/warehouse/barang-masuk/components/form/barang-masuk-form";

export default function CreateBarangMasuk() {
    return (
        <Dashboard>
            <div className="flex flex-col gap-4">
                <div className="rounded-xl shadow-sm p-6 bg-white">
                    <div className="flex justify-between items-start">
                        <div className="mb-6">
                            <BackButton />
                        </div>
                    </div>

                    <BarangMasukForm />
                </div>
            </div>
        </Dashboard>
    );
}

