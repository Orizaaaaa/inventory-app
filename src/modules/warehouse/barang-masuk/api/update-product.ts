import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { BarangMasukFormData } from "../types/main";

const UpdateBarangMasuk = ({ id, data }: { id: string; data: BarangMasukFormData }) => {
  return api.put(`/barang-masuk/${id}`, data);
};

type UseUpdateBarangMasukOptions = {
  mutationConfig?: MutationConfig<typeof UpdateBarangMasuk>;
};

const useUpdateBarangMasuk = ({ mutationConfig }: UseUpdateBarangMasukOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["barang-masuk"] });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: UpdateBarangMasuk,
  });
};

export { UpdateBarangMasuk, useUpdateBarangMasuk };

