import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { NotaCreate } from "../types/types";

const CreateNota = ({ data }: { data: NotaCreate }) => {
    return api.post("/tipe-nota", data);
};

type UseCreateNotaOptions = {
    mutationConfig?: MutationConfig<typeof CreateNota>;
};

const useCreateNota = ({ mutationConfig }: UseCreateNotaOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["nota"] });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: CreateNota,
    });
};

export { CreateNota, useCreateNota };

