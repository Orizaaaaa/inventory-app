import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogCreate } from "@/components/ui/modals/dialog-create";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/forms/label";
import { Input } from "@/components/ui/forms/input";
import { VendorSchema, type VendorFormData } from "../../schema";
import type { VendorType } from "../../types/type";
import { useUpdateVendor } from "../../api/update-vendor";

interface UpdateVendorModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    vendor: VendorType;
}

export default function UpdateVendorModal({
    open,
    onOpenChange,
    vendor,
}: UpdateVendorModalProps) {
    const vendorId = vendor.id || vendor._id || "";
    const { mutate: updateProduct } = useUpdateVendor({});
    const {
        register,
        watch,
        reset,
        formState: { errors },
    } = useForm<VendorFormData>({
        resolver: zodResolver(VendorSchema),
        defaultValues: {
            name: vendor?.name || "",
            email: vendor?.email || "",
            phone: vendor?.phone || "",
            address: vendor?.address || "",
        },
        mode: "onChange",
    });

    const modalConfirm = useModalConfirmStore("modalSubmit");
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");

    const watchedValues = watch();


    useEffect(() => {
        if (open && vendor?.name) {
            reset({
                name: vendor.name,
                email: vendor.email || "",
                phone: vendor.phone || "",
                address: vendor.address || "",
            });
        }
    }, [vendor, open, reset]);

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
                    await updateProduct({ id: vendorId, data: formValues });
                    console.log("Update vendor:", { id: vendorId, data: formValues });
                    modalConfirm.hideModal();
                    modalSuccess.openModal("Your data has been successfully updated.");
                    onOpenChange(false);
                } catch (error: unknown) {
                    console.error("Update vendor error:", error);
                    modalConfirm.hideModal();
                    const message = error instanceof Error ? error.message : "Failed to update vendor.";
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
            title="Update Vendor"
            inputForm={inputForm}
            isFormComplete={true}
            handleSubmit={handleFormSubmit}
            buttonTitle="Update"
            open={open}
            onOpenChange={onOpenChange}
            renderTrigger={false}
            width="sm:max-w-[500px]"
        />
    );
}

