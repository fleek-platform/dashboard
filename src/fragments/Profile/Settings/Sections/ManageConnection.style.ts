import { styled } from '@/theme';
import { Box, Menu, Text } from '@/ui';

export const ManageConnectionStyles = {
  MenuItem: styled(Menu.Item, {
    gap: '$spacing-1',
    maxWidth: '13.5rem', // hardcoded to fit designs
  }),
  Subtitle: styled(Text, {
    textSize: '$xs',
    color: '$text-tertiary',
  }),
};

export const LoginConnectionStyles = {
  ButtonContainer: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-2-5',
  }),
};
