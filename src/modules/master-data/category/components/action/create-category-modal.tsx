import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogCreate } from "@/components/ui/modals/dialog-create";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/forms/label";
import { Input } from "@/components/ui/forms/input";
import { CategorySchema, type CategoryFormData } from "../../schema";
import { useCreateCategory } from "../../api/create-category";

interface CreateCategoryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateCategoryModal({
    open,
    onOpenChange,
}: CreateCategoryModalProps) {
    const {
        register,
        watch,
        reset,
        formState: { errors },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
        },
        mode: "onChange",
    });

    const modalConfirm = useModalConfirmStore("modalSubmit");
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const { mutateAsync: createCategory } = useCreateCategory({});

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
                    await createCategory({ data: formValues });
                    modalConfirm.hideModal();
                    modalSuccess.openModal("Your data has been successfully saved.");
                    onOpenChange(false);
                } catch (error: any) {
                    console.error("Create category error:", error);
                    modalConfirm.hideModal();
                    modalFailed.openModal(error?.message ?? "Failed to create new category.");
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
            title="Create New Category"
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

