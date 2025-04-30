
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			roboto: [
  				'var(--font-roboto)',
                    ...defaultTheme.fontFamily.sans
                ],
  			poppins: [
  				'var(--font-poppins)',
                    ...defaultTheme.fontFamily.sans
                ]
  		},
  		colors: {
  			transparent: 'transparent',
  			'primary-grey': '#5F5F5F',
  			'primary-error': '#CE4C4C',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			alternateOne: 'rgb(var(--alternate-one))',
  			alternateTwo: 'rgb(var(--alternate-two))',
  			danger: 'rgb(var(--danger))',
  			neutral: 'rgb(var(--neutral))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
			animation: {
				wiggleUp: 'wiggleUp 5s ease-in-out infinite',
				wiggleDown: 'wiggleDown 5s ease-in-out infinite',
				wiggleLeft: 'wiggleLeft 5s ease-in-out infinite',
				wiggleRight: 'wiggleRight 5s ease-in-out infinite',
			},
			keyframes: {
				wiggleUp: {
					'0%': {
						transform: 'translateY(0px)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					},
					'100%': {
						transform: 'translateY(0px)',
					}
				},
				wiggleDown: {
					'0%': {
						transform: 'translateY(0px)',
					},
					'50%': {
						transform: 'translateY(10px)',
					},
					'100%': {
						transform: 'translateY(0px)',
					}
				},
				wiggleLeft: {
					'0%': {
						transform: 'translateX(0px)',
					},
					'50%': {
						transform: 'translateX(-10px)',
					},
					'100%': {
						transform: 'translateX(0px)',
					}
				},
				wiggleRight: {
					'0%': {
						transform: 'translateX(0px)',
					},
					'50%': {
						transform: 'translateX(10px)',
					},						
					'100%': {
						transform: 'translateX(0px)',
					}
				}
			}
  	}
  },
  plugins: [
		require("tailwindcss-animate"),
	],
} satisfies Config;
