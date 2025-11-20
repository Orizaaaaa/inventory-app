import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { SupplierCreate } from "../types/type";

const CreateSupplier = ({ data }: { data: SupplierCreate }) => {
    return api.post("/suppliers", data);
};

type UseCreateSupplierOptions = {
    mutationConfig?: MutationConfig<typeof CreateSupplier>;
};

const useCreateSupplier = ({ mutationConfig }: UseCreateSupplierOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["supplier"] });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: CreateSupplier,
    });
};

export { CreateSupplier, useCreateSupplier };

