import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { LocationResponse } from "../types/types";

export const getLocation = async (params: Record<string, unknown> = {}): Promise<LocationResponse> => {
    return await api.get("/lokasi-simpan/list", { params });
};

export const getLocationQueryOptions = (params: Record<string, unknown> = {}) => {
    return queryOptions({
        queryKey: ["location", params],
        queryFn: () => getLocation(params),
    });
};

export interface LocationOptions {
    params?: Record<string, unknown>;
    queryConfig?: TQueryConfig<typeof getLocationQueryOptions>;
}

export const useLocation = ({ params, queryConfig }: LocationOptions = {}) => {
    return useQuery({
        ...getLocationQueryOptions(params),
        ...queryConfig,
    });
};

