import { Button } from "@/components/ui/button";
import { useModalConfirm } from "@/hooks/use-modal-confirm";
import { useModalStore } from "@/hooks/use-modal-store";
import { Trash } from "lucide-react";
import ModalDelete from "@/components/ui/modals/modal-delete";

export default function ButtonDeleteBahanBaku({ id }: { id: string }) {
    const modalDelete = useModalConfirm();
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");

    const handleDelete = () => {
        modalDelete.handleConfirm({
            heading: "Delete?",
            message: "Are you sure want to delete this data?",
            onCancel: modalDelete.hideModal,
            onSubmit: async () => {
                try {
                    modalDelete.hideModal();
                    // TODO: Replace with actual API call
                    console.log("Delete bahan baku:", id);
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



