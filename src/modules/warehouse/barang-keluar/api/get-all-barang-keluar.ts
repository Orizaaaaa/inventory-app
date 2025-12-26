import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { BarangKeluarResponse } from "../types/main";

export interface GetBarangKeluarParams {
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

export const getBarangKeluar = async (params: GetBarangKeluarParams = {}): Promise<BarangKeluarResponse> => {
    return await api.get("/barang-keluar/list", { params });
};

export const getBarangKeluarQueryOptions = (params: GetBarangKeluarParams = {}) => {
    return queryOptions({
        queryKey: ["barang-keluar", params],
        queryFn: () => getBarangKeluar(params),
    });
};

export interface BarangKeluarOptions {
    params?: GetBarangKeluarParams;
    queryConfig?: TQueryConfig<typeof getBarangKeluarQueryOptions>;
}

export const useBarangKeluar = ({ params, queryConfig }: BarangKeluarOptions = {}) => {
    return useQuery({
        ...getBarangKeluarQueryOptions(params),
        ...queryConfig,
    });
};

