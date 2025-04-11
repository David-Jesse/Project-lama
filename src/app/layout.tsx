import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/component/navbar/Navbar';
import Footer from "@/component/footer/Footer";
import { connectToMongoDB } from "@/lib/db";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Next.js 15 Homepage",
    template: "%s | Next.js 15",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB();
  return (
    <html 
    lang="en"
    data-qb-extension-installed="true"
    data-qb-installed="true"
    suppressHydrationWarning={true}
    >
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className='container'>
          <Navbar />
          {children}
          <Footer />
        </div>
        
      </body>
    </html>
  );
}
