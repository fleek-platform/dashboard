import { BadgeText } from '@/components';
import { KeyFrames, styled } from '@/theme';
import { Avatar, Box, Checkbox, Icon, Input, Menu, Skeleton } from '@/ui';

import { App } from '../App/App';

export const TemplateStyles = {
  SubmitFooter: {
    Container: styled(Box, {
      width: '$full',
      background: '$surface-secondary',
      baseBorderTop: '$border-slate',
    }),
    Wrapper: styled(Box, {
      width: '$full',
      maxWidth: '$page-content',
      padding: '$spacing-6 $page-padding',
      margin: '0 auto',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '$page-padding',
      alignItems: 'center',
      justifyContent: 'space-between',

      '@xs!': {
        justifyContent: 'center',
      },
    }),
  },
  Details: {
    Content: styled(Box, {
      gridArea: 'content',
      gap: '$spacing-6',
      maxWidth: '$full',
      overflow: 'hidden',
    }),
    DescriptionSkeleton: styled(Box, {
      [`> ${Skeleton}`]: {
        skeletonTextHeight: '$lg',
        width: '70%',
      },
    }),
    ReadmeLoadingContainer: styled(Box, {
      gridArea: 'content',
      height: '$full',
      variants: {
        variant: {
          container: {
            backgroundColor: '$transparent',
          },
        },
      },
      defaultVariants: {
        variant: 'container',
      },
    }),
    ReadmeErrorContainer: styled(Box, {
      gridArea: 'content',
      baseBorder: '$border-slate',
      padding: '$spacing-5',
      borderRadius: '$lg',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '$spacing-2-5',

      [`> ${Icon}`]: {
        color: '$text-secondary',
        fontSize: '$md',
      },
    }),
    ReadmeContainer: styled(Box, {
      baseBorder: '$border-slate',
      padding: '$spacing-5',
      borderRadius: '$lg',

      img: {
        width: '$full',
      },
      pre: {
        background: '$surface-tertiary',
        borderRadius: '$sm',
        padding: '$spacing-3',
        overflow: 'auto',
        maxWidth: '$full',
      },
      code: {
        color: '$text-primary',
        background: '$surface-tertiary',
        padding: '0 $spacing-2',
        borderRadius: '$sm',
      },
      ['p, td']: {
        color: '$text-secondary',
      },
      ['h1, h2']: {
        paddingBottom: '$spacing-2',
        baseBorder: '$border-slate',
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
      },
      a: {
        color: '$text-yellow',
      },
      ['table, td, th']: {
        padding: '$spacing-2',
        baseBorder: '$border-slate',
        borderCollapse: 'collapse',
      },
    }),
    Layout: styled('main', {
      display: 'grid',
      width: '$full',
      gridTemplateColumns: '1fr 15.125rem',
      gap: '$page-padding',

      gridTemplateAreas:
        '"overview overview" "content details" "spacer spacer" "similar similar"',

      '@sm!': {
        gridTemplateColumns: '1fr',
        gridTemplateAreas: '"overview" "content" "details" "spacer" "similar"',
      },
    }),
    Spacer: styled(Box, {
      gridArea: 'spacer',
      margin: '$page-padding 0',
      height: '$small-divider-height',
      background: '$border-slate',
    }),
    SimilarTemplates: {
      Container: styled(Box, {
        gap: '$spacing-5',
        gridArea: 'similar',
      }),
      Header: styled(Box, {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }),
      Grid: styled(Box, {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '$page-padding',

        '@xs!': {
          gridTemplateColumns: '1fr',
        },
      }),
    },
  },
  List: {
    Main: styled('main', {
      display: 'grid',
      width: '$full',
      minHeight: '$min-content-height',
      maxWidth: '$page-content',
      padding: '$page-padding',
      paddingTop: '$spacing-9',
      margin: '0 auto',
      gridTemplateColumns: '13.875rem 1fr',
      gridTemplateRows: 'min-content',
      gridTemplateAreas: '"hero hero" "filter explorer"',
      gridColumnGap: '$spacing-9',
      gridRowGap: '$spacing-9',

      '@md!': {
        gridTemplateColumns: '1fr',
        gridTemplateAreas: '"hero" "filter" "explorer"',
      },
    }),
    Hero: {
      Container: styled(Box, {
        gridArea: 'hero',
        alignItems: 'center',
        gap: '$xs',
      }),
      ButtonContainer: styled(Box, {
        flexDirection: 'row',
        marginTop: '$spacing-5',
        gap: '$spacing-3',

        [`> ${Menu.Trigger}`]: {
          textCategory: '$tertiary',
          textSize: '$sm',
          padding: '$spacing-3',
        },
      }),
    },
    Explorer: {
      Container: styled(Box, {
        gridArea: 'explorer',
        gap: '$spacing-6',
      }),
      Controls: styled(Box, {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '$full',
        gap: '$spacing-99',

        [`> ${Input.Root}`]: {
          width: '$full',
        },
      }),
      Grid: styled(Box, {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridColumnGap: '$spacing-5',
        gridRowGap: '$spacing-5',

        '@sm!': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },

        '@xs!': {
          gridTemplateColumns: '1fr',
        },
      }),
      MenuItem: styled(Menu.Item, {
        variants: {
          selected: {
            true: {
              background: '$surface-secondary',

              '&:hover': {
                background: '$surface-secondary',
                color: '$text-secondary',
              },
            },
          },
        },
      }),
    },
    Filter: {
      Wrapper: styled(Box, {
        padding: '0 $spacing-3',
        overflow: 'hidden',
      }),
      CollapsibleContent: styled(Box, {
        [`&[data-state='open']`]: {
          animation: `${KeyFrames.slideCollapsibleDown} 200ms ease-out`,
        },
        [`&[data-state='closed']`]: {
          animation: `${KeyFrames.slideCollapsibleUp} 200ms ease-out`,
        },
      }),
      Container: styled(Box, {
        gridArea: 'filter',
        gap: '$spacing-3',

        [`> ${Box}`]: {
          gap: '$spacing-2',
        },
      }),
      HeaderRow: styled(Box, {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '$spacing-2-5 0',

        [`> ${Icon}`]: {
          color: '$icon-slate-actionable',
          cursor: 'pointer',
          '&:hover': {
            color: '$icon-slate-actionable-focus',
          },
        },
      }),
      Divider: styled(Box, {
        height: '$small-divider-height',
        width: '$full',
        background: '$border-slate',
      }),
      Row: styled(Box, {
        padding: '$spacing-2-5 0',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '$spacing-2-5',
        [`> ${Checkbox}`]: {
          fontSize: '$sm',
        },
        [`> ${Avatar}`]: {
          fontSize: '$2xs',
        },
        [`> ${BadgeText}`]: {
          fontSize: '$2xs',
        },
      }),
      Skeleton: styled(Skeleton, {
        variants: {
          variant: {
            text: {
              width: '6rem',
              height: '1.5rem',
            },
            checkbox: {
              width: '1rem',
              height: '1rem',
            },
            avatar: {
              width: '1.25rem',
              height: '1.25rem',
              borderRadius: '$full',
            },
          },
        },
      }),
    },
  },
  Create: {
    FormWrapper: styled(Box, {
      width: '$full',
      maxWidth: '30rem',
      gap: '$page-padding',
      justifyContent: 'center',
      margin: '0 auto $spacing-9 auto',
    }),
    Main: styled(App.Content),
    Hero: {
      Container: styled(Box, {
        alignItems: 'center',
      }),
    },
    Form: {
      Container: styled(Box, {
        variants: {
          variant: {
            container: {
              height: 'fit-content',
            },
          },
        },
        defaultVariants: { variant: 'container' },
      }),
      FieldContainer: styled(Box, {
        width: '$full',
        gap: '$spacing-2',
      }),
      Row: styled(Box, {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '$spacing-3',

        '@sm!': {
          flexDirection: 'column',
        },
      }),
    },
  },
};
