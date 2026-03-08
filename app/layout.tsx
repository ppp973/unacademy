import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import TelegramButton from "@/components/TelegramButton";
import SplashScreen from "@/components/SplashScreen";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScholarVerse Premium - India's Best Learning Platform",
  description: "Access premium courses, subjects, and lectures with a smooth mobile-first experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-white min-h-screen pb-20 md:pb-0`}>
        <SplashScreen />
        <Navbar />
        <main className="max-w-7xl mx-auto">
          {children}
        </main>
        <TelegramButton />
        <MobileNav />
      </body>
    </html>
  );
}
