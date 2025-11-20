import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { CategoryCreate } from "../types/types";

const UpdateCategory = ({ id, data }: { id: string; data: CategoryCreate }) => {
  return api.put(`/categories/${id}`, data);
};

type UseUpdateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof UpdateCategory>;
};

const useUpdateCategory = ({ mutationConfig }: UseUpdateCategoryOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: UpdateCategory,
  });
};

export { UpdateCategory, useUpdateCategory };

