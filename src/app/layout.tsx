import type { Metadata } from "next";
import { AuthContextProvider } from "@/context/auth-context/AuthContext";
import { Navbar } from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { roboto, poppins } from "@/ui/fonts";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query";

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
