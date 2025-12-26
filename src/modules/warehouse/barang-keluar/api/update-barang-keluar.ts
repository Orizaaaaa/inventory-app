import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { BarangKeluarFormData } from "../types/main";

const UpdateBarangKeluar = ({ id, data }: { id: string; data: BarangKeluarFormData }) => {
  return api.put(`/barang-keluar/${id}`, data);
};

type UseUpdateBarangKeluarOptions = {
  mutationConfig?: MutationConfig<typeof UpdateBarangKeluar>;
};

const useUpdateBarangKeluar = ({ mutationConfig }: UseUpdateBarangKeluarOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["barang-keluar"] });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: UpdateBarangKeluar,
  });
};

export { UpdateBarangKeluar, useUpdateBarangKeluar };

