import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { CustomerCreate } from "../types/type";

const CreateCustomer = ({ data }: { data: CustomerCreate }) => {
    return api.post("/customers", data);
};

type UseCreateCustomerOptions = {
    mutationConfig?: MutationConfig<typeof CreateCustomer>;
};

const useCreateCustomer = ({ mutationConfig }: UseCreateCustomerOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["customer"] });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: CreateCustomer,
    });
};

export { CreateCustomer, useCreateCustomer };

