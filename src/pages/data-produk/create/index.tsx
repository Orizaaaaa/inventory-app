

import { Dashboard } from "@/components/layout";
import BackButton from "@/components/ui/back-button";
import ProductForm from "@/modules/product/components/form/product-form";



export default function CreateSubmissionData() {
    return (
        <Dashboard>
            <div className="flex flex-col gap-4">
                <div className="rounded-xl shadow-sm p-6 bg-white">
                    <div className="flex justify-between items-start ">
                        <div className="mb-6" >
                            <BackButton />
                        </div>
                    </div>

                    <ProductForm
                    />
                </div>
            </div>
        </Dashboard>

    );
}
