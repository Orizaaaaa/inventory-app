import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { LocationCreate } from "../types/types";

const CreateLocation = ({ data }: { data: LocationCreate }) => {
    return api.post("/lokasi-simpan", data);
};

type UseCreateLocationOptions = {
    mutationConfig?: MutationConfig<typeof CreateLocation>;
};

const useCreateLocation = ({ mutationConfig }: UseCreateLocationOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["location"] });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: CreateLocation,
    });
};

export { CreateLocation, useCreateLocation };

