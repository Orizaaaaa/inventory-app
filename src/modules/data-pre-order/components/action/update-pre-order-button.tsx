import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import type { UseFormReturn } from "react-hook-form";
import type { PreOrderFormData } from "../../schema";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";

type UpdatePreOrderButtonProps = {
    form: UseFormReturn<PreOrderFormData>;
    id: string;
    onSuccess?: () => void;
};

export default function UpdatePreOrderButton({ form, id, onSuccess }: UpdatePreOrderButtonProps) {
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const modalSubmit = useModalConfirmStore("modalSubmit");

    const { handleSubmit, formState: { isValid } } = form;

    const handleUpdate = handleSubmit(async (values, e) => {
        e?.preventDefault();

        modalSubmit.handleConfirm({
            heading: "Confirm Update!!",
            message: "Are you sure about the changes made?",
            btnText: "Yes, Update",
            onCancel: modalSubmit.hideModal,
            onSubmit: async () => {
                try {
                    // TODO: Replace with actual API call
                    console.log("Update pre-order:", { id, data: values });
                    modalSubmit.hideModal();
                    form.reset();
                    modalSuccess.openModal(
                        "Your data has been successfully updated.",
                        () => {
                            onSuccess?.();
                        }
                    );
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || "Failed to update pre-order.";
                    modalFailed.openModal(errorMessage);
                }
            },
        });
    });

    return (
        <div>
            <Button
                variant={"gradien"}
                text="Update"
                className="w-[150px]"
                onClick={handleUpdate}
                disabled={!isValid}
            />
        </div>
    );
}

