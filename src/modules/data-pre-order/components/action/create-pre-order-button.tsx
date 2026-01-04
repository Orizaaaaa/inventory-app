import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import type { UseFormReturn } from "react-hook-form";
import type { PreOrderFormData } from "../../schema";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useNavigate } from "@/routes";

type CreatePreOrderButtonProps = {
    form: UseFormReturn<PreOrderFormData>;
    onSuccess?: () => void;
};

export default function CreatePreOrderButton({ form, onSuccess }: CreatePreOrderButtonProps) {
    const navigate = useNavigate();
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const modalSubmit = useModalConfirmStore("modalSubmit");

    const { handleSubmit, formState: { isValid } } = form;

    const handleCreate = handleSubmit(async (values, e) => {
        e?.preventDefault();

        modalSubmit.handleConfirm({
            heading: "Confirm!!",
            message: "Are you sure about the data entered?",
            btnText: "Yes, Confirm",
            onCancel: modalSubmit.hideModal,
            onSubmit: async () => {
                try {
                    // TODO: Replace with actual API call
                    console.log("Create pre-order:", values);
                    modalSubmit.hideModal();
                    form.reset();
                    modalSuccess.openModal(
                        "Your data has been successfully saved.",
                        () => {
                            onSuccess?.();
                            navigate("/data-pre-order/rincian" as Parameters<typeof navigate>[0]);
                        }
                    );
                } catch (error: any) {
                    console.log("Create pre-order error:", error);
                    const errorMessage = error.response?.data?.message || "Failed to create pre-order.";
                    modalFailed.openModal(errorMessage);
                }
            },
        });
    });

    return (
        <div>
            <Button
                variant={"gradien"}
                text="Submit"
                className="w-[150px]"
                onClick={handleCreate}
                disabled={!isValid}
            />
        </div>
    );
}

