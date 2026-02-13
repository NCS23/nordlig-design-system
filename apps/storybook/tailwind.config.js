/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../packages/components/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
};
