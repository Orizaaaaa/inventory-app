import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { VendorResponse, VendorType } from "../types/type";

export const getVendor = async (params: Record<string, VendorType> = {}): Promise<VendorResponse> => {
    return await api.get("/vendors/list", { params });
};

export const getVendorQueryOptions = (params: Record<string, VendorType> = {}) => {
    return queryOptions({
        queryKey: ["vendor", params],
        queryFn: () => getVendor(params),
    });
};

export interface VendorOptions {
    params?: Record<string, VendorType>;
    queryConfig?: TQueryConfig<typeof getVendorQueryOptions>;
}

export const useVendor = ({ params, queryConfig }: VendorOptions = {}) => {
    return useQuery({
        ...getVendorQueryOptions(params),
        ...queryConfig,
    });
};