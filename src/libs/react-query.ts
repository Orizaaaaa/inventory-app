import type { DefaultOptions, UseMutationOptions } from "@tanstack/react-query";

export const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
  },
};

export type TApiFnReturn<T extends (...args: any) => Promise<any>> = Awaited<ReturnType<T>>;
export type TQueryConfig<T extends (...args: any[]) => any> = Omit<ReturnType<T>, 'queryKey' | 'queryFn'>;

export type MutationConfig<TMutationFn extends (...args: any) => Promise<any>> = UseMutationOptions<
  TApiFnReturn<TMutationFn>,
  Error,
  Parameters<TMutationFn>[0]
>;