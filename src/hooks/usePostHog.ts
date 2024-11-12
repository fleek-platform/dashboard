import type { PostHog } from 'posthog-js';

import { useCustomPostHogContext } from '@/providers/CustomPostHogProvider';

export const usePostHog = (): PostHog => {
  const { client } = useCustomPostHogContext();

  return client;
};
