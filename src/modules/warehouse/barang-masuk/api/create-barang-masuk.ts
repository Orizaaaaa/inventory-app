import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { BarangMasukCreate } from "../types/main";

const CreateBarangMasuk = ({ data }: { data: BarangMasukCreate }) => {
    return api.post("/barang-masuk", data);
};

type UseCreateBarangMasukOptions = {
    mutationConfig?: MutationConfig<typeof CreateBarangMasuk>;
};

const useCreateBarangMasuk = ({ mutationConfig }: UseCreateBarangMasukOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["barang-masuk"] });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: CreateBarangMasuk,
    });
};

export { CreateBarangMasuk, useCreateBarangMasuk };

