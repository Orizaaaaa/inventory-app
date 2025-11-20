import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { MutationConfig } from "@/libs/react-query";
import { getCategoryQueryOptions } from "./get-all-category";

const deleteCategory = ({ id }: { id: string }) => {
    return api.delete(`/categories/${id}`);
}

type UseDeleteCategory = {
    mutationConfig?: MutationConfig<typeof deleteCategory>;
}

const useDeleteCategory = ({ mutationConfig }: UseDeleteCategory = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.refetchQueries({
                queryKey: getCategoryQueryOptions().queryKey
            });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: deleteCategory,
    });
}

export {
    deleteCategory as DeleteCategory,
    useDeleteCategory,
};

