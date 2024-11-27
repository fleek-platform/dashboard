import posthogJs from 'posthog-js';
import React, { useEffect } from 'react';

import { useMeQuery } from '@/generated/graphqlClient';
import { usePostHog } from '@/hooks/usePostHog';
import { secrets } from '@/secrets';
import { ChildrenProps } from '@/types/Props';
import { isServerSide } from '@/utils/isServerSide';
import { Log } from '@/utils/log';

import { CustomPostHogProvider } from './CustomPostHogProvider';

if (!isServerSide()) {
  posthogJs.init(secrets.NEXT_PUBLIC_UI__POSTHOG_KEY!, {
    api_host:
      secrets.NEXT_PUBLIC_UI__POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_performance: true,
    capture_pageview: true,
    capture_pageleave: true,
    capture_heatmaps: true,
    loaded: () => {
      Log.info('PostHog initialized');
    },
  });
}

export const PHProvider: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <CustomPostHogProvider client={posthogJs}>
      <Identifier />
      {children}
    </CustomPostHogProvider>
  );
};

const Identifier: React.FC = () => {
  const [meQuery] = useMeQuery();
  const posthog = usePostHog();

  // If user is logged in, identify them
  useEffect(() => {
    const user = meQuery.data?.user;

    if (user && posthog) {
      !isServerSide() &&
        posthog.identify(user.id, {
          key: user.id,
          avatar: user.avatar,
          email: user.email,
          walletAddress: user.walletAddress ?? undefined,
          username: user.username ?? undefined,
        });
      Log.info('Posthog: Identified user', user.id);
    }
  }, [meQuery.data, posthog]);

  return null;
};
