import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useCallback, useState } from 'react';

type UsePollingArgs<TQueryFnData, TError, TQueryKey extends QueryKey> = {
  queryKey: TQueryKey;
  queryFn: QueryFunction<TQueryFnData, TQueryKey>;
  stopCondition: (data: TQueryFnData) => boolean;
  onFinishedCallback?: (data: Awaited<TQueryFnData>) => void;
  onStoppedPolling?: (data: Awaited<TQueryFnData>) => void;
  refetchInterval?: number;
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TQueryFnData, TQueryKey>,
    'queryKey' | 'queryFn'
  >;
};

export const REFETCH_INTERVAL_TIMEOUT = 10_000;

export const usePolling = <
  TQueryFnData,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey,
>({
  queryKey,
  queryFn,
  stopCondition,
  onFinishedCallback = () => {},
  onStoppedPolling = () => {},
  refetchInterval = REFETCH_INTERVAL_TIMEOUT,
  options,
}: UsePollingArgs<TQueryFnData, TError, TQueryKey>): [
  UseQueryResult<TQueryFnData, TError>,
  (arg: boolean) => void,
] => {
  const [shouldStop, setShouldStop] = useState(false);
  const [hasPolled, setHasPolled] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const wrappedQueryFn = useCallback(
    async (...args: Parameters<typeof queryFn>) => {
      const data = await queryFn(...args);

      if (stopCondition(data)) {
        if (!shouldStop && hasPolled) {
          onStoppedPolling(data);
        }

        setShouldStop(true);
        onFinishedCallback(data);
      } else {
        if (!hasPolled) {
          setHasPolled(true);
        }

        setShouldStop(false);
      }

      return data;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryFn, stopCondition, enabled],
  );

  return [
    useQuery({
      queryKey,
      queryFn: wrappedQueryFn,
      refetchInterval,
      enabled,
      ...options,
    }),
    setEnabled,
  ];
};
