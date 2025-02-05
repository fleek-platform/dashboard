import React, { useEffect, useMemo, useRef } from 'react';

import { useToast } from '@/hooks/useToast';
import { type AgentLog } from '@/types/Agent';
import { Accordion, Box, Button, Icon, Skeleton, Text } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';
import { dateFormat } from '@/utils/dateFormats';

import { useAgentLogs } from './useAgentLogs';

type AgentLogsProps = {
  agentId: string;
  isLoading: boolean;
  toggleVisibility: () => void;
};

export const AgentLogs: React.FC<AgentLogsProps> = ({
  agentId,
  isLoading,
  toggleVisibility,
}) => {
  const toast = useToast();
  const {
    data,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useAgentLogs({ agentId });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const logs = useMemo(() => {
    if (!data?.pages) {
      return [];
    }

    return data.pages.reduce(
      (acc, page) => [...page.data, ...acc],
      [] as AgentLog[],
    );
  }, [data]);

  const handleCopyLogs = () => {
    try {
      const logsString = logs
        .map((log) => `${log.timestamp} - ${log.message}`)
        .join('\n');
      copyToClipboard(logsString);
      toast.success({ message: 'Logs copied to clipboard' });
    } catch (error) {
      toast.error({ message: 'Failed to copy logs to clipboard' });
    }
  };

  const handleRefresh = async () => {
    await refetch();
    scrollToBottom();
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleScroll = () => {
      if (
        container &&
        container.scrollTop < 250 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage().then(() => {
          if (container.scrollTop === 0) {
            const prevHeight = container.scrollHeight;

            requestAnimationFrame(() => {
              const newHeight = container.scrollHeight;
              container.scrollTop = newHeight - prevHeight;
            });
          }
        });
      }
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);

      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, logs]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (data?.pages?.length === 1 && logs.length > 0) {
      scrollToBottom();
    }
  }, [logs, data?.pages]);

  if (isError) {
    return <Text>Error loading logs</Text>;
  }

  return (
    <Accordion.Root
      type="multiple"
      defaultValue={['logs']}
      onValueChange={toggleVisibility}
    >
      <Accordion.Item value="logs">
        <Accordion.Header className="bg-surface-content">
          <Text variant="primary" size="sm" weight={700}>
            Agent Logs
          </Text>
          <Box
            className="ml-auto flex-row gap-2 px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              intent="neutral"
              size="xs"
              onClick={handleCopyLogs}
              disabled={isLoading || logs.length === 0}
            >
              Copy to clipboard
            </Button>
            <Button size="xs" onClick={handleRefresh} disabled={isRefetching}>
              Refresh Logs
            </Button>
          </Box>
        </Accordion.Header>
        <Accordion.Content
          ref={scrollContainerRef}
          className="max-h-[30rem] min-h-[30rem] overflow-y-auto p-2 bg-monochrome-normal"
        >
          {isLoading || (isFetching && logs.length === 0) ? (
            <Box>
              {Array.from({ length: 13 }).map((_, i) => (
                <LogRowSkeleton key={i} />
              ))}
            </Box>
          ) : (
            <Box>
              {isFetchingNextPage && (
                <Box className="flex justify-center p-2">
                  <Icon name="spinner" />
                </Box>
              )}
              {logs.map((log) => (
                <LogRow key={log.id} log={log} />
              ))}
            </Box>
          )}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

type LogRowProps = {
  log: AgentLog;
};

const LogRow: React.FC<LogRowProps> = ({ log }) => {
  return (
    <Box className="flex-row py-2.5 px-4 gap-4 bg-monochrome-light rounded-md">
      <Text variant="secondary">
        {dateFormat({ dateTimestamp: log.timestamp, stringFormat: 'HH:mm:ss' })}
      </Text>
      <Text>{log.message}</Text>
    </Box>
  );
};

const LogRowSkeleton: React.FC = () => (
  <Box className="flex-row py-2.5 px-4 bg-monochrome-normal gap-6">
    <Skeleton className="h-5 w-[15%]" />
    <Skeleton className="h-5 w-[90%]" />
  </Box>
);
