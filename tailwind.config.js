const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      'midnight': 'red',
      'main-white': '#FFFFFF',
      'main-black': '#1E1E1E',
      'secondary-black': '#2B2B2B',
      'highlight-green': '#337A5B',
      'main-purple': '#271FE0',
      'error-red': '#CE4C4C',
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        roboto: ["var(--font-roboto)"],
        poppins: ["var(--font-poppins)"],
      },
    },
    rotate: {
      '15': '15deg',
      '20': '20deg',
      '45': '45deg',
    },
    keyframes: {
      left: {
        '0%, 100%': { transform: 'rotateZ(10deg)' },
        '50%': { transform: 'rotateZ(-15deg)' },
      },
      right: {
        '0%, 100%': { transform: 'rotateZ(-10deg)' },
        '50%': { transform: 'rotateZ(15deg)' },
      },
    },
    animation: {
      rotateLeft: 'left 9s ease-in-out infinite',
      rotateRight: 'right 9s ease-in-out infinite',
    },
  },
  plugins: [],
  darkMode: "class",
}