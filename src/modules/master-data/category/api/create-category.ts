import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { CategoryCreate } from "../types/types";

const CreateCategory = ({ data }: { data: CategoryCreate }) => {
    return api.post("/categories", data);
};

type UseCreateCategoryOptions = {
    mutationConfig?: MutationConfig<typeof CreateCategory>;
};

const useCreateCategory = ({ mutationConfig }: UseCreateCategoryOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["category"] });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: CreateCategory,
    });
};

export { CreateCategory, useCreateCategory };

