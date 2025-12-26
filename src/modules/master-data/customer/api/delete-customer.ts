import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { MutationConfig } from "@/libs/react-query";
import { getCustomerQueryOptions } from "./get-all-customer";

const deleteCustomer = ({ id }: { id: string }) => {
    return api.delete(`/customers/${id}`);
}

type UseDeleteCustomer = {
    mutationConfig?: MutationConfig<typeof deleteCustomer>;
}

const useDeleteCustomer = ({ mutationConfig }: UseDeleteCustomer = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.refetchQueries({
                queryKey: getCustomerQueryOptions().queryKey
            });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: deleteCustomer,
    });
}

export {
    deleteCustomer as DeleteCustomer,
    useDeleteCustomer,
};

