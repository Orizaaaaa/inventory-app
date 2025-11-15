import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { ProductCreate } from "../types/main";

const UpdateProduct = ({ id, data }: { id: string; data: ProductCreate }) => {
  return api.put(`/products/${id}`, data);
};

type UseUpdateProductOptions = {
  mutationConfig?: MutationConfig<typeof UpdateProduct>;
};

const useUpdateProduct = ({ mutationConfig }: UseUpdateProductOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: UpdateProduct,
  });
};

export { UpdateProduct, useUpdateProduct };

