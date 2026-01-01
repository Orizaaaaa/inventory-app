import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogCreate } from "@/components/ui/modals/dialog-create";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/forms/label";
import { Input } from "@/components/ui/forms/input";
import { VendorSchema, type VendorFormData } from "../../schema";


interface CreateVendorModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateVendorModal({
    open,
    onOpenChange,
}: CreateVendorModalProps) {
    const {
        register,
        watch,
        reset,
        formState: { errors },
    } = useForm<VendorFormData>({
        resolver: zodResolver(VendorSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
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
        watchedValues.email &&
        watchedValues.email.includes("@") &&
        watchedValues.phone &&
        watchedValues.phone.trim().length >= 10 &&
        watchedValues.address &&
        watchedValues.address.trim().length >= 5
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
                    console.log("Create vendor:", formValues);
                    modalConfirm.hideModal();
                    modalSuccess.openModal("Your data has been successfully saved.");
                    onOpenChange(false);
                } catch (error: unknown) {
                    console.error("Create vendor error:", error);
                    modalConfirm.hideModal();
                    const message = error instanceof Error ? error.message : "Failed to create new vendor.";
                    modalFailed.openModal(message);
                }
            },
        });
    };


    const inputForm = (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Vendor Name</Label>
                <Input
                    {...register("name", { required: true })}
                    value={watchedValues.name}
                    placeholder="Input vendor name"
                    className={`w-full ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    {...register("email", { required: true })}
                    type="email"
                    value={watchedValues.email}
                    placeholder="Input email"
                    className={`w-full ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
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
            <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                    {...register("address", { required: true })}
                    value={watchedValues.address}
                    placeholder="Input address"
                    className={`w-full ${errors.address ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                )}
            </div>
        </div>
    );

    return (
        <DialogCreate
            title="Create New Vendor"
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

