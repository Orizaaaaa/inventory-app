import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogCreate } from "@/components/ui/modals/dialog-create";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/forms/label";
import { Input } from "@/components/ui/forms/input";
import { LocationSchema, type LocationFormData } from "../../schema";
import { useUpdateLocation } from "../../api/update-location";
import type { LocationType } from "../../types/types";

interface UpdateLocationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    location: LocationType;
}

export default function UpdateLocationModal({
    open,
    onOpenChange,
    location,
}: UpdateLocationModalProps) {
    const locationId = location.id || location._id || "";

    const {
        register,
        watch,
        reset,
        formState: { errors },
    } = useForm<LocationFormData>({
        resolver: zodResolver(LocationSchema),
        defaultValues: {
            name: location?.name || "",
        },
        mode: "onChange",
    });

    const modalConfirm = useModalConfirmStore("modalSubmit");
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const { mutateAsync: updateLocation } = useUpdateLocation({});

    const watchedValues = watch();
    const isFormComplete = Boolean(watchedValues.name && watchedValues.name.trim().length >= 3);

    useEffect(() => {
        if (open && location?.name) {
            reset({
                name: location.name,
            });
        }
    }, [location, open, reset]);

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
                    await updateLocation({ id: locationId, data: formValues });
                    modalConfirm.hideModal();
                    modalSuccess.openModal("Your data has been successfully updated.");
                    onOpenChange(false);
                } catch (error: unknown) {
                    console.error("Update location error:", error);
                    modalConfirm.hideModal();
                    const message = error instanceof Error ? error.message : "Failed to update location.";
                    modalFailed.openModal(message);
                }
            },
        });
    };

    const inputForm = (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Location Name</Label>
                <Input
                    {...register("name", { required: true })}
                    value={watchedValues.name}
                    placeholder="Input location name"
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
            title="Update Location"
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

