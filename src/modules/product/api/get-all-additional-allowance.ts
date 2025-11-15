import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { AdditionalAllowanceQuery, AdditionalAllowanceResponse } from "../types/pagination";

export const getAdditionalAllowance = async (params: AdditionalAllowanceQuery = {}): Promise<AdditionalAllowanceResponse> => {
    return await api.get("all-master-data-services/additional-allowances", { params });
};

export const getAdditionalAllowanceQueryOptions = (params: AdditionalAllowanceQuery = {}) => {
    return queryOptions({
        queryKey: ["master-data-additional-allowance", params],
        queryFn: () => getAdditionalAllowance(params),
    });
};

export interface AdditionalAllowanceOptions {
    params?: AdditionalAllowanceQuery;
    queryConfig?: TQueryConfig<typeof getAdditionalAllowanceQueryOptions>;
}

export const useAdditionalAllowance = ({ params, queryConfig }: AdditionalAllowanceOptions = {}) => {
    return useQuery({
        ...getAdditionalAllowanceQueryOptions(params),
        ...queryConfig,
    });
};
