import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { MutationConfig } from "@/libs/react-query";
import { getSupplierQueryOptions } from "./get-all-supplier";

const deleteSupplier = ({ id }: { id: string }) => {
    return api.delete(`/suppliers/${id}`);
}

type UseDeleteSupplier = {
    mutationConfig?: MutationConfig<typeof deleteSupplier>;
}

const useDeleteSupplier = ({ mutationConfig }: UseDeleteSupplier = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.refetchQueries({
                queryKey: getSupplierQueryOptions().queryKey
            });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: deleteSupplier,
    });
}

export {
    deleteSupplier as DeleteSupplier,
    useDeleteSupplier,
};

