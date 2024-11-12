import { styled } from '@/theme';
import { Icon, Menu, Text } from '@/ui';

export const PrimaryDomainMenuItemStyles = {
  MenuItem: styled(Menu.Item, {
    gap: '$spacing-1',
    maxWidth: '14.5rem', // hardcoded to fit designs

    [`${Icon}`]: {
      marginBottom: 'auto',
    },

    variants: {
      isPrimaryDomain: {
        true: {
          [`${Icon}`]: {
            color: '$icon-yellow',
          },
        },
      },
    },
  }),
  PrimaryTitle: styled(Text, {
    color: '$text-yellow',
  }),
  Subtitle: styled(Text, {
    textSize: '$xs',
  }),
};
