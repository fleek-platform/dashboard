import { borderRadius, colors, extend, fontSize, spacing } from './.tailwind';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors,
    spacing,
    fontSize,
    extend,
    borderRadius,
  },
  plugins: [
    ({ addVariant }) => {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
  ],
};
