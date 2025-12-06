import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { BarangMasukResponse } from "../types/main";

export interface GetBarangMasukParams {
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

export const getBarangMasuk = async (params: GetBarangMasukParams = {}): Promise<BarangMasukResponse> => {
    return await api.get("/barang-masuk/list", { params });
};

export const getBarangMasukQueryOptions = (params: GetBarangMasukParams = {}) => {
    return queryOptions({
        queryKey: ["barang-masuk", params],
        queryFn: () => getBarangMasuk(params),
    });
};

export interface BarangMasukOptions {
    params?: GetBarangMasukParams;
    queryConfig?: TQueryConfig<typeof getBarangMasukQueryOptions>;
}

export const useBarangMasuk = ({ params, queryConfig }: BarangMasukOptions = {}) => {
    return useQuery({
        ...getBarangMasukQueryOptions(params),
        ...queryConfig,
    });
};

