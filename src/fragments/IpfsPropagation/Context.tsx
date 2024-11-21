import { useEffect, useMemo, useState } from 'react';

import { useRouter } from '@/hooks/useRouter';
import type { ChildrenProps } from '@/types/Props';
import { createContext } from '@/utils/createContext';

export type IpfsPropagationContext = {
  testingHash: string;
  setTestingHash: (cid: string) => void;

  publicGateways: string[];
  setPublicGateway: (hostname: string, responseTime: number) => void;

  shouldRefresh: boolean;
  setShouldRefresh: (shouldRefresh: boolean) => void;

  gatewayCounters: { pending: number; active: number; total: number };
  cancelPendingTests: () => void;

  hasCancelled: boolean;
};

const [InternalProvider, useContext] = createContext<IpfsPropagationContext>({
  providerName: 'IpfsPropagationProvider',
  hookName: 'useIpfsPropagationContext',
  name: 'IpfsPropagationContext',
});

export const useIpfsPropagationContext = useContext;

export type IpfsPropagationProviderProps = ChildrenProps<{
  publicGateways: string[];
  initialTestingHash?: string;
}>;

export const IpfsPropagationProvider: React.FC<
  IpfsPropagationProviderProps
> = ({
  children,
  publicGateways: initialPublicGateways,
  initialTestingHash = '',
}) => {
  const [shouldRefresh, _setShouldRefresh] = useState(true);
  const [hasCancelled, setHasCancelled] = useState(false);
  const router = useRouter();

  const testingHash = router.query.hash || initialTestingHash;

  const setTestingHash = (hash: string) => {
    router.push(
      {
        query: { ...router.query, hash },
      },
      undefined,
      { shallow: true },
    );
  };

  const [publicGatewaysRecords, setPublicGatewaysRecords] =
    useState<GatewayListRecord>(() => {
      return reduceToInitialState(initialPublicGateways);
    });

  const publicGateways = useSortedGatewayList(publicGatewaysRecords);
  const gatewayCounters = useGatewayCounters(publicGatewaysRecords);

  useEffect(() => {
    if (gatewayCounters.pending === 0) {
      _setShouldRefresh(false);
    }
  }, [gatewayCounters.pending]);

  const setShouldRefresh = (shouldRefresh: boolean) => {
    if (shouldRefresh) {
      setPublicGatewaysRecords((prev) =>
        reduceToInitialState(Object.keys(prev)),
      );
      setHasCancelled(false); // Reset cancellation state
    }

    _setShouldRefresh(shouldRefresh);
  };

  const setPublicGateway = (hostname: string, responseTime: number) => {
    setPublicGatewaysRecords((prev) => {
      return {
        ...prev,
        [hostname]: responseTime,
      };
    });
  };

  const cancelPendingTests = () => {
    setPublicGatewaysRecords((prev) => {
      const updatedRecords = { ...prev };
      Object.keys(updatedRecords).forEach((hostname) => {
        if (updatedRecords[hostname] === GATEWAY_STATE.PENDING) {
          updatedRecords[hostname] = GATEWAY_STATE.CANCELLED;
        }
      });

      return updatedRecords;
    });
    setHasCancelled(true);
    setShouldRefresh(false);
  };

  return (
    <InternalProvider
      value={{
        testingHash,
        setTestingHash,

        publicGateways,
        setPublicGateway,

        shouldRefresh,
        setShouldRefresh,
        gatewayCounters,
        cancelPendingTests,

        hasCancelled,
      }}
    >
      {children}
    </InternalProvider>
  );
};

type GatewayListRecord = Record<string, number>;

// eslint-disable-next-line fleek-custom/valid-argument-types
const useSortedGatewayList = (records: GatewayListRecord) =>
  useMemo(() => {
    const compareGateways = (a: string, b: string) => {
      const isAActive = records[a] > 0;
      const isBActive = records[b] > 0;

      // Gateway 'a' is active and 'b' is not, so 'a' should come first
      if (isAActive && !isBActive) {
        return -1;
      }

      // Gateway 'b' is active and 'a' is not, so 'b' should come first
      if (!isAActive && isBActive) {
        return 1;
      }

      // Sort by response time.
      return records[a] - records[b];
    };

    return Object.keys(records).sort(compareGateways);
  }, [records]);

// eslint-disable-next-line fleek-custom/valid-argument-types
const useGatewayCounters = (records: GatewayListRecord) => {
  const counters = useMemo(() => {
    const counters: IpfsPropagationContext['gatewayCounters'] = {
      pending: 0,
      active: 0,
      total: Object.keys(records).length,
    };

    Object.keys(records).forEach((hostname) => {
      if (records[hostname] === GATEWAY_STATE.PENDING) {
        counters.pending += 1;
      } else if (records[hostname] > GATEWAY_STATE.ERROR) {
        counters.active += 1;
      }
    });

    return counters;
  }, [records]);

  return counters;
};

const reduceToInitialState = (hostnameList: string[]) => {
  return hostnameList.reduce((acc, hostname) => {
    acc[hostname] = GATEWAY_STATE.PENDING;

    return acc;
  }, {} as GatewayListRecord);
};

const GATEWAY_STATE = {
  PENDING: Number.POSITIVE_INFINITY,
  ERROR: 0,
  CANCELLED: -1,
} as const;
