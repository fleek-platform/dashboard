const defaultGradients = {
  'gradient-rainbow':
    'linear-gradient($surface-primary , $surface-primary) padding-box, linear-gradient(to right, #FFE702, #F45BCE, #00D3FF, #57FF59) border-box',
};

export const gradient = {
  light: {
    ...defaultGradients,
    'coming-soon-overlay':
      'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 69.79%)',
  },
  dark: {
    ...defaultGradients,
    'coming-soon-overlay':
      'linear-gradient(180deg, rgba(25, 25, 25, 0.90) 20%, #111 100%)',
  },
};
