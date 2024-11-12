import React, { useContext, useMemo } from 'react';

import type { NotificationChannel, NotificationType } from '@/generated/graphqlClient';

type ChannelMap = Record<NotificationChannel, boolean>;
export type NotificationsState = Partial<Record<NotificationType, ChannelMap>>;

export const NotificationsContext = React.createContext<{
  state: NotificationsState;
  setState: (state: NotificationsState) => void;
} | null>(null);

type UseNotificationsContextArgs = [NotificationType];

export const useNotificationsContext = (...args: UseNotificationsContextArgs) => {
  const [type] = args;
  const { state, setState } = useContext(NotificationsContext)!;

  return useMemo<[ChannelMap, (channel: NotificationChannel) => void]>(() => {
    const channelMap = state[type]!;

    return [
      channelMap,
      function toggle(channel) {
        return setState({ ...state, [type]: { ...channelMap, [channel]: !channelMap[channel] } });
      },
    ];
  }, [type, state, setState]);
};
