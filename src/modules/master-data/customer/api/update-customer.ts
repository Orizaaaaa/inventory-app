import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { CustomerCreate } from "../types/type";

const UpdateCustomer = ({ id, data }: { id: string; data: CustomerCreate }) => {
  return api.put(`/customers/${id}`, data);
};

type UseUpdateCustomerOptions = {
  mutationConfig?: MutationConfig<typeof UpdateCustomer>;
};

const useUpdateCustomer = ({ mutationConfig }: UseUpdateCustomerOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: UpdateCustomer,
  });
};

export { UpdateCustomer, useUpdateCustomer };

