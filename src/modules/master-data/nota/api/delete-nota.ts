import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { MutationConfig } from "@/libs/react-query";
import { getNotaQueryOptions } from "./get-all-nota";

const deleteNota = ({ id }: { id: string }) => {
    return api.delete(`/tipe-nota/${id}`);
}

type UseDeleteNota = {
    mutationConfig?: MutationConfig<typeof deleteNota>;
}

const useDeleteNota = ({ mutationConfig }: UseDeleteNota = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.refetchQueries({
                queryKey: getNotaQueryOptions().queryKey
            });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: deleteNota,
    });
}

export {
    deleteNota as DeleteNota,
    useDeleteNota,
};

