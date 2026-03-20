/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e60000', // True Red
          dark: '#b30000',
          light: '#ff3333',
        },
        accent: {
          DEFAULT: '#000000', // Black
          dark: '#1a1a1a',
        },
        gold: '#ffb300', // kept for star ratings
        green: '#00a300', // kept for success indicators
        bg: {
          DEFAULT: '#ffffff', // Clean White
          card: '#ffffff',
          dark: '#000000',    // Black
        },
        text: {
          DEFAULT: '#000000', // Black
          muted: '#666666',
          light: '#999999',
        },
        borderColor: '#e5e5e5', // Light grey for borders on white
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
