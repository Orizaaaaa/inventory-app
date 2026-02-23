import { Button } from "@/components/ui/button";

import { useModalStore } from "@/hooks/use-modal-store";
import type { UseFormReturn } from "react-hook-form";
import type { BarangMasukFormData } from "../../types/main";
import { useUpdateBarangMasuk } from "../../api/update-product";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";

type UpdateBarangMasukButtonProps = {
    form: UseFormReturn<BarangMasukFormData>;
    id: string;
    onSuccess?: () => void;
};

export default function UpdateBarangMasukButton({ form, id, onSuccess }: UpdateBarangMasukButtonProps) {
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const modalSubmit = useModalConfirmStore("modalSubmit");

    const { handleSubmit, } = form;
    const { mutateAsync: updateBarangMasuk } = useUpdateBarangMasuk({});

    const handleUpdate = handleSubmit(async (values, e) => {
        e?.preventDefault();

        // Format date to YYYY-MM-DD

        modalSubmit.handleConfirm({
            heading: "Confirm Update!!",
            message: "Are you sure about the changes made?",
            btnText: "Yes, Update",
            onCancel: modalSubmit.hideModal,
            onSubmit: async () => {
                try {
                    await updateBarangMasuk({ id, data: values });
                    modalSubmit.hideModal();
                    form.reset();
                    modalSuccess.openModal(
                        "Your data has been successfully updated.",
                        () => {
                            onSuccess?.();
                        }
                    );
                } catch (error: any) {
                    console.log("Update barang masuk error:", error);
                    const errorMessage = error.response?.data?.message || "Failed to update barang masuk";
                    modalFailed.openModal(errorMessage);
                }
            },
        });
    });

    return (
        <div>
            <Button
                variant={"yellow"}
                text="Update"
                className="w-[150px]"
                onClick={handleUpdate}
            />
        </div>
    );
}

