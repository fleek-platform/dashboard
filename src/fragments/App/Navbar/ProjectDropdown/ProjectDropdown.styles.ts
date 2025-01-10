import { styled } from '@/theme';
import { AvatarMarble, Icon, Menu, Scrollable } from '@/ui';

export const ProjectDropdownStyles = {
  MenuItem: {
    Wrapper: styled(Menu.CheckboxItem, {
      zIndex: '$dropdown',
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
  },
};
