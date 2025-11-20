import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { NotaCreate } from "../types/types";

const UpdateNota = ({ id, data }: { id: string; data: NotaCreate }) => {
  return api.put(`/tipe-nota/${id}`, data);
};

type UseUpdateNotaOptions = {
  mutationConfig?: MutationConfig<typeof UpdateNota>;
};

const useUpdateNota = ({ mutationConfig }: UseUpdateNotaOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["nota"] });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: UpdateNota,
  });
};

export { UpdateNota, useUpdateNota };

