import { Button } from "@/components/ui/button";

import { useModalStore } from "@/hooks/use-modal-store";
import type { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "../../types/main";
import { useUpdateProduct } from "../../api/update-product";
import { postImage } from "@/utils/image_post";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";

type UpdateProductButtonProps = {
  form: UseFormReturn<ProductFormData, ProductFormData>;
  id: string;
  onSuccess?: () => void;
};

export default function UpdateProductButton({ form, id, onSuccess }: UpdateProductButtonProps) {
  const modalSuccess = useModalStore("modalSuccess");
  const modalFailed = useModalStore("modalFailed");
  const modalSubmit = useModalConfirmStore("modalSubmit");

  const { handleSubmit, formState: { isValid } } = form;
  const { mutateAsync: updateProduct } = useUpdateProduct({});

  const handleUpdate = handleSubmit(async (values, e) => {
    e?.preventDefault();

    modalSubmit.handleConfirm({
      heading: "Confirm Update!!",
      message: "Are you sure about the changes made?",
      btnText: "Yes, Update",
      onCancel: modalSubmit.hideModal,
      onSubmit: async () => {
        try {
          const payload = { ...values } as any;
          if (payload.image_url && typeof payload.image_url !== "string") {
            try {
              const uploaded = await postImage({ image: payload.image_url });
              payload.image_url = uploaded;
            } catch (err) {
              modalFailed.openModal("Failed to upload image. Please try again.");
              return;
            }
          }

          await updateProduct({ id, data: payload });
          modalSubmit.hideModal();
          form.reset();
          modalSuccess.openModal(
            "Your data has been successfully updated.",
            () => {
              onSuccess?.();
            }
          );
        } catch (error: any) {
          const errorMessage = error.response.data.message || "Failed to create product";
          modalFailed.openModal(errorMessage);
        }
      },
    });
  });

  return (
    <div>
      <Button
        variant={"gradien"}
        text="Update"
        className="w-[150px]"
        onClick={handleUpdate}
        disabled={!isValid}
      />
    </div>
  );
}

