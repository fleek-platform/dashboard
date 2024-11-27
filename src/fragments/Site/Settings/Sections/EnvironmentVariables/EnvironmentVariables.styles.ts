import {
  ExternalLink,
  PermissionsTooltip,
  SettingsListItem,
} from '@/components';
import { styled } from '@/theme';
import { Box, FormField, Text } from '@/ui';

export const EnvironmentVariablesStyles = {
  VisibilityField: {
    Root: styled(FormField.Root, {
      flex: '0 !important',
    }),
  },

  PermissionsTooltip: styled(PermissionsTooltip, {
    flex: 1,
  }),

  Editing: {
    FlatRow: styled(SettingsListItem.FlatRow, {
      gridTemplateColumns: '3fr 3fr auto 1fr',

      [`& > ${Box}`]: {
        overflow: 'visible',
      },
    }),
    ActionsBox: styled(Box, {
      alignItems: 'flex-end',
      gap: '$spacing-1',
    }),
    ActionText: styled(Text, ExternalLink, {
      textSize: '$sm',

      variants: {
        colorScheme: { yellow: {}, slate: {} },
      },
    }),
  },
};
