import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogCreate } from "@/components/ui/modals/dialog-create";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/forms/label";
import { Input } from "@/components/ui/forms/input";
import { PreOrderSchema, type PreOrderFormData } from "../../schema";
import SelectDropdown from "@/components/ui/select/select-dropdown";


interface CreatePreOrderModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Processing", value: "processing" },
    { label: "Ready", value: "ready" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
];

export default function CreatePreOrderModal({
    open,
    onOpenChange,
}: CreatePreOrderModalProps) {
    const {
        register,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<PreOrderFormData>({
        resolver: zodResolver(PreOrderSchema),
        defaultValues: {
            orderNumber: "",
            customerName: "",
            customerEmail: "",
            customerPhone: "",
            orderDate: new Date().toISOString().split('T')[0],
            deliveryDate: "",
            status: "pending",
            totalAmount: 0,
            notes: "",
        },
        mode: "onChange",
    });

    const modalConfirm = useModalConfirmStore("modalSubmit");
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");

    const watchedValues = watch();
    const isFormComplete = Boolean(
        watchedValues.orderNumber &&
        watchedValues.orderNumber.trim().length >= 3 &&
        watchedValues.customerName &&
        watchedValues.customerName.trim().length >= 3 &&
        watchedValues.orderDate &&
        watchedValues.status &&
        watchedValues.totalAmount !== undefined &&
        watchedValues.totalAmount >= 0
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
                    console.log("Create pre-order:", formValues);
                    modalConfirm.hideModal();
                    modalSuccess.openModal("Your data has been successfully saved.");
                    onOpenChange(false);
                } catch (error: unknown) {
                    console.error("Create pre-order error:", error);
                    modalConfirm.hideModal();
                    const message = error instanceof Error ? error.message : "Failed to create new pre-order.";
                    modalFailed.openModal(message);
                }
            },
        });
    };


    const inputForm = (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input
                    {...register("orderNumber", { required: true })}
                    value={watchedValues.orderNumber}
                    placeholder="Input order number"
                    className={`w-full ${errors.orderNumber ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.orderNumber && (
                    <p className="text-sm text-red-500">{errors.orderNumber.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                    {...register("customerName", { required: true })}
                    value={watchedValues.customerName}
                    placeholder="Input customer name"
                    className={`w-full ${errors.customerName ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.customerName && (
                    <p className="text-sm text-red-500">{errors.customerName.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="customerEmail">Customer Email (Optional)</Label>
                <Input
                    {...register("customerEmail")}
                    type="email"
                    value={watchedValues.customerEmail || ""}
                    placeholder="Input customer email"
                    className={`w-full ${errors.customerEmail ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.customerEmail && (
                    <p className="text-sm text-red-500">{errors.customerEmail.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="customerPhone">Customer Phone (Optional)</Label>
                <Input
                    {...register("customerPhone")}
                    value={watchedValues.customerPhone || ""}
                    placeholder="Input customer phone"
                    className={`w-full ${errors.customerPhone ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.customerPhone && (
                    <p className="text-sm text-red-500">{errors.customerPhone.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="orderDate">Order Date</Label>
                <Input
                    {...register("orderDate", { required: true })}
                    type="date"
                    value={watchedValues.orderDate}
                    className={`w-full ${errors.orderDate ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.orderDate && (
                    <p className="text-sm text-red-500">{errors.orderDate.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="deliveryDate">Delivery Date (Optional)</Label>
                <Input
                    {...register("deliveryDate")}
                    type="date"
                    value={watchedValues.deliveryDate || ""}
                    className={`w-full ${errors.deliveryDate ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.deliveryDate && (
                    <p className="text-sm text-red-500">{errors.deliveryDate.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <SelectDropdown
                    options={statusOptions}
                    value={watchedValues.status}
                    onChange={(value) => setValue("status", value)}
                    placeholder="Select status"
                    className="w-full"
                    minWidth={200}
                    maxWidth={500}
                />
                {errors.status && (
                    <p className="text-sm text-red-500">{errors.status.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="totalAmount">Total Amount</Label>
                <Input
                    {...register("totalAmount", { required: true, valueAsNumber: true })}
                    type="number"
                    value={watchedValues.totalAmount}
                    placeholder="Input total amount"
                    className={`w-full ${errors.totalAmount ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.totalAmount && (
                    <p className="text-sm text-red-500">{errors.totalAmount.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                    {...register("notes")}
                    value={watchedValues.notes || ""}
                    placeholder="Input notes"
                    className={`w-full ${errors.notes ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.notes && (
                    <p className="text-sm text-red-500">{errors.notes.message}</p>
                )}
            </div>
        </div>
    );

    return (
        <DialogCreate
            title="Create New Pre-Order"
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



