import { styled } from '@/theme';
import { Avatar, Box, Icon, Input, Scrollable } from '@/ui';

import { DeploySiteStepsStyles as S } from '../Steps.styles';

export const RepositoryStyles = {
  Container: styled(S.Container, {
    height: '$md',
  }),

  Wrapper: styled(Box, {
    position: 'relative',
    flexDirection: 'row',
    gap: '$spacing-3',
    textSize: '$sm',
    flexWrap: 'wrap',

    [`${Input.Root}`]: { flex: 1 },
  }),

  List: {
    Content: styled(Box, {
      padding: '$spacing-6 0',
    }),
    Scrollable: {
      Root: styled(Scrollable.Root, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',

        flex: 1,
        margin: '-$spacing-6',
        marginTop: 'calc(-$spacing-6 + 1px)', // fix to not override combobox and input borders
        padding: '0 $spacing-6 0 $spacing-6',

        '> div': {
          zIndex: 0,
        },

        '&:after': {
          zIndex: 1,
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '$space$spacing-7',
          background:
            'linear-gradient(180deg, $surface-primary 10%, $transparent 100%)',
          pointerEvents: 'none',
        },

        '&:before': {
          zIndex: 1,
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '$space$spacing-7',
          background:
            'linear-gradient(0deg, $surface-primary 10%, $transparent 100%)',
          borderRadius: '0 0 $xl $xl',
          pointerEvents: 'none',
        },
      }),
      Viewport: styled(Scrollable.Viewport),
      Bar: styled(Scrollable.VerticalBar, {
        margin: '$spacing-6 $spacing-2 $spacing-4 0',
        zIndex: 1,
      }),
    },
    Spinner: styled(Icon, {
      fontSize: '$xl',
    }),
  },

  Repository: {
    Container: styled(Box, {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: '$docked',

      baseBorderBottom: '$border-slate',
      padding: '$spacing-4 0',

      '&:first-child': {
        paddingTop: 0,
      },

      '&:last-child': {
        borderBottom: 'none',
        paddingBottom: 0,
      },
    }),
    LeftColumn: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-2-5',
    }),
  },

  NoRepositories: {
    Container: styled(Box, {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      gap: '$xs',
      textSize: '$sm',
    }),
  },

  SelectBranch: {
    Container: S.Container,
    TitleRow: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-3',
      alignItems: 'center',
    }),
    Avatar: styled(Avatar, {
      fontSize: '$2xl',
      padding: '$spacing-2-5 !important',
      backgroundColor: '$surface-secondary !important',
    }),
  },
};
