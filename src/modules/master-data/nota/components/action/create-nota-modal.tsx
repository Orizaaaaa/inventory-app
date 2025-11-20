import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogCreate } from "@/components/ui/modals/dialog-create";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/forms/label";
import { Input } from "@/components/ui/forms/input";
import { NotaSchema, type NotaFormData } from "../../schema";
import { useCreateNota } from "../../api/create-nota";

interface CreateNotaModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateNotaModal({
    open,
    onOpenChange,
}: CreateNotaModalProps) {
    const {
        register,
        watch,
        reset,
        formState: { errors },
    } = useForm<NotaFormData>({
        resolver: zodResolver(NotaSchema),
        defaultValues: {
            name: "",
        },
        mode: "onChange",
    });

    const modalConfirm = useModalConfirmStore("modalSubmit");
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const { mutateAsync: createNota } = useCreateNota({});

    const watchedValues = watch();
    const isFormComplete = Boolean(watchedValues.name && watchedValues.name.trim().length >= 3);

    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    const handleFormSubmit = async () => {
        const formValues = watch();

        modalConfirm.handleConfirm({
            heading: "Confirm!!",
            message: "Are you sure about the data entered?",
            btnText: "Yes, Confirm",
            onCancel: modalConfirm.hideModal,
            onSubmit: async () => {
                try {
                    await createNota({ data: formValues });
                    modalConfirm.hideModal();
                    modalSuccess.openModal("Your data has been successfully saved.");
                    onOpenChange(false);
                } catch (error: unknown) {
                    console.error("Create nota error:", error);
                    modalConfirm.hideModal();
                    const message = error instanceof Error ? error.message : "Failed to create new nota.";
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
            title="Create New Nota"
            inputForm={inputForm}
            isFormComplete={isFormComplete}
            handleSubmit={handleFormSubmit}
            buttonTitle="Create"
            open={open}
            onOpenChange={onOpenChange}
            renderTrigger={false}
            width="sm:max-w-[500px]"
        />
    );
}

