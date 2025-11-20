import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogCreate } from "@/components/ui/modals/dialog-create";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/forms/label";
import { Input } from "@/components/ui/forms/input";
import { NotaSchema, type NotaFormData } from "../../schema";
import { useUpdateNota } from "../../api/update-nota";
import type { NotaType } from "../../types/types";

interface UpdateNotaModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    nota: NotaType;
}

export default function UpdateNotaModal({
    open,
    onOpenChange,
    nota,
}: UpdateNotaModalProps) {
    const notaId = nota.id || nota._id || "";

    const {
        register,
        watch,
        reset,
        formState: { errors },
    } = useForm<NotaFormData>({
        resolver: zodResolver(NotaSchema),
        defaultValues: {
            name: nota?.name || "",
        },
        mode: "onChange",
    });

    const modalConfirm = useModalConfirmStore("modalSubmit");
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const { mutateAsync: updateNota } = useUpdateNota({});

    const watchedValues = watch();
    const isFormComplete = Boolean(watchedValues.name && watchedValues.name.trim().length >= 3);

    useEffect(() => {
        if (open && nota?.name) {
            reset({
                name: nota.name,
            });
        }
    }, [nota, open, reset]);

    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    const handleFormSubmit = async () => {
        const formValues = watch();

        modalConfirm.handleConfirm({
            heading: "Confirm Update!!",
            message: "Are you sure about the changes made?",
            btnText: "Yes, Update",
            onCancel: modalConfirm.hideModal,
            onSubmit: async () => {
                try {
                    await updateNota({ id: notaId, data: formValues });
                    modalConfirm.hideModal();
                    modalSuccess.openModal("Your data has been successfully updated.");
                    onOpenChange(false);
                } catch (error: unknown) {
                    console.error("Update nota error:", error);
                    modalConfirm.hideModal();
                    const message = error instanceof Error ? error.message : "Failed to update nota.";
                    modalFailed.openModal(message);
                }
            },
        });
    };

    const inputForm = (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Nota Name</Label>
                <Input
                    {...register("name", { required: true })}
                    value={watchedValues.name}
                    placeholder="Input nota name"
                    className={`w-full ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>
        </div>
    );

    return (
        <DialogCreate
            title="Update Nota"
            inputForm={inputForm}
            isFormComplete={isFormComplete}
            handleSubmit={handleFormSubmit}
            buttonTitle="Update"
            open={open}
            onOpenChange={onOpenChange}
            renderTrigger={false}
            width="sm:max-w-[500px]"
        />
    );
}

