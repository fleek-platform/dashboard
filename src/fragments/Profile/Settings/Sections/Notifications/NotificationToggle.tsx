import React, { type MouseEventHandler, useCallback } from 'react';

import {
  type NotificationType,
  NotificationChannel,
  useUpdateNotificationSettingsMutation,
} from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { Checkbox, Text } from '@/ui';
import { cn } from '@/utils/cn';

import { useNotificationsContext } from './NotificationsContext';

type NotificationToggleProps = {
  type: NotificationType;
  label?: string;
  disabled?: boolean;
};

export const NotificationToggle = ({
  type,
  label,
  disabled,
}: NotificationToggleProps) => {
  const [enabled, toggle] = useNotificationsContext(type);
  const [, updateNotificationSettings] =
    useUpdateNotificationSettingsMutation();
  const toast = useToast();

  const clickHandler = useCallback<
    (c: NotificationChannel) => MouseEventHandler
  >(
    (channel) => async () => {
      toggle(channel);

      try {
        const { data, error: combinedError } = await updateNotificationSettings(
          {
            data: {
              isEnabled: !enabled[channel],
              notificationChannel: channel,
              notificationType: type,
            },
          },
        );

        if (data) {
          toast.success({ message: 'Notification preferences saved!' });
        } else {
          throw combinedError;
        }
      } catch (error) {
        toggle(channel);
        toast.error({
          message:
            (error as Error)?.message ??
            'Error saving notification preferences!',
        });
      }
    },
    [type, toggle, enabled, updateNotificationSettings, toast],
  );

  if (typeof enabled === 'undefined') {
    return null;
  }

  const { EMAIL } = NotificationChannel;

  return (
    <label
      htmlFor={label}
      className={cn(
        'flex-1 flex gap-2 justify-between items-center cursor-pointer',
        { 'cursor-not-allowed': disabled },
      )}
    >
      <Text variant="primary" weight={500}>
        {label || type}
      </Text>
      {typeof enabled[EMAIL] !== 'undefined' && (
        <Checkbox
          checked={enabled[EMAIL]}
          onClick={clickHandler(EMAIL)}
          disabled={disabled}
          id={label}
        />
      )}
    </label>
  );
};
