import { styled } from '@/theme';
import { Box, Skeleton } from '@/ui';

export const PrivateGatewaysStyles = {
  PrivateGatewayListItem: {
    Header: styled(Box, {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
    TitleWrapper: styled(Box, {
      gap: '$spacing-2-5',
    }),
    ButtonsContainer: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-3',
      fontSize: '$sm',
    }),
  },
  DataSkeleton: styled(Skeleton, {
    variants: {
      variant: {
        title: {
          height: '$lineHeights$sm',
          width: '30%',
        },
        text: {
          height: '$lineHeights$xs',
          width: '50%',
        },
      },
    },
  }),
};
