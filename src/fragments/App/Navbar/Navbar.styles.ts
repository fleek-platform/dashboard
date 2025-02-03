import { styled } from '@/theme';
import { Avatar, Icon } from '@/ui';

export const NavbarStyles = {
  Layout: styled('header', {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    zIndex: '$dropdown',
    background: '$surface-primary',
    baseBorderBottom: '$border-slate',

    '&:after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
    },
  }),

  Content: styled('div', {
    width: '$full',
    maxWidth: '$page-content',
    margin: '0 auto',
    padding: '0 $page-padding',
    height: '$header-height',
    alignItems: 'center',

    display: 'grid',
    gap: '$spacing-3',
    justifyItems: 'start',

    variants: {
      mobile: {
        true: {
          // grid template for mobile is the same for project and app layout
          gridTemplateAreas: '"logo login menu"',
          gridTemplateColumns: '1fr auto auto',
        },
      },
      layout: {
        home: {
          gridTemplateAreas: '"logo docs login"',
          gridTemplateColumns: '1fr auto auto',
        },
        template: {
          gridTemplateAreas: '"logo unauthored-links login"',
          gridTemplateColumns: 'auto 1fr auto',
        },
        project: {
          gridTemplateAreas: '"logo navigation login"',
          gridTemplateColumns: '1fr auto auto',
        },
        app: {
          gridTemplateAreas: '"logo navigation search login"',
          gridTemplateColumns: 'auto 1fr auto auto',
        },
      },
    },
  }),

  Logo: {
    Icon: styled(Icon, {
      fontSize: '$2xl',
    }),
  },

  Avatar: styled(Avatar, {
    gridArea: 'login',
  }),

  Sidebar: {
    Content: styled('div', {
      display: 'flex',
      flexDirection: 'column',
      gap: '$spacing-3',

      position: 'fixed',
      top: 0,
      bottom: 0,
      right: 0,
      padding: '$spacing-6',
      minWidth: '$sidebar-width',
      zIndex: '$sticky',
      backgroundColor: '$surface-primary',
      transition: 'transform 0.3s ease-in-out',
      baseBorder: '$border-slate',

      variants: {
        open: {
          true: {
            transform: 'translateX(0%)',
          },
          false: {
            transform: 'translateX(100%)',
          },
        },
      },
    }),

    Backdrop: styled('div', {
      position: 'fixed',
      inset: 0,
      zIndex: '$sticky',
      backgroundColor: '$surface-primary',
      display: 'none',
      transition: 'opacity 0.3s ease-in-out',

      variants: {
        open: {
          true: {
            display: 'block',
            backdropFilter: 'blur(4px)',
          },
        },
      },
    }),

    MenuIcon: styled(Icon, { gridArea: 'menu', fontSize: '$sm' }),
  },
};
