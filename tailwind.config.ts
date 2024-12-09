
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)", ...defaultTheme.fontFamily.sans],
        poppins: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        transparent: 'transparent',
        'primary-green': '#22C55E',
        'primary-green-light': 'rgba(34, 197, 94, 0.25)',
        'primary-white': '#FFFFFF',
        'primary-black': '#1E1E1E',
        'secondary-black': '#2B2B2B',
        'primary-baige': '#FFF6EA',
        'primary-blue': '#7BB9FA',
        'primary-grey': '#5F5F5F',
        'primary-error': '#CE4C4C',
        primary: "rgb(var(--primary))",
        // primary: {
        //   DEFAULT: "rgba(var(--primary) / 1)",
        //   400: "rgba(var(--primary-light) / 0.4)",
        //   500: "rgba(var(--primary) / 0.5)",
        //   600: "rgba(var(--primary) / 0.6)",
        //   700: "rgba(var(--primary) / 0.7)",
        //   800: "rgba(var(--primary) / 0.8)",
        //   900: "rgba(var(--primary) / 0.9)",
        // },
        secondary: "rgb(var(--secondary))",
        alternateOne: "rgb(var(--alternate-one))",
        alternateTwo: "rgb(var(--alternate-two))",
        danger: "rgb(var(--danger))",
        neutral: "rgb(var(--neutral))",
        muted: "rgb(var(--muted))",
      },
    },
  },
  plugins: [],
} satisfies Config;
