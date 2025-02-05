import { useState } from 'react';

import { SettingsListItem } from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/useToast';
import { Agent } from '@/types/Agent';
import { Box } from '@/ui';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';

import { AgentLogs } from './AgentLogs';
import { StatusBadge, StatusUpdateMenuItem } from './AgentStatus';
import { DeleteAgentModal } from './DeleteAgent';
import { useAgentStatus } from './useAgentStatus';
import { useDeleteAgent } from './useDeleteAgent';

type AgentItemProps = {
  agent: Agent;
};

export const AgentItem: React.FC<AgentItemProps> = ({ agent }) => {
  const toast = useToast();
  const { data: statusResponse, isLoading } = useAgentStatus({
    agentId: agent.id,
  });
  const { mutateAsync: deleteAgent, isLoading: isDeleting } = useDeleteAgent({
    agentId: agent.id,
  });

  const hasDeletePermission = usePermissions({
    action: [constants.PERMISSION.AGENTS_AI.DELETE],
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogsExpanded, setIsLogsExpanded] = useState(false);

  const handleDeleteConfirm = async () => {
    try {
      await deleteAgent();
      toast.success({ message: 'AI Agent deleted' });
    } catch (error) {
      toast.error({ error, log: 'Error deleting agent. Please try again' });
    }
  };

  const toggleLogsExpanded = () => {
    setIsLogsExpanded((prev) => !prev);
  };

  return (
    <SettingsListItem.FlatRow>
      <SettingsListItem.Data
        subtitle={`Added ${getDurationUntilNow({ isoDateString: agent.createdAt, shortFormat: true })}`}
        title={agent.name}
      />

      <Box className="flex-row gap-2 justify-end items-center">
        <StatusBadge isLoading={isLoading} status={statusResponse?.status} />
      </Box>

      <SettingsListItem.DropdownMenu
        isDisabled={isLoading}
        hasAccess={hasDeletePermission}
      >
        <StatusUpdateMenuItem
          agentId={agent.id}
          isLoading={isLoading}
          status={statusResponse?.status}
        />
        <SettingsListItem.DropdownMenuItem
          icon={isLogsExpanded ? 'eye-closed' : 'expand'}
          onClick={toggleLogsExpanded}
        >
          {isLogsExpanded ? 'Hide logs' : 'View logs'}
        </SettingsListItem.DropdownMenuItem>
        {hasDeletePermission && (
          <SettingsListItem.DropdownMenuItem
            icon="trash"
            disabled={isDeleting}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete agent
          </SettingsListItem.DropdownMenuItem>
        )}
      </SettingsListItem.DropdownMenu>

      {isLogsExpanded && (
        <Box className="col-start-1 col-end-4">
          <AgentLogs
            agentId={agent.id}
            isLoading={isLoading}
            toggleVisibility={toggleLogsExpanded}
          />
        </Box>
      )}

      <DeleteAgentModal
        agentName={agent.name}
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </SettingsListItem.FlatRow>
  );
};
