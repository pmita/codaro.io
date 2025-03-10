import { Roboto, Poppins } from "next/font/google";

export const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'fallback',
  variable: '--font-roboto'
})

export const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'fallback',
  variable: '--font-poppins'
})