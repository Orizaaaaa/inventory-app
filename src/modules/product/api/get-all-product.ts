import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { Product, ProductResponse } from "../types/main";

export const getProduct = async (params: Record<string, Product> = {}): Promise<ProductResponse> => {
    return await api.get("/products/list", { params });
};

export const getProductQueryOptions = (params: Record<string, Product> = {}) => {
    return queryOptions({
        queryKey: ["product", params],
        queryFn: () => getProduct(params),
    });
};

export interface ProductOptions {
    params?: Record<string, Product>;
    queryConfig?: TQueryConfig<typeof getProductQueryOptions>;
}

export const useProduct = ({ params, queryConfig }: ProductOptions = {}) => {
    return useQuery({
        ...getProductQueryOptions(params),
        ...queryConfig,
    });
};

