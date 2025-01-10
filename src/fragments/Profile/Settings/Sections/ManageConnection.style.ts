import { styled } from '@/theme';
import { Menu } from '@/ui';

export const ManageConnectionStyles = {
  MenuItem: styled(Menu.Item, {
    gap: '$spacing-1',
    maxWidth: '13.5rem', // hardcoded to fit designs
  }),
};
