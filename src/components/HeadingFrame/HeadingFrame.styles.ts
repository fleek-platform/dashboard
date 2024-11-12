import { styled } from '@/theme';

export const HeadingFrameStyles = {
  Frame: styled('span', {
    position: 'relative',
    overflow: 'hidden',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textSize: '$2xl',
    textCategory: '$secondary',
    height: '7.75rem',
    baseBorder: '$border-slate',
    borderRadius: '$lg',

    color: 'white', // TODO: this should be a theme color after we have light theme image

    zIndex: '$base',

    '&:before': {
      zIndex: '$hide',
      content: '""',
      position: 'absolute',
      inset: 0,

      backgroundColor: 'black', // TODO: this should be a theme color after we have light theme image

      backgroundImage: 'url("/assets/static/home-background.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '35rem',
      backgroundPosition: '50% 40%',
    },

    '&:after': {
      zIndex: -1,
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(303deg, #FFE702 7.28%, #FF3DCF 33.33%, #14BCDF 66.15%, #49F0A1 85.42%, #49E34B 100%)',
      filter: 'blur(49.230770111083984px)',
      opacity: 0.3,
    },

    variants: {
      theme: {
        light: {
          '&:before': {},
        },
        dark: {
          '&:before': {},
        },
      },
    },
  }),
};
