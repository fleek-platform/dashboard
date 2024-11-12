import { ExternalLink } from '@/components';
import { styled } from '@/theme';
import { Box, Text } from '@/ui';

export const FooterStyles = {
  Layout: styled('footer', {
    backgroundColor: '$surface-primary',
    baseBorderTop: '$border-slate',
  }),
  Content: styled(Box, {
    width: '$full',
    maxWidth: '$page-content',
    padding: '$spacing-9 $page-padding',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: '$spacing-9',
    color: '$text-secondary',

    '@sm': {
      alignItems: 'center',
      flexDirection: 'row',
    },
  }),
  LeftFragment: {
    Wrapper: styled(Box, {
      gap: '$spacing-6',
    }),

    TopBox: styled(Box, {
      maxWidth: '$3xs',
      gap: '$spacing-5',
    }),

    LogoWrapper: styled(Box, {
      flexDirection: 'row',
      color: '$text-primary',
    }),

    Text: styled(Text, {
      textSize: '$sm',
      color: '$text-secondary',
      minWidth: 'max-content',
    }),
    Row: styled(Box, {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '$spacing-4',
    }),
  },
  SocialLinks: {
    Container: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-4',

      a: {
        cursor: 'pointer',
        textSize: '$md',
        color: '$text-secondary',
      },
    }),
  },
  Sections: {
    Container: styled('div', {
      display: 'grid',
      gridRowGap: '$spacing-9',
      gridTemplateAreas: "'product developers resources company'",

      '@xs': {
        gap: '$spacing-4',
      },

      '@sm': {
        gap: '$spacing-5',
      },

      '@md': {
        gap: '$spacing-9',
      },
    }),
  },
  Section: {
    Container: styled(Box, {
      gap: '$spacing-3',
      textSize: '$sm',
    }),
    Title: styled(Text, {
      textCategory: '$tertiary',
      color: '$text-primary',
    }),
    Link: styled(ExternalLink, {
      cursor: 'pointer',
      textCategory: '$primary',
      textSize: '$sm',
    }),
  },
  StatusAndVersionContainer: styled('div', {
    gap: '$spacing-9',
    flexDirection: 'column',

    '@xs': { gap: 0 },
  }),
};
