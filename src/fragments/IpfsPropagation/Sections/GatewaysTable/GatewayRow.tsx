import { useEffect, useMemo, useState } from 'react';

import { BadgeText, CustomTooltip, ExternalLink } from '@/components';
import { useGatewayTest } from '@/hooks/useGatewayTest';
import { useHostnameLookup } from '@/hooks/useHostnameLookup';
import { useToast } from '@/hooks/useToast';
import type { ChildrenProps, LoadingProps } from '@/types/Props';
import { Box, Button, Icon, Image, Skeleton, Text } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';
import { getLinkForIPFSCountryFlag } from '@/utils/getLinkForIPFSCountryFlag';
import { getLinkForIPFSGateway } from '@/utils/getLinkForIPFSGateway';

import { useIpfsPropagationContext } from '../../Context';

export type GatewayRowProps = {
  hostname: string;
};

export const GatewayRow: React.FC<GatewayRowProps> = ({ hostname }) => {
  const { setPublicGateway, testingHash, shouldRefresh, hasCancelled } =
    useIpfsPropagationContext();
  const gatewayTest = useGatewayTest({
    hostname,
    hash: testingHash,
    singleAttempt: false,
  });
  const domainCountry = useHostnameLookup({ hostname });
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (hostname && gatewayTest.data && !gatewayTest.isFetching) {
      setPublicGateway(hostname, gatewayTest.data.responseTime);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostname, gatewayTest.data, gatewayTest.isFetching]);

  useEffect(() => {
    if (shouldRefresh) {
      setIsCancelled(false);
      gatewayTest.refetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRefresh]);

  // Handle cancellation only if the status is pending
  useEffect(() => {
    if (gatewayTest.isFetching && hasCancelled) {
      setIsCancelled(true);
    }
  }, [gatewayTest.isFetching, hasCancelled]);

  const responseTimesString = useMemo(() => {
    return gatewayTest.data?.responseTimes
      ? `Average of ${gatewayTest.data.responseTimes.map((time) => `${time.toFixed(0)}ms`).join(', ')}`
      : '';
  }, [gatewayTest.data?.responseTimes]);

  return (
    <tr>
      <TableData>
        <StatusBadge
          isCancelled={isCancelled}
          isFetching={gatewayTest.isFetching}
          status={gatewayTest.data?.status}
        />
      </TableData>

      <CellWithSkeleton isLoading={gatewayTest.isFetching && !isCancelled}>
        {isCancelled ? (
          <Text variant="tertiary">-</Text>
        ) : (
          <CustomTooltip content={responseTimesString} side="top">
            <Box className={'flex flex-row'}>
              {(gatewayTest.data?.responseTime && (
                <Box className="flex flex-row items-start group-hover:underline">
                  <Text
                    variant="primary"
                    weight={500}
                    className="group-hover:underline"
                  >
                    {gatewayTest.data.responseTime.toFixed(0)}
                  </Text>
                  <Text variant="tertiary" className="group-hover:underline">
                    ms
                  </Text>
                </Box>
              )) || <Text variant="tertiary">-</Text>}
            </Box>
          </CustomTooltip>
        )}
      </CellWithSkeleton>

      <CellWithSkeleton isLoading={domainCountry.isLoading}>
        <Box className={'flex flex-row'}>
          {domainCountry.data ? (
            <BadgeText colorScheme="slate">
              <Image
                src={getLinkForIPFSCountryFlag({
                  country: domainCountry.data.country,
                })}
                className="w-[0.75rem] h-[0.75rem] rounded-full"
              />
              {domainCountry.data.country.toUpperCase()}
            </BadgeText>
          ) : (
            <Text variant="tertiary" className="text-center">
              -
            </Text>
          )}
        </Box>
      </CellWithSkeleton>

      <CellWithSkeleton>
        <ExternalLink
          href={getLinkForIPFSGateway({ baseURL: hostname, cid: testingHash })}
          className="group"
        >
          <Box className="flex flex-row items-start group-hover:underline">
            <Text
              variant="primary"
              weight={500}
              className="group-hover:underline"
            >
              {hostname}/ipfs/
            </Text>
            <Text
              variant="tertiary"
              className="group-hover:underline"
            >{`${testingHash.slice(0, 10)}...`}</Text>
          </Box>
        </ExternalLink>
      </CellWithSkeleton>

      <TableData>
        <Actions hostname={hostname} status={gatewayTest.data?.status} />
      </TableData>
    </tr>
  );
};

type CellWithSkeletonProps = LoadingProps<ChildrenProps>;

const CellWithSkeleton: React.FC<CellWithSkeletonProps> = ({
  children,
  isLoading,
}) => {
  return (
    <TableData>{isLoading ? <Skeleton variant="text" /> : children}</TableData>
  );
};

type ActionsProps = Pick<GatewayRowProps, 'hostname'> & {
  status?: string;
};

const Actions: React.FC<ActionsProps> = ({ hostname, status }) => {
  const { testingHash } = useIpfsPropagationContext();
  const toast = useToast();

  const handleCopy = () => {
    const url = getLinkForIPFSGateway({ baseURL: hostname, cid: testingHash });

    try {
      copyToClipboard(url);
      toast.success({ message: 'Link copied to clipboard' });
    } catch {
      toast.error({ message: 'Failed to copy link  to clipboard' });
    }
  };

  return (
    <Box className="flex flex-row items-center gap-2 justify-end">
      <CustomTooltip content="Copy link" side="bottom">
        <Button
          disabled={status !== 'active'}
          size="sm"
          intent="neutral"
          onClick={handleCopy}
        >
          <Icon name="copy" />
        </Button>
      </CustomTooltip>
      <ExternalLink
        href={getLinkForIPFSGateway({ baseURL: hostname, cid: testingHash })}
      >
        <Button disabled={status !== 'active'} size="sm" intent="accent">
          Visit
          <Icon name="arrow-up-right" />
        </Button>
      </ExternalLink>
    </Box>
  );
};

const TableData = ({ children }: { children: any }) => {
  return (
    <td className="text-left p-4 text-neutral-1 text-sm overflow-hidden whitespace-nowrap border-t-neutral-6 border-t">
      {children}
    </td>
  );
};

const StatusBadge: React.FC<{
  isCancelled: boolean;
  isFetching: boolean;
  status?: string;
}> = ({ isCancelled, isFetching, status }) => {
  if (isCancelled) {
    return (
      <BadgeText colorScheme="red">
        <Icon name="close" />
        Cancelled
      </BadgeText>
    );
  }

  if (isFetching) {
    return (
      <BadgeText colorScheme="slate">
        <Icon name="spinner" />
        Pending
      </BadgeText>
    );
  }

  if (status === 'error') {
    return (
      <CustomTooltip
        content="Unable to retrieve content from this gateway"
        side="bottom"
      >
        <BadgeText colorScheme="red">
          <Icon name="close" />
          Error
        </BadgeText>
      </CustomTooltip>
    );
  }

  if (status === 'active') {
    return (
      <BadgeText colorScheme="green">
        <Icon name="check" />
        Active
      </BadgeText>
    );
  }

  return null;
};
