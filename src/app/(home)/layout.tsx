import { Metadata } from "next";
import { Fredoka, Merriweather_Sans } from "next/font/google";
import "@/app/globals.css";
import HomeNav from "@/app/components/Home/HomeNav";

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
  title: "Reformify | Simple Form API",
  description:
    "Create and manage forms easily with Reformify's simple API. Handle form submissions, validations, and notifications without the complexity.",
  keywords: [
    "form API",
    "form management",
    "API forms",
    "form submissions",
    "form validation",
    "form notifications",
    "developer tools",
    "form backend",
  ],
  openGraph: {
    title: "Reformify | Simple Form API",
    description: "Create and manage forms easily with Reformify's simple API",
    url: "https://reformify.dev",
    siteName: "Reformify",
    images: [
      {
        url: "https://reformify.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reformify - Simple Form API",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reformify | Simple Form API",
    description: "Create and manage forms easily with Reformify's simple API",
    images: ["https://reformify.dev/og-image.png"],
  },
  metadataBase: new URL("https://reformify.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${merriweatherSans.variable} antialiased h-full`}
      >
        <HomeNav />
        <div className="h-full">{children}</div>
      </body>
    </html>
  );
}
