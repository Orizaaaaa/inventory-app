import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { AdditionalAllowanceCreate } from "../types/additional-allowance";

const CreateAdditionalAllowance = ({ data }: { data: AdditionalAllowanceCreate }) => {
    return api.post("/all-master-data-services/additional-allowances", data);
};

type UseCreateAdditionalAllowanceOptions = {
    mutationConfig?: MutationConfig<typeof CreateAdditionalAllowance>;
};

const useCreateAdditionalAllowance = ({ mutationConfig }: UseCreateAdditionalAllowanceOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["master-data-additional-allowance"] });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: CreateAdditionalAllowance,
    });
};

export { CreateAdditionalAllowance, useCreateAdditionalAllowance };
