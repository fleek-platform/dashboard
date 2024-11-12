import { AlertBox } from '@/components';
import { styled } from '@/theme';
import { Box, Dialog, Icon, Input } from '@/ui';

export const UploadModalStyles = {
  ModalUpload: {
    Trigger: styled(Dialog.Trigger, {
      display: 'none',
    }),
  },
  Title: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
    [`${Icon}`]: {
      color: '$icon-slate-actionable',
      cursor: 'pointer',

      '&:hover': {
        color: '$icon-slate-actionable-focus',
      },
    },
  }),
  Dropzone: styled(Box, {
    border: 'dashed $border-slate',
    borderRadius: '$xl',
    backgroundColor: '$surface-monochrome',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '$xl $spacing-8',
    cursor: 'pointer',

    '&:hover': {
      borderColor: '$border-yellow-actionable-focus',
      backgroundColor: '$surface-yellow-lighter',

      [`${Icon}`]: {
        color: '$icon-yellow',
      },
    },

    '&:focus-visible': {
      outline: 'none',
    },
  }),
  Container: styled(Box, {
    justifyContent: 'center',
    alignItems: 'center',
    gap: '$spacing-2-5',
    maxWidth: '14.675rem', //hardcoded value to match the design

    [`& ${Icon}`]: {
      color: '$icon-slate',
      fontSize: '$3xl',
    },

    [`${Box}`]: {
      alignItems: 'center',
    },
  }),
  Input: styled(Input.Root, {
    display: 'none',
    [`${Input.Field}`]: {
      display: 'none',
    },
  }),
  AlertBox: styled(AlertBox, {
    div: {
      textSize: '$xs',
    },
  }),
};
