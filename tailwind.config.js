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
  },
  plugins: [],
}