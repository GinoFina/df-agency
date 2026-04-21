/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          700: '#1d4e89',
          800: '#1a355f',
          900: '#0b1f42',
          950: '#05112b',
        },
      },
    },
  },
  plugins: [],
}
