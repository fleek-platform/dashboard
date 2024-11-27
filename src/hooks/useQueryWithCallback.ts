import { useEffect, useState } from 'react';
import { AnyVariables, UseQueryArgs, UseQueryResponse } from 'urql';

import { Log } from '@/utils/log';

type QueryArgs<Variables extends AnyVariables, Data> = Omit<UseQueryArgs<Variables, Data>, 'query'>;

type UseQuery<Data = any, Variables extends AnyVariables = AnyVariables> = (
  args: QueryArgs<Variables, Data>
) => UseQueryResponse<Data, Variables>;

export type UseQueryWithCallbackArgs<InnerVariables extends AnyVariables, InnerData, Data> = {
  args: QueryArgs<InnerVariables, InnerData>;
  useQuery: UseQuery<InnerData, InnerVariables>;
  callback: (data: InnerData) => Promise<Data>;
};

export const useQueryWithCallback = <InnerVariables extends AnyVariables, InnerData, Data>({
  args,
  useQuery: useInnerQuery,
  callback,
}: UseQueryWithCallbackArgs<InnerVariables, InnerData, Data>) => {
  const [innerQuery, refetchInnerQuery] = useInnerQuery(args);

  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<Data>();

  useEffect(() => {
    if (innerQuery.fetching) {
      setFetching(innerQuery.fetching);
    }

    setError(innerQuery.error);
  }, [innerQuery.fetching, innerQuery.error]);

  useEffect(() => {
    if (!innerQuery.data) {
      return;
    }

    const asyncCall = async () => {
      try {
        setFetching(true);

        const data = await callback(innerQuery.data!);
        setData(data);
      } catch (error) {
        Log.error('Failed to execute combined query', error);
        setError(error);
      } finally {
        setFetching(false);
      }
    };

    asyncCall();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerQuery]);

  return [{ fetching, error, data }, refetchInnerQuery] as const;
};
