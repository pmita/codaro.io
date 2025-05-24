// NEXT
import type { Metadata } from "next";
// COMPONENTS
import { AuthContextProvider } from "@/context/auth-context/AuthContext";
import { ReactQueryProvider } from "@/context/react-query";
import { Navbar } from "@/layouts/navigation/navbar";
import { Toaster } from "@/components/ui/sonner";
// FONTS
import { roboto, poppins } from "@/lib/fonts";
// STYLES
import "./globals.css";

export const metadata: Metadata = {
  title: 'Codaro.io - The easiest way to learn to code in Greek!',
  description: 'The number one platform for web development taught in Greek'
};

type SearchParams = {
  [key: string]: string | undefined;
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: SearchParams;
}>) {
  return (
        <html lang="en">
          <body
            className={`${roboto.variable} ${poppins.variable}`}
            >
            <ReactQueryProvider>
              <AuthContextProvider>
                <Navbar />
                {children}
                <Toaster />
              </AuthContextProvider>
            </ReactQueryProvider>
          </body>
        </html>
  );
}
