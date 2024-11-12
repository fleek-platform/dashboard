import QRCode from 'react-qr-code';

import { InputField } from '@/components/Form/InputField/InputField';
import { styled } from '@/theme';
import { Box, Icon } from '@/ui';

export const Styles = {
  QRCode: styled(QRCode, {
    height: 'auto',
    maxWidth: '$full',
    width: '$full',
  }),
  VerifyInput: styled(InputField, {
    appearance: 'none',
  }),
  TextSection: styled(Box, {
    gap: '$spacing-2-5',
  }),
  RecoveryCodes: {
    Container: styled(Box, {
      baseBorder: '$border-slate',
      borderRadius: '$lg',
    }),
    DownloadLink: styled('a', {
      textDecoration: 'inherit',
      color: 'inherit',
    }),
    Header: styled(Box, {
      borderRadius: '$lg $lg 0 0',
      background: '$surface-secondary',
      padding: '$spacing-3 $spacing-4',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }),
    Content: styled(Box, {
      borderRadius: '0 0 $lg $lg',
      padding: '$spacing-3 $spacing-4',
      background: '$surface-monochrome',
      baseBorderTop: '$border-slate',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      rowGap: '$spacing-3',
      columnGap: '$spacing-2',
    }),
  },
  QrContainer: styled(Box, {
    width: '10rem',
    aspectRatio: '1/1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '$white',
    padding: '$spacing-4',
    borderRadius: '$md',

    variants: {
      isLoading: {
        true: {
          background: '$surface-tertiary',
          borderRadius: '$lg',
        },
      },
    },
  }),
  SettingsRow: styled(Box, {
    baseBorderTop: '$border-slate',
    padding: '$spacing-4 0',

    [`> ${Box}`]: {
      flexDirection: 'row',
      gap: '$spacing-3',
    },

    '&:first-child': {
      borderTop: 'none',
    },
  }),
  RowContainer: styled(Box, {
    gap: 'none',
  }),
  EmptyBox: styled(Box, {
    padding: '$spacing-8',
    gap: '$spacing-2-5',
    fontSize: '$sm',
    alignItems: 'center',

    [`> ${Icon}`]: {
      fontSize: '$lg',
    },
  }),
};
