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
    "reformify",
    "API forms",
    "form submissions",
    "form validation",
    "form notifications",
    "developer tools",
    "form backend",
    "form handling",
    "form service",
  ],
  openGraph: {
    title: "Reformify | Simple Form API",
    description: "Create and manage forms easily with Reformify's simple API",
    url: "https://reformify.dev",
    siteName: "Reformify",
    images: [
      {
        url: "https://utfs.io/f/STFL4gpOFkcnKGHdZ2503cBJUNOVkoThR56gaFGlrfuEyAY4",
        width: 1200,
        height: 630,
        alt: "Reformify - Simple Form API",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reformify | Simple Form API",
    description: "Create and manage forms easily with Reformify's simple API",
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
