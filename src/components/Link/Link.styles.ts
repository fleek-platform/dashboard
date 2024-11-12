// eslint-disable-next-line no-restricted-imports
import Link from 'next/link';

import { styled } from '@/theme';

export const LinkStyles = {
  Link: styled(Link, {
    textDecoration: 'none',
    color: 'inherit',
    transition: '$all-200',
  }),
};
