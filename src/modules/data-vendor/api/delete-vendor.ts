import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { MutationConfig } from "@/libs/react-query";
import { getVendorQueryOptions } from "./get-list-vendor";
const deleteVendor = ({ id }: { id: string }) => {
    return api.delete(`/vendors/${id}`);
}

type UseDeleteVendorOptions = {
    mutationConfig?: MutationConfig<typeof deleteVendor>;
}

const useDeleteVendor = ({ mutationConfig }: UseDeleteVendorOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.refetchQueries({
                queryKey: getVendorQueryOptions().queryKey
            });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: deleteVendor,
    });
}

export {
    deleteVendor as DeleteVendor,
    useDeleteVendor,
};