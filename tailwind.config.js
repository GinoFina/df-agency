/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#e8edf5',
          100: '#c5d1e8',
          200: '#9fb3d9',
          300: '#7895ca',
          400: '#5c7dbf',
          500: '#3f65b4',
          600: '#2d4f9a',
          700: '#1e3a7a',  // primary – dark blue from logo
          800: '#132660',
          900: '#0a1740',
          950: '#060e28',
        },
        accent: {
          DEFAULT: '#c9a84c', // gold accent
          light:  '#e2c97e',
          dark:   '#a07830',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'count-up': 'countUp 1s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
