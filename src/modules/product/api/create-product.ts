import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { ProductCreate } from "../types/main";

const CreateProduct = ({ data }: { data: ProductCreate }) => {
    return api.post("/products", data);
};

type UseCreateProductOptions = {
    mutationConfig?: MutationConfig<typeof CreateProduct>;
};

const useCreateProduct = ({ mutationConfig }: UseCreateProductOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["product"] });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: CreateProduct,
    });
};

export { CreateProduct, useCreateProduct };

