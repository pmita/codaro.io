import type { Metadata } from "next";
import { roboto, poppins } from "@/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Codaro.io - The easiest way to learn to code in Greek!',
  description: 'The number one platform for web development taught in Greek'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
