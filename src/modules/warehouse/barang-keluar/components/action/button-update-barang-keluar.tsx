import { Button } from "@/components/ui/button";

import { useModalStore } from "@/hooks/use-modal-store";
import type { UseFormReturn } from "react-hook-form";
import type { BarangKeluarFormData } from "../../types/main";
import { useUpdateBarangKeluar } from "../../api/update-barang-keluar";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";

type UpdateBarangKeluarButtonProps = {
    form: UseFormReturn<BarangKeluarFormData>;
    id: string;
    onSuccess?: () => void;
};

export default function UpdateBarangKeluarButton({ form, id, onSuccess }: UpdateBarangKeluarButtonProps) {
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const modalSubmit = useModalConfirmStore("modalSubmit");

    const { handleSubmit, formState: { isValid } } = form;
    const { mutateAsync: updateBarangKeluar } = useUpdateBarangKeluar({});

    const handleUpdate = handleSubmit(async (values, e) => {
        e?.preventDefault();

        modalSubmit.handleConfirm({
            heading: "Confirm Update!!",
            message: "Are you sure about the changes made?",
            btnText: "Yes, Update",
            onCancel: modalSubmit.hideModal,
            onSubmit: async () => {
                try {
                    // Format date to ISO string
                    const formattedData = {
                        ...values,
                        date: values.date ? values.date.toISOString().split('T')[0] : '',
                    };
                    await updateBarangKeluar({ id, data: formattedData });
                    modalSubmit.hideModal();
                    form.reset();
                    modalSuccess.openModal(
                        "Your data has been successfully updated.",
                        () => {
                            onSuccess?.();
                        }
                    );
                } catch (error: any) {
                    console.log("Update barang keluar error:", error);
                    const errorMessage = error.response?.data?.message || "Failed to update barang keluar";
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
                disabled={!isValid}
            />
        </div>
    );
}

