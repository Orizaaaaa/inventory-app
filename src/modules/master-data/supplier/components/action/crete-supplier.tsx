import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogCreate } from "@/components/ui/modals/dialog-create";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/forms/label";
import { Input } from "@/components/ui/forms/input";
import { SupplierSchema, type SupplierFormData } from "../../schema";
import { useCreateSupplier } from "../../api/create-supplier";


interface CreateSupplierModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateSupplierModal({
    open,
    onOpenChange,
}: CreateSupplierModalProps) {
    const {
        register,
        watch,
        reset,
        formState: { errors },
    } = useForm<SupplierFormData>({
        resolver: zodResolver(SupplierSchema),
        defaultValues: {
            name: "",
            phone: "",
        },
        mode: "onChange",
    });

    const modalConfirm = useModalConfirmStore("modalSubmit");
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const { mutateAsync: createSupplier } = useCreateSupplier({});

    const watchedValues = watch();
    const isFormComplete = Boolean(
        watchedValues.name &&
        watchedValues.name.trim().length >= 3 &&
        watchedValues.phone &&
        watchedValues.phone.trim().length >= 10
    );

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
                    await createSupplier({ data: formValues });
                    modalConfirm.hideModal();
                    modalSuccess.openModal("Your data has been successfully saved.");
                    onOpenChange(false);
                } catch (error: unknown) {
                    console.error("Create supplier error:", error);
                    modalConfirm.hideModal();
                    const message = error instanceof Error ? error.message : "Failed to create new supplier.";
                    modalFailed.openModal(message);
                }
            },
        });
    };


    const inputForm = (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Supplier Name</Label>
                <Input
                    {...register("name", { required: true })}
                    value={watchedValues.name}
                    placeholder="Input supplier name"
                    className={`w-full ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                    {...register("phone", { required: true })}
                    type="number"
                    value={watchedValues.phone}
                    placeholder="Input phone number"
                    className={`w-full ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
            </div>
        </div>
    );

    return (
        <DialogCreate
            title="Create New Supplier"
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
