import { ExternalLink } from '@/components';
import { styled } from '@/theme';
import { Box } from '@/ui';

export const HomeStyles = {
  Background: {
    Wrapper: styled(Box, {
      maxHeight: '$min-page-height',
      position: 'relative',
      overflow: 'hidden',
    }),
    Image: styled(Box, {
      position: 'absolute',
      background: 'url(/assets/static/home-background.png)',
      backgroundSize: 'contain',
      backgroundPositionX: 'center',
      backgroundPositionY: 'bottom',
      backgroundRepeat: 'no-repeat',
      left: '50%',
      transform: 'translateX(-50%)',

      height: '120vh',
      width: '90vw',
      bottom: '-80%',
    }),
  },
  Hero: {
    Container: styled(Box, {
      maxWidth: '33rem',
      alignItems: 'center',
      margin: '0 auto',
      marginTop: 'calc(10vh - $page-padding)',
      textAlign: 'center',
    }),
    ButtonContainer: styled(Box, {
      marginTop: '$spacing-6',
      gap: '$spacing-3',
      flexDirection: 'row',

      [`${ExternalLink}`]: {
        textSize: '$md',
      },
    }),
  },
};
