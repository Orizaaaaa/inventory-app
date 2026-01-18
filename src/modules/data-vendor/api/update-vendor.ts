import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { VendorFormData } from "../schema";

const UpdateVendor = ({ id, data }: { id: string; data: VendorFormData }) => {
    return api.put(`/vendors/${id}`, data);
};

type UseUpdateVendorOptions = {
    mutationConfig?: MutationConfig<typeof UpdateVendor>;
};

const useUpdateVendor = ({ mutationConfig }: UseUpdateVendorOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...rest } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["vendor"] });
            onSuccess?.(...args);
        },
        ...rest,
        mutationFn: UpdateVendor,
    });
};

export { UpdateVendor, useUpdateVendor };