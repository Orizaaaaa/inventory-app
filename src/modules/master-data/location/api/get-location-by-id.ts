import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";
import type { LocationType } from "../types/types";

export interface LocationByIdResponse {
  code: number;
  status: string;
  message: string;
  data: LocationType;
}

export const getLocationById = async (id: string): Promise<LocationByIdResponse> => {
  return await api.get(`/lokasi-simpan/${id}`);
};

export const getLocationByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["location", id],
    queryFn: () => getLocationById(id),
    enabled: !!id,
  });
};

export interface LocationByIdOptions {
  id: string;
  queryConfig?: TQueryConfig<typeof getLocationByIdQueryOptions>;
}

export const useLocationById = ({ id, queryConfig }: LocationByIdOptions) => {
  return useQuery({
    ...getLocationByIdQueryOptions(id),
    ...queryConfig,
  });
};

