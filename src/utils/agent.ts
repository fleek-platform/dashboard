import type { AgentLifecycleStatus } from '@/types/Agent';

export const isAgentActive = (
  status?: AgentLifecycleStatus,
): status is 'Running' | 'Created' => {
  return status === 'Running' || status === 'Created';
};
