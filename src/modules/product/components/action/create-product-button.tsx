import { Button } from "@/components/ui/button";

import { useModalStore } from "@/hooks/use-modal-store";
import type { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "../../types/main";
import { useCreateProduct } from "../../api/create-product";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import ModalConfirm from "@/components/ui/modals/modal-confirm";
import ModalSuccess from "@/components/ui/modals/modal-success";
import ModalFailed from "@/components/ui/modals/modal-failed";

type CreateProductButtonProps = {
  form: UseFormReturn<ProductFormData, ProductFormData>;
  onSuccess?: () => void;
};

export default function CreateProductButton({ form, onSuccess }: CreateProductButtonProps) {
  const modalSuccess = useModalStore("modalSuccess");
  const modalFailed = useModalStore("modalFailed");
  const modalSubmit = useModalConfirmStore("modalSubmit");

  const { handleSubmit, formState: { isValid } } = form;
  const { mutateAsync: createProduct } = useCreateProduct({});

  const handleCreate = handleSubmit(async (values, e) => {
    e?.preventDefault();

    modalSubmit.handleConfirm({
      heading: "Confirm!!",
      message: "Are you sure about the data entered?",
      btnText: "Yes, Submit",
      onCancel: modalSubmit.hideModal,
      onSubmit: async () => {
        try {
          await createProduct({ data: values });
          modalSubmit.hideModal();
          form.reset();
          modalSuccess.openModal(
            "Your data has been successfully submitted.",
            () => {
              onSuccess?.();
            }
          );
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Failed to create product";
          modalFailed.openModal(errorMessage);
        }
      },
    });
  });

  return (
    <div>
      <Button
        variant={"gradien"}
        text="Submit"
        className="w-[150px]"
        onClick={handleCreate}
        disabled={!isValid}
      />
      
    </div>
  );
}

