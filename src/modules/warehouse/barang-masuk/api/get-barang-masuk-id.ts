import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { BarangMasuk } from "../types/main";

export interface BarangMasukByIdResponse {
  code: number;
  status: string;
  message: string;
  data: BarangMasuk;
}

export const getBarangMasukById = async (id: string): Promise<BarangMasukByIdResponse> => {
  return await api.get(`/barang-masuk/${id}`);
};

export const getBarangMasukByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["barang-masuk", id],
    queryFn: () => getBarangMasukById(id),
    enabled: !!id,
  });
};

export interface BarangMasukByIdOptions {
  id: string;
  queryConfig?: TQueryConfig<typeof getBarangMasukByIdQueryOptions>;
}

export const useBarangMasukById = ({ id, queryConfig }: BarangMasukByIdOptions) => {
  return useQuery({
    ...getBarangMasukByIdQueryOptions(id),
    ...queryConfig,
  });
};

