import { BadgeText, SettingsListItem } from '@/components';
import { useToast } from '@/hooks/useToast';
import { Icon, type IconName, Skeleton } from '@/ui';

import { useUpdateAgentStatus } from './useUpdateAgentStatus';
import type { AgentLifecycleStatus } from '@/types/Agent';
import type { ComponentProps } from 'react';
import { isAgentActive } from '@/utils/agent';

type Status = 'true' | 'false';

type StatusBadgeProps = {
  isLoading: boolean;
  status?: Status;
  lifecycleStatus: AgentLifecycleStatus;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  isLoading,
  status,
  lifecycleStatus,
}) => {
  if (isLoading) {
    return (
      <BadgeText colorScheme="slate">
        <Icon name="spinner" />
      </BadgeText>
    );
  }

  const getBadge = (): ComponentProps<typeof BadgeText> => {
    if (!isAgentActive(lifecycleStatus)) {
      return {
        colorScheme: 'slate',
        children: lifecycleStatus,
      };
    }

    if (status === 'true') {
      return {
        colorScheme: 'green',
        children: 'Active',
      };
    }

    return {
      colorScheme: 'red',
      children: 'Inactive',
    };
  };

  const { children, colorScheme } = getBadge();

  return <BadgeText colorScheme={colorScheme}>{children}</BadgeText>;
};

type StatusUpdateMenuItem = {
  isLoading: boolean;
  agentId: string;
  status?: Status;
};

const STATUS_UPDATE_OPTIONS: Record<
  Status,
  { icon: IconName; text: string; action: 'start' | 'stop' }
> = {
  true: { icon: 'exit', text: 'Stop', action: 'stop' },
  false: { icon: 'refresh', text: 'Start', action: 'start' },
};

export const StatusUpdateMenuItem: React.FC<StatusUpdateMenuItem> = ({
  isLoading,
  agentId,
  status,
}) => {
  const toast = useToast();
  const { mutateAsync: changeStatus, isLoading: isUpdating } =
    useUpdateAgentStatus({ agentId });

  const handleStatusUpdate = async () => {
    try {
      if (isUpdating) {
        throw 'Currently updating the agent status.';
      }

      if (!status) {
        throw "Couldn't determine current status.";
      }

      await changeStatus(STATUS_UPDATE_OPTIONS[status].action);
      toast.success({
        message: `Agent ${status === 'true' ? 'stopped' : 'started'}`,
      });
    } catch (error) {
      toast.error({
        error,
        log: 'Error updating agent status. Please try again',
      });
    }
  };

  if (isLoading || !status) {
    return (
      <SettingsListItem.DropdownMenuItem>
        <Skeleton variant="text" />
      </SettingsListItem.DropdownMenuItem>
    );
  }

  return (
    <SettingsListItem.DropdownMenuItem
      icon={STATUS_UPDATE_OPTIONS[status]?.icon ?? 'question-circle'}
      onClick={handleStatusUpdate}
    >
      {STATUS_UPDATE_OPTIONS[status]?.text ?? <SettingsListItem.DataSkeleton />}
    </SettingsListItem.DropdownMenuItem>
  );
};
