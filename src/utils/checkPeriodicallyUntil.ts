export type CheckPeriodicallyUntilArgs<T> = {
  conditionFn: () => Promise<T | undefined>;
  period: number;
  tries: number;
  abortSignal?: AbortSignal;
};

class CheckPeriodicallyUntilError extends Error {
  constructor() {
    super('timeout');
  }
}

export const checkPeriodicallyUntil = async <T>({
  conditionFn,
  period,
  tries,
  abortSignal,
}: CheckPeriodicallyUntilArgs<T>): Promise<T | null> => {
  if (tries < 1) {
    throw new CheckPeriodicallyUntilError();
  }

  if (abortSignal && abortSignal.aborted) {
    return null; // or throw new Error("Aborted");
  }

  const result = await conditionFn();

  if (result !== undefined) {
    return result;
  }

  return new Promise<T | null>((resolve, reject) => {
    const timeoutId = setTimeout(async () => {
      // If it's aborted, we stop the recursion and resolve with null
      if (abortSignal && abortSignal.aborted) {
        resolve(null);

        return;
      }

      // If we're still good to go, then we retry the operation
      try {
        const nextResult = await checkPeriodicallyUntil({ conditionFn, period, tries: tries - 1, abortSignal });

        resolve(nextResult);
      } catch (error) {
        reject(error);
      }
    }, period);

    // If it's aborted during the wait, we clear the timeout and resolve with null
    if (abortSignal) {
      abortSignal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        resolve(null);
      });
    }
  });
};
