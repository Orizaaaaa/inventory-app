import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { BarangKeluar } from "../types/main";

export interface BarangKeluarByIdResponse {
  code: number;
  status: string;
  message: string;
  data: BarangKeluar;
}

export const getBarangKeluarById = async (id: string): Promise<BarangKeluarByIdResponse> => {
  return await api.get(`/barang-keluar/${id}`);
};

export const getBarangKeluarByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["barang-keluar", id],
    queryFn: () => getBarangKeluarById(id),
    enabled: !!id,
  });
};

export interface BarangKeluarByIdOptions {
  id: string;
  queryConfig?: TQueryConfig<typeof getBarangKeluarByIdQueryOptions>;
}

export const useBarangKeluarById = ({ id, queryConfig }: BarangKeluarByIdOptions) => {
  return useQuery({
    ...getBarangKeluarByIdQueryOptions(id),
    ...queryConfig,
  });
};

