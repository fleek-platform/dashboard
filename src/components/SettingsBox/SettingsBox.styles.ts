import { styled } from '@/theme';
import { Avatar, Box, Button, FormField, Icon, Skeleton } from '@/ui';

import { LearnMoreMessage } from '../LearnMoreMessage/LearnMoreMessage';

export const SettingsBoxStyles = {
  Container: styled(Box, {
    position: 'relative',
    variants: {
      variant: {
        container: {
          padding: '$spacing-4',
          background: '$surface-content-fill',
        },
      },
    },
    defaultVariants: { variant: 'container' },

    [`${Avatar}`]: {
      background: '$surface-avatar-icon',
    },
  }),
  Column: styled(Box, {
    gap: '$spacing-4',
  }),
  ActionRow: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '$spacing-4',
    flexWrap: 'wrap',
    width: '$full',

    [`> ${Button}`]: {
      width: '13rem', //fix width to match designs
      paddingTop: 0,
      paddingBottom: 0,
      height: '$inline-component-height-xl',
    },

    [`> ${LearnMoreMessage}`]: {
      width: '$full',
    },

    '@xs': {
      display: 'flex',
      [`> ${LearnMoreMessage}`]: {
        width: 'fit-content',
      },
    },
  }),
  FieldsRow: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-4',
    alignItems: 'flex-start',

    [`> ${FormField.Root}`]: {
      flex: 1,
    },
  }),
  TitleRow: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '$spacing-2',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }),
  EmptyContent: {
    Container: styled(Box, {
      padding: '$spacing-9 0',
      alignItems: 'center',
      gap: '$spacing-2-5',

      [`> ${Icon}`]: {
        color: '$text-secondary',
        fontSize: '$lg',
      },
    }),
  },
  Skeleton: styled(Skeleton, {
    height: '$inline-component-height-xl',
    borderRadius: '$inline-component-radii',

    variants: {
      variant: {
        button: {
          width: '8rem',
          height: '2rem',
          borderRadius: '$md',
        },
        message: {
          width: '90%',
        },
        input: {},
        logo: {
          minWidth: '4rem',
          width: '4rem',
          height: '4rem',
          borderRadius: '$lg',
        },
        'logo-rounded': {
          minWidth: '4rem',
          width: '4rem',
          height: '4rem',
          borderRadius: '$full',
        },
      },
    },
  }),
};
