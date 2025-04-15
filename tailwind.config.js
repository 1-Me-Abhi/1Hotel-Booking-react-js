/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'merienda': ['Merienda', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'custom-bg': '#2ec1ac',
        'custom-bg-dark': '#1a8a7a',
        'dark-primary': '#1a1a1a',
        'dark-secondary': '#2d2d2d',
        'dark-accent': '#3b3b3b',
        'dark-text': '#e1e1e1',
      }
    },
  },
  plugins: [],
} 