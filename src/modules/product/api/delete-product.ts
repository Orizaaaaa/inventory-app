import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { MutationConfig } from "@/libs/react-query";
import { getProductQueryOptions } from "./get-all-product";


const deleteProduct = ({ id }: { id: string }) => {
    return api.delete(`/products/${id}`);
}

type UseDeleteProduct = {
    mutationConfig?: MutationConfig<typeof deleteProduct>;
}

const useDeleteProduct = ({ mutationConfig }: UseDeleteProduct) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.refetchQueries({
                queryKey: getProductQueryOptions().queryKey
            });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: deleteProduct,
    });
}


export {
    deleteProduct as DeleteProduct,
    useDeleteProduct,
};

