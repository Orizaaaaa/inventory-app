import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { MutationConfig } from "@/libs/react-query";
import { getAdditionalAllowanceQueryOptions } from "./get-all-additional-allowance";


const deleteAdditionalAllowance = ({ id }: { id: string }) => {
    return api.delete(`/all-master-data-services/additional-allowances/${id}`);
}

type UseDeleteAdditionalAllowance = {
    mutationConfig?: MutationConfig<typeof deleteAdditionalAllowance>;
}

const useDeleteAdditionalAllowance = ({ mutationConfig }: UseDeleteAdditionalAllowance) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.refetchQueries({
                queryKey: getAdditionalAllowanceQueryOptions().queryKey
            });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: deleteAdditionalAllowance,
    });
}


export {
    deleteAdditionalAllowance as DeleteAdditionalAllowance,
    useDeleteAdditionalAllowance,
};
