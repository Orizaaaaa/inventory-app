import { Dashboard } from "@/components/layout";
import BackButton from "@/components/ui/back-button";
import { DatePickerExample } from "@/components/ui/forms/date-picker.example";
import BarangMasukForm from "@/modules/warehouse/barang-masuk/components/form/barang-masuk-form";
import { DatePicker } from "@heroui/date-picker";

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
                    {/* <DatePickerExample /> */}
                    <DatePicker showMonthAndYearPickers className="max-w-[284px]" label="Birth date" />;
                    <DatePickerExample />
                </div>
            </div>
        </Dashboard>
    );
}

