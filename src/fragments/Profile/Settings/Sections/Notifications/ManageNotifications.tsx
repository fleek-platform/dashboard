import { groupBy, mapValues } from 'lodash';
import React, { useEffect, useState } from 'react';

import { SettingsBox } from '@/components';
import { NotificationType, useNotificationsQuery } from '@/generated/graphqlClient';

import { ManageNotificationsStyles as S } from './ManageNotifications.style';
import { type NotificationsState, NotificationsContext } from './NotificationsContext';
import { NotificationToggle } from './NotificationToggle';

export const ManageNotifications: React.FC = () => {
  const [notificationsQuery] = useNotificationsQuery();
  const [state, setState] = useState<NotificationsState>({});

  useEffect(() => {
    const notificationSettings = notificationsQuery.data?.notificationSettings;

    if (notificationSettings) {
      setState(
        mapValues(groupBy(notificationSettings, 'notificationType'), (settings) =>
          settings.reduce(
            (acc, setting) => ({
              ...acc,
              [setting.notificationChannel]: setting.isEnabled,
            }),
            {}
          )
        )
      );
    }
  }, [notificationsQuery.data]);

  if (notificationsQuery.fetching) {
    return <SettingsBox.Skeleton />;
  }

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Manage Notifications</SettingsBox.Title>

      <SettingsBox.Text>Indicate which notification types you would like to receive.</SettingsBox.Text>

      <NotificationsContext.Provider value={{ state, setState }}>
        <SettingsBox.ActionRow>
          <S.List>
            <S.Item variant="header">
              <span>Email</span>
            </S.Item>
            <NotificationToggle type={NotificationType.DEPLOYMENT_FAILED} label="A deployment has failed" />
            <NotificationToggle type={NotificationType.DEPLOYMENT_COMPLETED} label="A deployment has completed" />
            <NotificationToggle type={NotificationType.MEMBER_INVITE} label="Member invite" disabled />
          </S.List>
        </SettingsBox.ActionRow>
      </NotificationsContext.Provider>
    </SettingsBox.Container>
  );
};
