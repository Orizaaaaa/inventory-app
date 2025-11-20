import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogCreate } from "@/components/ui/modals/dialog-create";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/forms/label";
import { Input } from "@/components/ui/forms/input";
import { CategorySchema, type CategoryFormData } from "../../schema";
import { useUpdateCategory } from "../../api/update-category";
import type { CategoryType } from "../../types/types";

interface UpdateCategoryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: CategoryType;
}

export default function UpdateCategoryModal({
    open,
    onOpenChange,
    category,
}: UpdateCategoryModalProps) {
    const categoryId = category.id || category._id || "";

    const {
        register,
        watch,
        reset,
        formState: { errors },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: category?.name || "",
        },
        mode: "onChange",
    });

    const modalConfirm = useModalConfirmStore("modalSubmit");
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const { mutateAsync: updateCategory } = useUpdateCategory({});

    const watchedValues = watch();
    const isFormComplete = Boolean(watchedValues.name && watchedValues.name.trim().length >= 3);

    useEffect(() => {
        if (open && category?.name) {
            reset({
                name: category.name,
            });
        }
    }, [category, open, reset]);

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
                    await updateCategory({ id: categoryId, data: formValues });
                    modalConfirm.hideModal();
                    modalSuccess.openModal("Your data has been successfully updated.");
                    onOpenChange(false);
                } catch (error: unknown) {
                    console.error("Update category error:", error);
                    modalConfirm.hideModal();
                    const message = error instanceof Error ? error.message : "Failed to update category.";
                    modalFailed.openModal(message);
                }
            },
        });
    };

    const inputForm = (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                    {...register("name", { required: true })}
                    value={watchedValues.name}
                    placeholder="Input category name"
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
            title="Update Category"
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

