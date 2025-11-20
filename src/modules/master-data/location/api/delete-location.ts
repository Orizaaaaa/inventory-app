import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { MutationConfig } from "@/libs/react-query";
import { getLocationQueryOptions } from "./get-all-location";

const deleteLocation = ({ id }: { id: string }) => {
    return api.delete(`/lokasi-simpan/${id}`);
}

type UseDeleteLocation = {
    mutationConfig?: MutationConfig<typeof deleteLocation>;
}

const useDeleteLocation = ({ mutationConfig }: UseDeleteLocation = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.refetchQueries({
                queryKey: getLocationQueryOptions().queryKey
            });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: deleteLocation,
    });
}

export {
    deleteLocation as DeleteLocation,
    useDeleteLocation,
};

