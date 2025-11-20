import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { SupplierType } from "../types/type";

export interface SupplierByIdResponse {
  code: number;
  status: string;
  message: string;
  data: SupplierType;
}

export const getSupplierById = async (id: string): Promise<SupplierByIdResponse> => {
  return await api.get(`/suppliers/${id}`);
};

export const getSupplierByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["supplier", id],
    queryFn: () => getSupplierById(id),
    enabled: !!id,
  });
};

export interface SupplierByIdOptions {
  id: string;
  queryConfig?: TQueryConfig<typeof getSupplierByIdQueryOptions>;
}

export const useSupplierById = ({ id, queryConfig }: SupplierByIdOptions) => {
  return useQuery({
    ...getSupplierByIdQueryOptions(id),
    ...queryConfig,
  });
};

