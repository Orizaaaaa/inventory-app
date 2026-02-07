import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { DashboardResponse } from "../types/main";

export const getDashboard = async (): Promise<DashboardResponse> => {
    return await api.get("/products/dashboard/summary");
};

export const getDashboardQueryOptions = () => {
    return queryOptions({
        queryKey: ["dashboard"],
        queryFn: () => getDashboard(),
    });
};

export interface DashboardOptions {
    queryConfig?: TQueryConfig<typeof getDashboardQueryOptions>;
}

export const useDashboard = ({ queryConfig }: DashboardOptions = {}) => {
    return useQuery({
        ...getDashboardQueryOptions(),
        ...queryConfig,
    });
};
