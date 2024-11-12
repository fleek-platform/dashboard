import { keyframes, styled } from '@/theme';

const rotateAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export abstract class IconStyles {
  static readonly Container = styled('span', {
    transition: 'transform $default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    svg: {
      width: '1.25em',
      height: '1.25em',
    },

    variants: {
      rotate: {
        true: {
          transform: 'rotate(-180deg)',
        },
      },
      animated: {
        spin: {
          animation: `${rotateAnimation} 5s linear infinite`,
        },
        false: {},
      },
    },

    defaultVariants: {
      rotate: false,
      animated: false,
    },
  });

  static readonly Custom = styled('svg');
}

export namespace IconStyles {
  export type CustomProps = React.ComponentProps<typeof IconStyles.Custom>;
}
