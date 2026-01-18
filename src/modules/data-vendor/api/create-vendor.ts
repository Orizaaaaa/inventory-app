import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { VendorFormData } from "../schema";

const CreateVendor = ({ data }: { data: VendorFormData }) => {
    return api.post("/vendors", data);
};

type UseCreateVendorOptions = {
    mutationConfig?: MutationConfig<typeof CreateVendor>;
};

const useCreateVendor = ({ mutationConfig }: UseCreateVendorOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["vendor"] });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: CreateVendor,
    });
};

export { CreateVendor, useCreateVendor };