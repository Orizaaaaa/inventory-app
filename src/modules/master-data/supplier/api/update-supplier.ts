import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { SupplierCreate } from "../types/type";

const UpdateSupplier = ({ id, data }: { id: string; data: SupplierCreate }) => {
  return api.put(`/suppliers/${id}`, data);
};

type UseUpdateSupplierOptions = {
  mutationConfig?: MutationConfig<typeof UpdateSupplier>;
};

const useUpdateSupplier = ({ mutationConfig }: UseUpdateSupplierOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: UpdateSupplier,
  });
};

export { UpdateSupplier, useUpdateSupplier };

