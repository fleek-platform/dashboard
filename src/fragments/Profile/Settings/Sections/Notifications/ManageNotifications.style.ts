import { styled } from '@/theme';

export const ManageNotificationsStyles = {
  List: styled('ul', {
    listStyle: 'none',
    flex: 1,
    margin: 0,
    padding: 0,
  }),

  Item: styled(
    'li',
    {
      marginBottom: '$spacing-4',
      display: 'grid',
      gridTemplateColumns: '5rem 1fr',
    },
    {
      variants: {
        variant: {
          header: {
            fontSize: '$sm',
            color: '$text-tertiary',
          },
        },
      },
    },
  ),
};
