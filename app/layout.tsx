import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import UpgradePopup from "@/components/upgrade-popup";
import { NavPendingProvider } from "@/components/app-nav-pending";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VocalMorph",
  description: "AI-powered voice cloning and audio generation platform with studio-quality celebrity voices.",
  openGraph: {
    title: "VocalMorph",
    description: "AI-powered voice cloning and audio generation platform with studio-quality celebrity voices.",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><NavPendingProvider>{children}</NavPendingProvider><UpgradePopup /></body>
    </html>
  );
}
