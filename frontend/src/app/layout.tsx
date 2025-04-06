import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import Header from "./components/ui/header";

const inter = Inter({
  subsets: ["latin"], // You can add 'latin-ext', 'cyrillic', etc.
  variable: "--font-inter", // Optional: for using as a CSS variable
  display: "swap",
});

export const metadata: Metadata = {
  title: "IdeaGenie - Turn Feedback into Features",
  description:
    "IdeaGenie is a B2B SaaS tool that leverages React-based LLMs to identify the top 3 product ideas from user-submitted feature requests. Streamline product decision-making using AI-driven insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen h-screen flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
