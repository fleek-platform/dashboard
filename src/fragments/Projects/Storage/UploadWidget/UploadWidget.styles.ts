import { BadgeText } from '@/components';
import { styled } from '@/theme';
import { Accordion, Box, Button, Icon, Image, Text, Tooltip } from '@/ui';

export const UploadingStateStyles = {
  Container: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '$spacing-3',
    textCategory: '$tertiary',
    textSize: '$sm',
    baseBorderBottom: '$border-slate',

    [`${Button}`]: {
      padding: '$spacing-1 $spacing-3',
      minHeight: '$fontSizes$3xl',
    },

    variants: {
      status: {
        uploading: {
          backgroundColor: '$surface-yellow-lighter',

          [`${Text}`]: {
            color: '$text-yellow',
          },

          [`${Button}`]: {
            backgroundColor: '$button-slate-secondary',
          },
        },
        error: {
          backgroundColor: '$surface-red-lighter',
          color: '$text-red',
        },
        success: {},
      },
    },
  }),
  ErrorMessage: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-1',
    alignItems: 'center',
    textSize: '$sm',
    textCategory: '$tertiary',

    [`${Icon}`]: {
      fontSize: '$md',
    },
  }),
  ButtonsContainer: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-2',
  }),
};

export const UploadFileStyles = {
  Container: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '$spacing-3 $spacing-4',
    textCategory: '$tertiary',
    textSize: '$sm',
    color: '$text-secondary',

    baseBorderBottom: '$border-slate',

    '&:last-child': {
      borderBottom: 'none',
    },
  }),
  Icon: styled(Icon, {
    variants: {
      status: {
        success: {
          color: '$icon-green',
        },
        error: {
          color: '$icon-red',
        },
      },
    },
  }),
  NameContainer: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-1',
    alignItems: 'center',
    maxWidth: '45%',

    [`${Image}`]: {
      width: '$fontSizes$md',
      height: '$fontSizes$md',
      padding: 0,
      borderRadius: '$min',
    },

    [`${Text}`]: {
      color: '$text-primary',
      textCategory: '$primary',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  DetailsContainer: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: '$spacing-7',
    textCategory: '$tertiary',

    [`${Box}`]: {
      minWidth: '5rem', //hardcoded to keep aligned the columns of the row when status change to canceled
      justifyContent: 'center',
      alignItems: 'flex-end',

      [`${BadgeText}`]: {
        paddingBottom: 'calc($space$spacing-1 * 0.5)',
        paddingTop: 'calc($space$spacing-1 * 0.5)',

        [`${Icon}`]: {
          width: '$space$inline-component-padding',
          height: '$space$inline-component-padding',
        },
      },
    },

    [`${Icon}`]: {
      fontSize: '$md',
    },

    variants: {
      withErrorTooltip: {
        true: {
          color: '$text-red',

          [`${Tooltip.Trigger}`]: {
            padding: 0,
          },

          [`${Tooltip.Content}`]: {
            maxWidth: '13.625rem',
          },
        },
      },
    },
  }),
};

export const UploadWidgetStyles = {
  Accordion: {
    Root: styled(Accordion.Root, {
      borderBottomLeftRadius: '0 !important',
      borderBottomRightRadius: '0 !important',
      borderBottom: 'none',

      maxWidth: 'calc($sm + $space$spacing-4)',
      alignSelf: 'end',

      position: 'fixed',
      right: '$spacing-6',
      bottom: 0,
      zIndex: '1',
    }),
    Item: styled(Accordion.Item, {
      borderBottomLeftRadius: '0 !important',
      borderBottomRightRadius: '0 !important',
    }),
    Header: styled(Accordion.Header, {
      fontSize: '$sm',
    }),
    Content: styled(Accordion.Content, {
      padding: '0',
      maxHeight: '19.5rem', // needs to be hardcoded to fit the files list
      overflowY: 'scroll',
    }),
  },
};
