import { styled } from '@/theme';
import { AvatarMarble, Menu } from '@/ui';

export const UserMenuStyles = {
  Menu: {
    Trigger: styled(Menu.Trigger, {
      gridArea: 'login',
      display: 'flex',

      [`${AvatarMarble}`]: {
        width: '$inline-component-height-lg',
        height: '$inline-component-height-lg',
      },
    }),
    Root: styled(Menu.Root, {
      [`${Menu.Content}`]: {
        marginTop: '$xs',
      },
    }),
  },
};
