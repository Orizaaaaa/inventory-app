import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogCreate } from "@/components/ui/modals/dialog-create";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/forms/label";
import { Input } from "@/components/ui/forms/input";
import { SupplierSchema, type SupplierFormData } from "../../schema";
import { useUpdateSupplier } from "../../api/update-supplier";
import type { SupplierType } from "../../types/type";

interface UpdateSupplierModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    supplier: SupplierType;
}

export default function UpdateSupplierModal({
    open,
    onOpenChange,
    supplier,
}: UpdateSupplierModalProps) {
    const supplierId = supplier.id || supplier._id || "";

    const {
        register,
        watch,
        reset,
        formState: { errors },
    } = useForm<SupplierFormData>({
        resolver: zodResolver(SupplierSchema),
        defaultValues: {
            name: supplier?.name || "",
            phone: supplier?.phone || "",
        },
        mode: "onChange",
    });

    const modalConfirm = useModalConfirmStore("modalSubmit");
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const { mutateAsync: updateSupplier } = useUpdateSupplier({});

    const watchedValues = watch();
    const isFormComplete = Boolean(
        watchedValues.name && 
        watchedValues.name.trim().length >= 3 &&
        watchedValues.phone && 
        watchedValues.phone.trim().length >= 10
    );

    useEffect(() => {
        if (open && supplier?.name) {
            reset({
                name: supplier.name,
                phone: supplier.phone || "",
            });
        }
    }, [supplier, open, reset]);

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
                    await updateSupplier({ id: supplierId, data: formValues });
                    modalConfirm.hideModal();
                    modalSuccess.openModal("Your data has been successfully updated.");
                    onOpenChange(false);
                } catch (error: unknown) {
                    console.error("Update supplier error:", error);
                    modalConfirm.hideModal();
                    const message = error instanceof Error ? error.message : "Failed to update supplier.";
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
            title="Update Supplier"
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

