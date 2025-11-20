import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { SupplierResponse } from "../types/type";

export const getSupplier = async (params: Record<string, unknown> = {}): Promise<SupplierResponse> => {
    return await api.get("/suppliers/list", { params });
};

export const getSupplierQueryOptions = (params: Record<string, unknown> = {}) => {
    return queryOptions({
        queryKey: ["supplier", params],
        queryFn: () => getSupplier(params),
    });
};

export interface SupplierOptions {
    params?: Record<string, unknown>;
    queryConfig?: TQueryConfig<typeof getSupplierQueryOptions>;
}

export const useSupplier = ({ params, queryConfig }: SupplierOptions = {}) => {
    return useQuery({
        ...getSupplierQueryOptions(params),
        ...queryConfig,
    });
};

