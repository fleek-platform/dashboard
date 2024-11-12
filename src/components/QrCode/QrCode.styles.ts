import { styled } from '@/theme';
import { Skeleton } from '@/ui';

export const QrCodeStyles = {
  Container: styled('div', {
    width: '$5xs',
    aspectRatio: '1 / 1',
  }),
  Image: styled('img', {
    borderRadius: 'inherit',
    width: 'inherit',
    height: 'inherit',
  }),
  Skeleton: styled(Skeleton, {
    borderRadius: 'inherit',
    width: 'inherit',
    height: 'inherit',
  }),
};
