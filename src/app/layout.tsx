import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import LogoIcon from '../components/LogoIcon';
import Footer from '../components/Footer';
import ClientLayoutWrapper from '../components/ClientLayoutWrapper';
import { GoogleAnalytics } from '@next/third-parties/google'


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ainewstools | The Ultimate AI Directory & News Hub",
  description: "Find the best AI tools, read latest AI news, and compare platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
      </body>
    </html>
  );
}
