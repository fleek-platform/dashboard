import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import { IconTooltip } from '@/components';
import { Box, Button, Icon, IconName, Text } from '@/ui';
import { cn } from '@/utils/cn';

import { useIpfsPropagationContext } from '../../Context';
import { ExampleHashes } from './ExampleHashes';
import { GatewayRow } from './GatewayRow';
export const GatewaysTable: React.FC = () => {
  const { publicGateways, setShouldRefresh, shouldRefresh, gatewayCounters, testingHash, cancelPendingTests } = useIpfsPropagationContext();
  const [lastRefresh, setLastRefresh] = useState<DateTime>();

  useEffect(() => {
    if (!shouldRefresh) {
      setLastRefresh(DateTime.now());
    }
  }, [shouldRefresh]);

  const handleRefresh = () => {
    setShouldRefresh(true);
  };

  return (
    <Box className="overflow-auto rounded-lg bg-neutral-1 border border-neutral-6">
      {testingHash ? (
        <table className="w-full border-collapse relative border-spacing-0">
          <colgroup>
            <col span={1} style={{ width: '12%' }} />
            <col span={1} style={{ width: '14%' }} />
            <col span={1} style={{ width: '10%' }} />
            <col span={1} style={{ width: '44%' }} />
            <col span={1} style={{ width: '18%' }} />
          </colgroup>

          <THeader>
            <tr className="bg-neutral-1 h-[4.75rem]">
              <th colSpan={6}>
                <Box className="xs:flex-row xs:items-stretch sticky right-0 flex-wrap p-4 justify-between gap-3 flex-row ">
                  <Box className="flex-row text-sm gap-3 items-center">
                    <CounterBadge type="active" value={gatewayCounters.active} label="active" icon="check" />
                    {!!gatewayCounters.pending && (
                      <CounterBadge type="pending" value={gatewayCounters.pending} label="pending" icon="spinner" />
                    )}
                  </Box>

                  <Box className="flex-row text-sm gap-3 items-center">
                    {lastRefresh && !shouldRefresh && <LastCheckedMessage time={lastRefresh} />}
                    <Button
                      onClick={shouldRefresh ? cancelPendingTests : handleRefresh}
                      size="md"
                      intent={shouldRefresh ? 'danger' : 'neutral'}
                    >
                      {!shouldRefresh && <Icon name="refresh" />}

                      {shouldRefresh ? 'Cancel' : 'Retest'}
                    </Button>
                  </Box>
                </Box>
              </th>
            </tr>
          </THeader>

          <THeader>
            <tr>
              <THeadInner>
                <Text>Status</Text>
              </THeadInner>
              <THeadInner>
                <Box className="flex flex-row items-center gap-1">
                  <Text>Response time</Text>
                  <IconTooltip side="bottom">
                    Response Time: Estimated time to fetch and return a file from the IPFS gateway. This is the average of 3 results.
                  </IconTooltip>
                </Box>
              </THeadInner>
              <THeadInner>
                <Text>Country</Text>
              </THeadInner>
              <THeadInner>
                <Text>Public gateway</Text>
              </THeadInner>
              <THeadInner />
            </tr>
          </THeader>

          <tbody>
            {publicGateways.map((domain) => (
              <GatewayRow hostname={domain} key={domain} />
            ))}
          </tbody>
        </table>
      ) : (
        <ExampleHashes />
      )}
    </Box>
  );
};

type TableControlHeaderProps = {
  time: DateTime;
};

const LastCheckedMessage: React.FC<TableControlHeaderProps> = ({ time }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setTimeout(
      () => {
        setCounter(counter + 1);
      },
      counter > 60 ? 60000 : 1000
    );

    return () => clearTimeout(interval);
  }, [counter, time]);

  const timeString = time?.toRelative({ style: 'narrow' })?.replace(' sec.', 's')?.replace(' min.', 'm');

  return <Text variant="secondary">Last checked {timeString}</Text>;
};

type CounterBadge = {
  type: 'total' | 'active' | 'pending';
  value: number;
  label: string;
  icon: IconName;
};

const CounterBadge: React.FC<CounterBadge> = ({ type, value, label, icon }) => {
  return (
    <Box
      className={cn('flex flex-row items-center text-sm text-tertiary p-3 py-2 rounded-lg gap-2', {
        'text-neutral-10': type === 'pending',
        'text-success-10': type === 'active',
      })}
    >
      <Icon name={icon} />
      <Text
        className={cn({
          'text-neutral-10': type === 'pending',
          'text-success-10': type === 'active',
        })}
      >
        {' '}
        {`${value} ${label}`}
      </Text>
    </Box>
  );
};

const THeader = ({ children }: { children: any }) => (
  <thead className="sticky top-0 bg-neutral-4 z-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:border-b after:border-neutral-4">
    {children}
  </thead>
);

const THeadInner = ({ children }: { children?: any }) => <th className="text-left p-4 overflow-hidden items-center ">{children}</th>;
