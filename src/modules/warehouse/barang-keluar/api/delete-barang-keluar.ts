import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { MutationConfig } from "@/libs/react-query";
import { getBarangKeluarQueryOptions } from "./get-all-barang-keluar";
const deleteBarangKeluar = ({ id }: { id: string }) => {
    return api.delete(`/barang-keluar/${id}`);
}

type UseDeleteBarangKeluarType = {
    mutationConfig?: MutationConfig<typeof deleteBarangKeluar>;
}

const useDeleteBarangKeluar = ({ mutationConfig }: UseDeleteBarangKeluarType) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.refetchQueries({
                queryKey: getBarangKeluarQueryOptions().queryKey
            });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: deleteBarangKeluar,
    });
}


export {
    deleteBarangKeluar as DeleteBarangKeluar,
    useDeleteBarangKeluar,
};

