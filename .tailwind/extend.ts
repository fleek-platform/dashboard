export const extend = {
  keyframes: {
    'fade-in': {
      from: { opacity: 0.5 },
      to: { opacity: 1 },
    },
    'fade-out': {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
    'fade-in-top': {
      from: { opacity: 0.75, transform: 'translateY(-1%)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    'slide-in-left': {
      from: { opacity: 0.75, transform: 'translateX(-10%)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    },
    'slide-out-left': {
      from: { opacity: 1, transform: 'translateX(0)' },
      to: { opacity: 0.3, transform: 'translateX(-10%)' },
    },
  },
  animation: {
    'fade-in': 'fade-in 100ms linear',
    'fade-out': 'fade-out 100ms linear',
    'fade-in-top': 'fade-in-top 100ms ease-out',
    'slide-in-left': 'slide-in-left 250ms cubic-bezier(0.16, 1, 0.3, 1)',
    'slide-out-left': 'slide-out-left 150ms ease-in',
  },
};
