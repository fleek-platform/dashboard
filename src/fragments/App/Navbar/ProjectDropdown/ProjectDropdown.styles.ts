import { BadgeText, Link } from '@/components';
import { styled } from '@/theme';
import { Avatar, AvatarMarble, Box, Icon, Menu, Scrollable } from '@/ui';

export const ProjectDropdownStyles = {
  MenuItem: {
    Wrapper: styled(Menu.CheckboxItem, {
      zIndex: '$dropdown',
    }),
    Container: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-2-5',
      alignItems: 'center',
      textSize: '$sm',

      [`>${Avatar}`]: {
        fontSize: '$2xs',
      },

      [`>${AvatarMarble}`]: {
        fontSize: '$2xs',
      },
    }),
    AvatarMarble: styled(AvatarMarble, {}),
  },

  CreateProject: {
    MenuItem: styled(Menu.Item, {
      gap: '$spacing-2-5',
      justifyContent: 'initial',

      [`${Icon}`]: {
        color: '$icon-yellow',
        fontSize: '$md',
      },
    }),
  },

  ProjectSelected: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-2-5',
    alignItems: 'center',
    textSize: '$sm',
    textCategory: '$tertiary',
    padding: '$spacing-2 $spacing-2',
    borderRadius: '$sm',

    '&:hover': {
      backgroundColor: `$surface-actionable`,
    },

    [`${Avatar}`]: {
      fontSize: '$xs',
    },

    [`${AvatarMarble}`]: {
      width: '1.5rem',
      height: '1.5rem',
    },

    [`${Link}`]: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: '$spacing-2-5',
    },

    [`${Menu.Trigger}`]: {
      padding: '$spacing-1 0',
      borderRadius: '$full',
      cursor: 'pointer',
      transition: '$all-200',

      '&:hover': {
        backgroundColor: '$button-slate-secondary-hover',
      },
    },
  }),

  ProjectRenameBadge: styled(Link, BadgeText, {
    paddingTop: 0,
    paddingBottom: 0,

    variants: {
      colorScheme: { slate: {} },
      isSecondary: { true: {} },
    },

    defaultVariants: { colorScheme: 'slate', isSecondary: true },
  }),

  Scrollable: {
    Root: styled(Scrollable.Root, {}),
    Viewport: styled(Scrollable.Viewport, {
      maxHeight: '$3xs',
      variants: {
        scrollbarEnabled: {
          true: {
            paddingRight: '$sm',
          },
        },
      },
    }),
    Bar: styled(Scrollable.VerticalBar, { zIndex: 1 }),
    Content: styled(Box, { gap: '$spacing-2-5' }),
  },
};
