import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { CategoryType } from "../types/types";

export interface CategoryByIdResponse {
  code: number;
  status: string;
  message: string;
  data: CategoryType;
}

export const getCategoryById = async (id: string): Promise<CategoryByIdResponse> => {
  return await api.get(`/categories/${id}`);
};

export const getCategoryByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};

export interface CategoryByIdOptions {
  id: string;
  queryConfig?: TQueryConfig<typeof getCategoryByIdQueryOptions>;
}

export const useCategoryById = ({ id, queryConfig }: CategoryByIdOptions) => {
  return useQuery({
    ...getCategoryByIdQueryOptions(id),
    ...queryConfig,
  });
};

