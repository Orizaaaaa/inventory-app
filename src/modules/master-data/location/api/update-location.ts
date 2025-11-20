import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";
import type { LocationCreate } from "../types/types";

const UpdateLocation = ({ id, data }: { id: string; data: LocationCreate }) => {
  return api.put(`/lokasi-simpan/${id}`, data);
};

type UseUpdateLocationOptions = {
  mutationConfig?: MutationConfig<typeof UpdateLocation>;
};

const useUpdateLocation = ({ mutationConfig }: UseUpdateLocationOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["location"] });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: UpdateLocation,
  });
};

export { UpdateLocation, useUpdateLocation };

