import { Button } from "@/components/ui/button";

import { useModalStore } from "@/hooks/use-modal-store";
import type { UseFormReturn } from "react-hook-form";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useNavigate } from "@/routes";
import type { BarangMasukFormData } from "../../types/main";
import { useCreateBarangMasuk } from "../../api/create-barang-masuk";

type CreateProductButtonProps = {
    form: UseFormReturn<BarangMasukFormData>;
    onSuccess?: () => void;
};

export default function CreateProductMasukButton({ form }: CreateProductButtonProps) {
    const navigate = useNavigate();
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const modalSubmit = useModalConfirmStore("modalSubmit");

    const { handleSubmit } = form;
    const { mutateAsync: createBarangMasuk } = useCreateBarangMasuk({});

    const handleCreate = handleSubmit(async (values, e) => {
        e?.preventDefault();

        modalSubmit.handleConfirm({
            heading: "Confirm!!",
            message: "Are you sure about the data entered?",
            btnText: "Yes, Submit",
            onCancel: modalSubmit.hideModal,
            onSubmit: async () => {
                try {
                    await createBarangMasuk({ data: values });
                    modalSubmit.hideModal();
                    modalSuccess.openModal(
                        "Your data has been successfully submitted.",
                        () => {
                            navigate("/warehouse/barang-masuk" as Parameters<typeof navigate>[0]);
                        }
                    );
                } catch (error: any) {
                    console.log("Create product error:", error);
                    const errorMessage = error.response.data.message || "Failed to create product";
                    modalFailed.openModal(errorMessage);
                }
            },
        });
    });

    return (
        <div>
            <Button
                variant={"yellow"}
                text="Submit"
                className="w-[150px]"
                onClick={handleCreate}
            />

        </div>
    );
}

