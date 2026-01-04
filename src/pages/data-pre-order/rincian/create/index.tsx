import { Dashboard } from "@/components/layout";
import BackButton from "@/components/ui/back-button";
import PreOrderForm from "@/modules/data-pre-order/components/form/pre-order-form";

export default function CreatePreOrderPage() {
    return (
        <Dashboard>
            <div className="flex flex-col gap-4">
                <div className="rounded-xl shadow-sm p-6 bg-white">
                    <div className="flex justify-between items-start">
                        <div className="mb-6">
                            <BackButton />
                        </div>
                    </div>

                    <PreOrderForm />
                </div>
            </div>
        </Dashboard>
    );
}

