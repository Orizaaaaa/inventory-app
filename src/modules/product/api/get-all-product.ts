import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { ProductResponse } from "../types/main";

export const getProduct = async (params: Record<string, any> = {}): Promise<ProductResponse> => {
    return await api.get("/products/list", { params });
};

export const getProductQueryOptions = (params: Record<string, any> = {}) => {
    return queryOptions({
        queryKey: ["product", params],
        queryFn: () => getProduct(params),
    });
};

export interface ProductOptions {
    params?: Record<string, any>;
    queryConfig?: TQueryConfig<typeof getProductQueryOptions>;
}

export const useProduct = ({ params, queryConfig }: ProductOptions = {}) => {
    return useQuery({
        ...getProductQueryOptions(params),
        ...queryConfig,
    });
};

