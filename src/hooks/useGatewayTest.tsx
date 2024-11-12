import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { constants } from '@/constants';
import { Log } from '@/utils/log';
import { sleep } from '@/utils/sleep';

type UseGatewayTestProps = {
  hostname: string;
  hash: string;
  singleAttempt?: boolean;
};

const timeout = constants.IPFS_PROPAGATION_TOOL.GATEWAY_TEST_TIMEOUT;
const warmupTimeout = 1000;

export const useGatewayTest = ({
  hostname,
  hash,
  singleAttempt = false,
}: UseGatewayTestProps) => {
  const queryFn = useCallback(async () => {
    const responseTimes: number[] = [];

    // Warm-up request with timeout
    try {
      Log.info(`Warm-up request for ${hostname}`);
      await Promise.race([
        fetch(`https://${hostname}/ipfs/${hash}`),
        new Promise((_, reject) =>
          setTimeout(() => reject('Timeout'), warmupTimeout),
        ),
      ]);
    } catch (error) {
      Log.error(`Warm-up request failed for ${hostname}:`, error);

      return {
        status: 'error',
        responseTime: 0,
        responseTimes: [],
      };
    }

    const attempts = singleAttempt ? 1 : 5;

    for (let i = 0; i < attempts; i++) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const startingTime = Date.now();

        const result = (await Promise.race([
          fetch(`https://${hostname}/ipfs/${hash}`),
          new Promise((_, reject) =>
            setTimeout(() => reject('Timeout'), timeout),
          ),
        ])) as Response;

        if (!result.ok) {
          throw 'Invalid result';
        }

        const responseTime = Date.now() - startingTime;
        responseTimes.push(responseTime);

        await sleep(500);
      } catch (error) {
        Log.error(`Error on attempt ${i + 1} for ${hostname}:`, error);
        responseTimes.push(0);
      }
    }

    const filteredResponseTimes = singleAttempt
      ? responseTimes
      : responseTimes.slice(2);
    const averageResponseTime =
      filteredResponseTimes.length > 0
        ? filteredResponseTimes.reduce((a, b) => a + b, 0) /
          filteredResponseTimes.length
        : 0;

    return {
      status: averageResponseTime ? 'active' : 'error',
      responseTime: averageResponseTime,
      responseTimes: filteredResponseTimes,
    };
  }, [hostname, hash, singleAttempt]) satisfies () => Promise<GatewayResponse>;

  return useQuery<GatewayResponse>({
    queryKey: ['useGatewayTest', hostname, hash, singleAttempt],
    queryFn,
    onSuccess: (data) => {
      Log.info(`Final response time for ${hostname}: ${data.responseTime} ms`);
    },
  });
};

export type GatewayResponse = {
  status: 'active' | 'error' | 'cancelled';
  responseTime: number;
  responseTimes: number[];
};
