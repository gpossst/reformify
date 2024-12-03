import React from "react";
import type { Metadata } from "next";
import { Fredoka, Merriweather_Sans } from "next/font/google";
import "@/app/globals.css";
import DashSidebar from "../components/Dashboard/DashSidebar";
import AuthCheck from "../components/Other/AuthCheck";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const merriweatherSans = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-merriweather-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Formify",
  description: "The form creation and monitoring tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClasses = `${fredoka.variable} ${merriweatherSans.variable} antialiased h-full flex bg-foreground p-2`;

  return (
    <html lang="en">
      <body className={bodyClasses}>
        <DashSidebar />
        <div className="h-full w-full flex flex-4 flex-col items-center pl-2">
          <div className="flex-1 w-full max-h-full bg-background rounded-xl shadow-2xl">
            {children}
            <AuthCheck />
          </div>
        </div>
      </body>
    </html>
  );
}
