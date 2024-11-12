import { globalCss } from './themes';

export const themeGlobals = globalCss({
  'html, body': {
    padding: 0,
    margin: '0 !important',
    color: '$slate12',
    backgroundColor: '$background',

    fontFamily: '$body',

    fontSize: '13px',

    '@sm': {
      '$space$page-padding': '1.5rem',
    },

    '@lg': {
      fontSize: '16px',
      '$space$page-padding': '2rem',
    },
  },
  button: {
    all: 'unset',
    boxSizing: 'border-box',
  },
  '*': {
    boxSizing: 'border-box',
  },
  html: {
    backgroundColor: '$foreground',
  },
});
