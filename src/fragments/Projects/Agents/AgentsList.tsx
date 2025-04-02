import { SettingsBox, SettingsListItem } from '@/components';
import { constants } from '@/constants';
import { useRouter } from '@/hooks/useRouter';
import { useTheme } from '@/providers/ThemeProvider';
import { secrets } from '@/secrets';
import { Box, Button, Image, Text } from '@/ui';
import { isServerSide } from '@/utils/isServerSide';

import { AgentItem } from './AgentItem';
import { useListAgents } from './useListAgents';

import { joinBase } from '@/utils/paths';
import { getAgentsUrl } from '@/utils/url';


const agentsUrl = getAgentsUrl();

export const AgentsList = () => {
  const { resolvedTheme = 'dark' } = useTheme();
  const router = useRouter();

  const { data: agentsList, isLoading } = useListAgents({ pause: false });

  const createAgentHandler = () => {
    if (isServerSide()) {
      router.push(agentsUrl);

      return;
    }

    window.open(agentsUrl, '_blank');
  };

  if (isLoading || !agentsList) {
    return (
      <>
        {Array.from({ length: constants.AI_AGENTS_PAGE_SIZE }).map((_, i) => (
          <SettingsBox.Container className="p-0 gap-0" key={i}>
            <SettingsListItem.FlatRow>
              <SettingsListItem.DataSkeleton />
              <SettingsListItem.DataSkeleton />
              <Box />
            </SettingsListItem.FlatRow>
          </SettingsBox.Container>
        ))}
      </>
    );
  }

  if (agentsList.data?.length > 0) {
    return (
      <SettingsBox.Container className="p-0 gap-0">
        {agentsList.data.map((agent) => (
          <AgentItem key={agent.id} agent={agent} />
        ))}
      </SettingsBox.Container>
    );
  }

  return (
    <Box className="m-auto items-center justify-center gap-3 top-1/2 relative -translate-y-1/4">
      <Image
        src={joinBase(
          `/assets/static/${resolvedTheme}/empty-state/agents.svg?url`,
        )}
        alt="empty list illustration"
        className="w-1/2"
      />
      <Text
        variant="secondary"
        size="lg"
        weight={700}
        className="text-neutral-12"
      >
        No agents yet
      </Text>
      <Text variant="primary" size="sm" className="text-neutral-11">
        Click to create your first AI agent on Fleek
      </Text>
      <Button onClick={createAgentHandler}>Create AI agent</Button>
    </Box>
  );
};
