import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | Reformify",
  description:
    "Learn how to integrate and use Reformify's form API. Complete documentation for form creation, submission, and response handling.",
  keywords: [
    "form API documentation",
    "Reformify docs",
    "form submission API",
    "API integration guide",
    "form validation",
    "API responses",
    "form security",
    "rate limiting",
    "spam protection",
  ],
  openGraph: {
    title: "Reformify Documentation",
    description: "Complete documentation for Reformify's form API",
    url: "https://reformify.dev/documentation",
    siteName: "Reformify",
    images: [
      {
        url: "https://utfs.io/f/STFL4gpOFkcnKGHdZ2503cBJUNOVkoThR56gaFGlrfuEyAY4", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Reformify Documentation",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reformify Documentation",
    description: "Complete documentation for Reformify's form API",
    images: [
      "https://utfs.io/f/STFL4gpOFkcnKGHdZ2503cBJUNOVkoThR56gaFGlrfuEyAY4", // Add your Twitter card image
    ],
  },
};

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
