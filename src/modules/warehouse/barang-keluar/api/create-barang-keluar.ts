import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { BarangKeluarFormData } from "../types/main";

const CreateBarangKeluar = ({ data }: { data: BarangKeluarFormData }) => {
    return api.post("/barang-keluar", data);
};

type UseCreateBarangKeluarOptions = {
    mutationConfig?: MutationConfig<typeof CreateBarangKeluar>;
};

const useCreateBarangKeluar = ({ mutationConfig }: UseCreateBarangKeluarOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["barang-keluar"] });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: CreateBarangKeluar,
    });
};

export { CreateBarangKeluar, useCreateBarangKeluar };

