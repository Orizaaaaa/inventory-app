import { Button } from "@/components/ui/button";
import { useModalConfirm } from "@/hooks/use-modal-confirm";
import { useModalStore } from "@/hooks/use-modal-store";
import { Trash } from "lucide-react";
import { useDeleteNota } from "../../api/delete-nota";
import ModalDelete from "@/components/ui/modals/modal-delete";

export default function ButtonDeleteNota({ id }: { id: string }) {
    const modalDelete = useModalConfirm();
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");

    const deleteMutation = useDeleteNota({});

    const handleDelete = () => {
        modalDelete.handleConfirm({
            heading: "Delete?",
            message: "Are you sure want to delete this data?",
            onCancel: modalDelete.hideModal,
            onSubmit: async () => {
                try {
                    modalDelete.hideModal();
                    await deleteMutation.mutateAsync({ id });
                    modalSuccess.openModal("Your data has been successfully deleted.");
                } catch (error: unknown) {
                    modalDelete.hideModal();
                    const message = error instanceof Error ? error.message : "Failed to delete data.";
                    modalFailed.openModal(message);
                }
            },
        });
    };

    return (
        <div>
            <Button size={"iconMd"} variant={"dangers"} icon={<Trash />} onClick={handleDelete} />
            <ModalDelete visible={modalDelete.visible}
                loading={modalDelete.loading} heading={modalDelete.options.heading}
                message={modalDelete.options.message} btnText={modalDelete.options.btnText}
                onSubmit={modalDelete.onConfirm} onCancel={modalDelete.options.onCancel} />
        </div>
    );
}

