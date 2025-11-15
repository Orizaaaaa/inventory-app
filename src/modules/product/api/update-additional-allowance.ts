import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { AdditionalAllowanceCreate } from "../types/additional-allowance";

const UpdateAdditionalAllowance = ({ id, data }: { id: string; data: AdditionalAllowanceCreate }) => {
  return api.put(`/all-master-data-services/additional-allowances/${id}`, data);
};

type UseUpdateAdditionalAllowanceOptions = {
  mutationConfig?: MutationConfig<typeof UpdateAdditionalAllowance>;
};

const useUpdateAdditionalAllowance = ({ mutationConfig }: UseUpdateAdditionalAllowanceOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["master-data-additional-allowance"] });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: UpdateAdditionalAllowance,
  });
};

export { UpdateAdditionalAllowance, useUpdateAdditionalAllowance };
