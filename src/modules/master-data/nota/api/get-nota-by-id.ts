import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { NotaType } from "../types/types";

export interface NotaByIdResponse {
  code: number;
  status: string;
  message: string;
  data: NotaType;
}

export const getNotaById = async (id: string): Promise<NotaByIdResponse> => {
  return await api.get(`/tipe-nota/${id}`);
};

export const getNotaByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["nota", id],
    queryFn: () => getNotaById(id),
    enabled: !!id,
  });
};

export interface NotaByIdOptions {
  id: string;
  queryConfig?: TQueryConfig<typeof getNotaByIdQueryOptions>;
}

export const useNotaById = ({ id, queryConfig }: NotaByIdOptions) => {
  return useQuery({
    ...getNotaByIdQueryOptions(id),
    ...queryConfig,
  });
};

