import { colors, extend, fontSize, spacing } from './.tailwind';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors,
    spacing,
    fontSize,
    extend,
  },
  plugins: [
    ({ addVariant }) => {
      addVariant('child', '& > *');
    },
  ],
};
