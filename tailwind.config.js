/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        xs: '400px',
      },
      colors: require('./colors.json'),
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
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
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
