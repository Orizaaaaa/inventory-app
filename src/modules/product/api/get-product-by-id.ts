import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { Product } from "../types/main";

export interface ProductByIdResponse {
  code: number;
  status: string;
  message: string;
  data: Product;
}

export const getProductById = async (id: string): Promise<ProductByIdResponse> => {
  return await api.get(`/products/${id}`);
};

export const getProductByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export interface ProductByIdOptions {
  id: string;
  queryConfig?: TQueryConfig<typeof getProductByIdQueryOptions>;
}

export const useProductById = ({ id, queryConfig }: ProductByIdOptions) => {
  return useQuery({
    ...getProductByIdQueryOptions(id),
    ...queryConfig,
  });
};

