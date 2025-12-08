import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { MutationConfig } from "@/libs/react-query";
import { getBarangMasukQueryOptions } from "./get-all-barang-masuk";
const deleteBarangMasuk = ({ id }: { id: string }) => {
    return api.delete(`/barang-masuk/${id}`);
}

type UseDeleteBarangMasukType = {
    mutationConfig?: MutationConfig<typeof deleteBarangMasuk>;
}

const useDeleteBarangMasuk = ({ mutationConfig }: UseDeleteBarangMasukType) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.refetchQueries({
                queryKey: getBarangMasukQueryOptions().queryKey
            });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: deleteBarangMasuk,
    });
}


export {
    deleteBarangMasuk as DeleteBarangMasuk,
    useDeleteBarangMasuk,
};

