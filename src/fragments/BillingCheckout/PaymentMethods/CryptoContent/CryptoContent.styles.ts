import { ExternalLink, Link, QrCode } from '@/components';
import { styled } from '@/theme';
import { Box, FormField, Icon, Image, Input, Text } from '@/ui';

import { PaymentMethodsStyles } from '../PaymentMethods.styles';

export const CryptoContentStyles = {
  ...PaymentMethodsStyles,

  PaymentTrigger: {
    OptionsWrapper: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-3',
      [`${FormField.Root}`]: {
        flex: 1,
      },
      [`${Image}`]: {
        width: '1rem',
        height: '1rem',
        objectFit: 'contain',
        borderRadius: '$full',
      },
    }),

    CTAContainer: styled(Box, {
      padding: '$spacing-4 25%',
      gap: '$spacing-4',
      height: '13.625rem',
      width: '$full',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '$surface-secondary',
      borderRadius: '$lg',
      baseBorder: '$border-slate',
    }),
  },

  PaymentData: {
    Container: styled(Box, {
      variants: {
        variant: {
          container: {
            padding: '$spacing-4',
            gap: '$spacing-6',
            backgroundColor: '$surface-secondary',
          },
        },
      },
      defaultVariants: {
        variant: 'container',
      },
    }),

    Address: {
      Wrapper: styled(FormField.Root, {
        gap: '$spacing-2',
      }),
      Label: styled(FormField.Label),
      Container: styled(Input.Root, {
        cursor: 'pointer',
        flexDirection: 'row',
        justifyContent: 'space-between',

        [`${Icon}`]: {
          color: '$icon-slate-actionable',
        },

        [`${Text}`]: {
          color: '$text-primary',
        },

        '&:hover': {
          borderColor: '$border-slate-actionable-focus',
          [`${Icon}`]: {
            color: '$icon-slate-actionable-focus',
          },
        },
      }),
    },

    BottomRow: styled(Box, {
      flexDirection: 'row',

      gap: '$spacing-6',
    }),

    QrCode: styled(QrCode, {
      width: '5.625rem',
      flexShrink: 0,
      aspectRatio: '1 / 1',
      borderRadius: '$md',
    }),

    Timer: {
      Wrapper: styled(Box, {
        gap: '$spacing-3',
      }),

      Counter: styled('span', {
        display: 'flex',
        alignItems: 'center',
        gap: '$spacing-2',
        textCategory: '$secondary',
        textSize: '$lg',
      }),
    },
  },

  PaymentStatus: {
    Wrapper: styled(Box, {
      gap: '$spacing-3',
      alignItems: 'center',
      justifyContent: 'center',
    }),

    Icon: styled(Icon, {
      fontSize: '3.4rem',

      variants: {
        color: {
          green: {
            color: '$icon-green',
          },
        },
      },
    }),

    ViewTransactionButton: styled(ExternalLink, {
      alignSelf: 'stretch',

      variants: {
        isSecondary: { true: {} },
      },

      defaultVariants: {
        isSecondary: true,
      },
    }),

    FinishButton: styled(Link, {
      alignSelf: 'stretch',
    }),
  },
};
