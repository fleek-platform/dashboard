import { useCallback, useState } from 'react';

type PromiseReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;
type AsyncCall = <T extends (...args: any) => any>(
  fn: T,
) => (...args: Parameters<T>) => Promise<PromiseReturnType<T>>;

export const useAsync = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const asyncCall = useCallback<AsyncCall>(
    (fn) =>
      async (...args) => {
        // clean error for retry upload
        setError(null);
        try {
          setLoading(true);
          const result = await fn(...(args as unknown[]));

          return result;
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      },
    [],
  );

  return [
    {
      loading,
      error,
    },
    asyncCall,
  ] as const;
};
