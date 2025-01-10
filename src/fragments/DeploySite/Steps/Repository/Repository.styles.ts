import { styled } from '@/theme';
import { Scrollable } from '@/ui';

export const RepositoryStyles = {
  List: {
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
          background: 'linear-gradient(180deg, $surface-secondary 10%, $transparent 100%)',
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
          background: 'linear-gradient(0deg, $surface-secondary 10%, $transparent 100%)',
          borderRadius: '0 0 $xl $xl',
          pointerEvents: 'none',
        },
      }),
      Viewport: styled(Scrollable.Viewport),
      Bar: styled(Scrollable.VerticalBar, { margin: '$spacing-6 $spacing-2 $spacing-4 0', zIndex: 1 }),
    },
  },
};
