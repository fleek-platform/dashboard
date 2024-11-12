import { styled } from '@/theme';
import { Box, FormField, Icon } from '@/ui';

export const VerifyDomainModalStyles = {
  FormRoot: styled(FormField.Root, {
    variants: {
      clickable: {
        true: {
          cursor: 'pointer !important',

          [`> ${FormField.Label}`]: {
            cursor: 'pointer !important',
          },

          '&:hover': {
            [`${Icon}`]: {
              color: '$icon-slate-focus',
            },
          },
        },
      },
    },
  }),
  DataSectionValueContainer: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-2',
    alignItems: 'center',

    [`> ${Icon}`]: {
      color: '$icon-slate',
    },
  }),
};
