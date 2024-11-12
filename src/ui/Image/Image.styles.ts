import { styled } from '@/theme';

export const ImageStyles = {
  Image: styled('img', {
    objectFit: 'cover',
    objectPosition: 'center',
  }),

  Error: styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '$text-tertiary',
    backgroundColor: '$surface-secondary',
    gap: '$spacing-2-5',
    padding: '$spacing-3',
  }),
};
