import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { CustomerResponse } from "../types/type";

export const getCustomer = async (params: Record<string, unknown> = {}): Promise<CustomerResponse> => {
    return await api.get("customers/list", { params });
};

export const getCustomerQueryOptions = (params: Record<string, unknown> = {}) => {
    return queryOptions({
        queryKey: ["customer", params],
        queryFn: () => getCustomer(params),
    });
};

export interface CustomerOptions {
    params?: Record<string, unknown>;
    queryConfig?: TQueryConfig<typeof getCustomerQueryOptions>;
}

export const useCustomer = ({ params, queryConfig }: CustomerOptions = {}) => {
    return useQuery({
        ...getCustomerQueryOptions(params),
        ...queryConfig,
    });
};

