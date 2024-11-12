import { Modal } from '@/components';
import { styled } from '@/theme';
import { Box, Icon, Text } from '@/ui';

export const EnsRecordStyles = {
  Modal: {
    Heading: styled(Modal.Heading, {
      [`>${Box}`]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    }),
    CTARow: styled(Modal.CTARow, {
      gap: '$spacing-3',
      flexDirection: 'column',

      button: {
        width: '$full',
      },
    }),
  },
  ConfirmTransaction: {
    Container: styled(Box, {
      gap: '$spacing-6',
      alignItems: 'center',
      justifyContent: 'center',
      height: '23.4375rem', // hardcoded to match designs

      [`>${Icon}`]: {
        fontSize: '$3xl',
      },
    }),
    Title: styled(Text, {
      color: '$text-primary',
      textSize: '$xl',
      textCategory: '$secondary',
    }),
  },
  Wallet: {
    Container: styled(Box, {
      gap: '$spacing-1',
    }),
  },
};
