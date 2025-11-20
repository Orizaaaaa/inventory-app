import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { CategoryResponse } from "../types/types";

export const getCategory = async (params: Record<string, any> = {}): Promise<CategoryResponse> => {
    return await api.get("/categories/list", { params });
};

export const getCategoryQueryOptions = (params: Record<string, any> = {}) => {
    return queryOptions({
        queryKey: ["category", params],
        queryFn: () => getCategory(params),
    });
};

export interface CategoryOptions {
    params?: Record<string, any>;
    queryConfig?: TQueryConfig<typeof getCategoryQueryOptions>;
}

export const useCategory = ({ params, queryConfig }: CategoryOptions = {}) => {
    return useQuery({
        ...getCategoryQueryOptions(params),
        ...queryConfig,
    });
};

