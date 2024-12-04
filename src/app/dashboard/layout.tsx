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
  title: "Reformify Dashboard",
  description:
    "Manage your forms and submissions with Formify's intuitive dashboard.",
  keywords: [
    "form dashboard",
    "form management",
    "form submissions",
    "form analytics",
    "reformify",
    "form tools",
    "developer dashboard",
    "form backend",
  ],
  openGraph: {
    title: "Formify Dashboard",
    description:
      "Manage your forms and submissions with Formify's intuitive dashboard.",
    url: "https://reformify.dev/dashboard",
    siteName: "Formify",
    images: [
      {
        url: "https://utfs.io/f/STFL4gpOFkcnKGHdZ2503cBJUNOVkoThR56gaFGlrfuEyAY4",
        width: 1200,
        height: 630,
        alt: "Formify Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formify Dashboard",
    description:
      "Manage your forms and submissions with Formify's intuitive dashboard.",
    images: [
      "https://utfs.io/f/STFL4gpOFkcnKGHdZ2503cBJUNOVkoThR56gaFGlrfuEyAY4",
    ],
    creator: "@garrettpost",
  },
  metadataBase: new URL("https://reformify.dev"),
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Garrett Post", url: "https://garrett.one" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#EF6461",
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
