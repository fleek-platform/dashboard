import { styled } from '@/theme';
import { Box, Button, FormField, Icon, Image, Input } from '@/ui';

export const ConfigureStepStyles = {
  Form: {
    Wrapper: styled(Box, {
      gap: '$spacing-4',
      fontSize: '$sm',

      [`> ${Button}`]: {
        width: '100%',
      },
    }),

    Row: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-3',
    }),

    ComboboxImage: styled(Image, {
      // the image size depends on the font size
      width: '1.25em',
      height: '1.25em',
      borderRadius: '$full',
    }),
  },

  Advanced: {
    Container: styled(Box, {
      margin: '0 -$spacing-6',
      overflow: 'hidden',
      transition: 'all 0.3s ease',

      variants: {
        variant: {
          container: {
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            background: '$surface-secondary',
          },
        },
        enabled: {
          true: { opacity: 1, padding: '$spacing-6', borderWidth: '$base' },
          false: { opacity: 0, padding: '0 $spacing-6', borderWidth: 0 },
        },
      },

      defaultVariants: {
        variant: 'container',
        enabled: false,
      },
    }),

    Row: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-3',
      [`${FormField.Root}`]: {
        flex: 1,

        [`${Input.Root}`]: {
          minHeight: '$inline-component-height-xl',
        },
      },
      [`${Button}`]: {
        maxHeight: '$inline-component-height-xl',
      },

      [`> ${Icon}`]: {
        maxHeight: '$inline-component-height-xl',
        color: '$icon-slate-actionable',
        transition: '$all-200',
        '&:hover': { color: '$icon-slate-actionable-focus', cursor: 'pointer' },
      },
    }),
  },
};
