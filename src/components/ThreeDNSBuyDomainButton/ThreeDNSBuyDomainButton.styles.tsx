import { styled } from '@/theme';
import { Icon } from '@/ui';

import { ExternalLink } from '../ExternalLink/ExternalLink';

export const ThreeDNSBuyDomainButtonStyles = {
  Container: styled(ExternalLink, {
    baseBorder: '$surface-logo',
    borderRadius: '$md',
    padding: '$spacing-1 $spacing-2-5',
    gap: '$spacing-1',

    textCategory: '$tertiary',

    variants: {
      colorScheme: {
        slate: {
          color: '$surface-logo',
        },
      },
    },
  }),
  Icon: styled(Icon, {
    variants: {
      is3DNS: {
        true: {
          svg: {
            width: '3.5em', // matches aspect ratio of 3DNS logo
          },
        },
      },
    },
  }),
};
