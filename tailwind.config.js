/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xl: '1.2rem',
      },
      fontFamily: {
        sans: ['var(--font-primary)'],
        ['sans-secondary']: ['var(--font-secondary)'],
      },
      boxShadow: {
        header: '0px 1px 16px rgba(30, 30, 30, 0.1)',
        left: '5px 0 15px rgba(0,0,0,.1)',
      },
      screens: {
        xs: '400px',
      },
      colors: require('./colors.json'),
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
