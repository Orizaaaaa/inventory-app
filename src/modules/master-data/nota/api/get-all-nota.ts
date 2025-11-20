import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { NotaResponse } from "../types/types";

export const getNota = async (params: Record<string, unknown> = {}): Promise<NotaResponse> => {
    return await api.get("/tipe-nota/list", { params });
};

export const getNotaQueryOptions = (params: Record<string, unknown> = {}) => {
    return queryOptions({
        queryKey: ["nota", params],
        queryFn: () => getNota(params),
    });
};

export interface NotaOptions {
    params?: Record<string, unknown>;
    queryConfig?: TQueryConfig<typeof getNotaQueryOptions>;
}

export const useNota = ({ params, queryConfig }: NotaOptions = {}) => {
    return useQuery({
        ...getNotaQueryOptions(params),
        ...queryConfig,
    });
};

