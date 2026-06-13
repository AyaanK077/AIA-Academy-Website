/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Deep emerald: primary brand color
        emerald: {
          50: '#eef6f1',
          100: '#d6eadf',
          200: '#aed6bf',
          300: '#7bbb99',
          400: '#4a9b73',
          500: '#2e7d5b',
          600: '#1f6349',
          700: '#14674f', // primary
          800: '#0e4a39',
          900: '#0a3829',
        },
        // Warm gold: accent
        gold: {
          50: '#fbf6e7',
          100: '#f6ead0',
          200: '#ecd49d',
          300: '#e0bb66',
          400: '#cfa23a',
          500: '#b8860b', // accent
          600: '#9a6f0a',
          700: '#7a5708',
          800: '#5c4106',
          900: '#3f2c04',
        },
        // Cream / parchment backgrounds
        cream: {
          50: '#fdfcf8',
          100: '#faf8f1',
          200: '#f3eee0',
          300: '#e9e1cb',
        },
        ink: '#2d2a26',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
      maxWidth: {
        prose: '70ch',
      },
    },
  },
  plugins: [],
};
