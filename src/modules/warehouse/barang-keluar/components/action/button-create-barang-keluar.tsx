import { Button } from "@/components/ui/button";

import { useModalStore } from "@/hooks/use-modal-store";
import type { UseFormReturn } from "react-hook-form";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useNavigate } from "@/routes";
import type { BarangKeluarFormData } from "../../types/main";
import { useCreateBarangKeluar } from "../../api/create-barang-keluar";

type CreateBarangKeluarButtonProps = {
    form: UseFormReturn<BarangKeluarFormData>;
    onSuccess?: () => void;
};

export default function CreateBarangKeluarButton({ form }: CreateBarangKeluarButtonProps) {
    const navigate = useNavigate();
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const modalSubmit = useModalConfirmStore("modalSubmit");

    const { handleSubmit, formState: { isValid } } = form;
    const { mutateAsync: createBarangKeluar } = useCreateBarangKeluar({});

    const handleCreate = handleSubmit(async (values, e) => {
        e?.preventDefault();

        modalSubmit.handleConfirm({
            heading: "Confirm!!",
            message: "Are you sure about the data entered?",
            btnText: "Yes, Submit",
            onCancel: modalSubmit.hideModal,
            onSubmit: async () => {
                try {
                    // Format date to ISO string
                    const formattedData = {
                        ...values,
                        date: values.date ? values.date.toISOString().split('T')[0] : '',
                    };
                    await createBarangKeluar({ data: formattedData });
                    modalSubmit.hideModal();
                    modalSuccess.openModal(
                        "Your data has been successfully submitted.",
                        () => {
                            navigate("/warehouse/barang-keluar" as Parameters<typeof navigate>[0]);
                        }
                    );
                } catch (error: any) {
                    console.log("Create barang keluar error:", error);
                    const errorMessage = error.response?.data?.message || "Failed to create barang keluar";
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
                disabled={!isValid}
            />

        </div>
    );
}

