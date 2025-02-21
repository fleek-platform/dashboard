import { groupBy, mapValues } from 'lodash';
import React, { useEffect, useState } from 'react';

import { SettingsBox } from '@/components';
import {
  NotificationType,
  useNotificationsQuery,
} from '@/generated/graphqlClient';
import { Box, Text } from '@/ui';

import {
  type NotificationsState,
  NotificationsContext,
} from './NotificationsContext';
import { NotificationToggle } from './NotificationToggle';

export const ManageNotifications: React.FC = () => {
  const [notificationsQuery] = useNotificationsQuery();
  const [state, setState] = useState<NotificationsState>({});

  useEffect(() => {
    const notificationSettings = notificationsQuery.data?.notificationSettings;

    if (notificationSettings) {
      setState(
        mapValues(
          groupBy(notificationSettings, 'notificationType'),
          (settings) =>
            settings.reduce(
              (acc, setting) => ({
                ...acc,
                [setting.notificationChannel]: setting.isEnabled,
              }),
              {},
            ),
        ),
      );
    }
  }, [notificationsQuery.data]);

  if (notificationsQuery.fetching) {
    return (
      <Box variant="container">
        <SettingsBox.Skeleton variant="title" className="w-1/3" />
        <SettingsBox.Skeleton variant="text" className="w-1/2" />
        <Box className="flex-row justify-between border-b border-neutral-6 py-4">
          <SettingsBox.Skeleton variant="title" className="w-1/6" />
          <SettingsBox.Skeleton variant="text" className="w-1/6" />
        </Box>
        <Box className="flex-row justify-between">
          <SettingsBox.Skeleton variant="text" className="w-1/6" />
          <SettingsBox.Skeleton variant="button" className="size-6" />
        </Box>
        <Box className="flex-row justify-between">
          <SettingsBox.Skeleton variant="text" className="w-1/6" />
          <SettingsBox.Skeleton variant="button" className="size-6" />
        </Box>
      </Box>
    );
  }

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Manage Notifications</SettingsBox.Title>
      <SettingsBox.Text>
        Indicate which notification types you would like to receive.
      </SettingsBox.Text>
      <NotificationsContext.Provider value={{ state, setState }}>
        <Box className="gap-6">
          <Box className="gap-2.5">
            <Box className="border-b border-neutral-6 pb-2 flex-row justify-between">
              <Text>Deployments</Text>
              <Text>Email</Text>
            </Box>
            <NotificationToggle
              type={NotificationType.DEPLOYMENT_FAILED}
              label="A deployment has failed"
            />
            <NotificationToggle
              type={NotificationType.DEPLOYMENT_COMPLETED}
              label="A deployment has completed"
            />
          </Box>
          <Box className="gap-2.5">
            <Box className="border-b border-neutral-6 pb-2 flex-row justify-between">
              <Text>Team</Text>
              <Text>Email</Text>
            </Box>
            <NotificationToggle
              type={NotificationType.MEMBER_INVITE}
              label="Member invite"
              disabled
            />
          </Box>
        </Box>
      </NotificationsContext.Provider>
    </SettingsBox.Container>
  );
};
