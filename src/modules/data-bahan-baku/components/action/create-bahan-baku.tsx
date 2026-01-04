import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogCreate } from "@/components/ui/modals/dialog-create";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/forms/label";
import { Input } from "@/components/ui/forms/input";
import { BahanBakuSchema, type BahanBakuFormData } from "../../schema";


interface CreateBahanBakuModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateBahanBakuModal({
    open,
    onOpenChange,
}: CreateBahanBakuModalProps) {
    const {
        register,
        watch,
        reset,
        formState: { errors },
    } = useForm<BahanBakuFormData>({
        resolver: zodResolver(BahanBakuSchema),
        defaultValues: {
            name: "",
            code: "",
            unit: "",
            stock: 0,
            location: "",
            supplier: "",
        },
        mode: "onChange",
    });

    const modalConfirm = useModalConfirmStore("modalSubmit");
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");

    const watchedValues = watch();
    const isFormComplete = Boolean(
        watchedValues.name &&
        watchedValues.name.trim().length >= 3 &&
        watchedValues.code &&
        watchedValues.code.trim().length >= 2 &&
        watchedValues.unit &&
        watchedValues.unit.trim().length > 0 &&
        watchedValues.stock !== undefined &&
        watchedValues.stock >= 0 &&
        watchedValues.location &&
        watchedValues.location.trim().length > 0
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
                    // TODO: Replace with actual API call
                    console.log("Create bahan baku:", formValues);
                    modalConfirm.hideModal();
                    modalSuccess.openModal("Your data has been successfully saved.");
                    onOpenChange(false);
                } catch (error: unknown) {
                    console.error("Create bahan baku error:", error);
                    modalConfirm.hideModal();
                    const message = error instanceof Error ? error.message : "Failed to create new bahan baku.";
                    modalFailed.openModal(message);
                }
            },
        });
    };


    const inputForm = (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Bahan Baku Name</Label>
                <Input
                    {...register("name", { required: true })}
                    value={watchedValues.name}
                    placeholder="Input bahan baku name"
                    className={`w-full ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>
            <div className="flex gap-4">
                <div className="space-y-2">
                    <Label htmlFor="code">Code</Label>
                    <Input
                        {...register("code", { required: true })}
                        value={watchedValues.code}
                        placeholder="Input code"
                        className={`w-full ${errors.code ? "border-red-500 focus:border-red-500" : ""}`}
                    />
                    {errors.code && (
                        <p className="text-sm text-red-500">{errors.code.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                        {...register("unit", { required: true })}
                        value={watchedValues.unit}
                        placeholder="Input unit (kg, pcs, liter, etc)"
                        className={`w-full ${errors.unit ? "border-red-500 focus:border-red-500" : ""}`}
                    />
                    {errors.unit && (
                        <p className="text-sm text-red-500">{errors.unit.message}</p>
                    )}
                </div>
            </div>
            <div className="flex gap-4">
                <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                        {...register("stock", { required: true, valueAsNumber: true })}
                        type="number"
                        value={watchedValues.stock}
                        placeholder="Input stock"
                        className={`w-full ${errors.stock ? "border-red-500 focus:border-red-500" : ""}`}
                    />
                    {errors.stock && (
                        <p className="text-sm text-red-500">{errors.stock.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        {...register("location", { required: true })}
                        value={watchedValues.location}
                        placeholder="Input location"
                        className={`w-full ${errors.location ? "border-red-500 focus:border-red-500" : ""}`}
                    />
                    {errors.location && (
                        <p className="text-sm text-red-500">{errors.location.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="supplier">Supplier (Optional)</Label>
                <Input
                    {...register("supplier")}
                    value={watchedValues.supplier || ""}
                    placeholder="Input supplier"
                    className={`w-full ${errors.supplier ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.supplier && (
                    <p className="text-sm text-red-500">{errors.supplier.message}</p>
                )}
            </div>
        </div>
    );

    return (
        <DialogCreate
            title="Create New Bahan Baku"
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



