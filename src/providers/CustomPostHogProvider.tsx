import type { PostHog } from 'posthog-js';
import posthogJs, { PostHogConfig } from 'posthog-js';
import React, { useMemo } from 'react';

import { createContext } from '@/utils/createContext';
import { Log } from '@/utils/log';

export type PostHogContextType = { client: PostHog };

const [Provider, useContext] = createContext<PostHogContextType>({
  name: 'CustomPostHogContext',
  hookName: 'useCustomPostHogContext',
  providerName: 'CustomPostHogProvider',
});

export const CustomPostHogProvider = ({
  children,
  client,
  apiKey,
  options,
}: {
  children?: React.ReactNode;
  client?: PostHog | undefined;
  apiKey?: string | undefined;
  options?: Partial<PostHogConfig> | undefined;
}) => {
  const posthog = useMemo(() => {
    if (client && apiKey) {
      Log.warn(
        '[PostHog.js] You have provided both a client and an apiKey to PostHogProvider. The apiKey will be ignored in favour of the client.',
      );
    }

    if (client && options) {
      Log.warn(
        '[PostHog.js] You have provided both a client and options to PostHogProvider. The options will be ignored in favour of the client.',
      );
    }

    if (client) {
      return client;
    }

    if (apiKey) {
      if (posthogJs.__loaded) {
        Log.warn(
          '[PostHog.js] was already loaded elsewhere. This may cause issues.',
        );
      }

      posthogJs.init(apiKey, options);
    }

    return posthogJs;
  }, [client, apiKey]);

  return <Provider value={{ client: posthog }}>{children}</Provider>;
};

export const useCustomPostHogContext = useContext;
