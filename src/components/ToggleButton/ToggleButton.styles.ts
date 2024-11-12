import { styled } from '@/theme';
import { Skeleton as SkeletonComponent } from '@/ui';

export const ToggleButtonStyles = {
  Skeleton: styled(SkeletonComponent, {
    width: '4rem', // hardcoded to fit the design
    height: '2rem', // hardcoded to fit the design
    borderRadius: '$md',
  }),
};
