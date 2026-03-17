import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lana — AI Instagram Carousel Platform",
  description: "Automatically plan, design, schedule and publish Instagram carousel posts using AI while maintaining strong brand identity.",
  keywords: ["Instagram", "AI", "carousel", "social media", "content calendar", "brand"],
  openGraph: {
    title: "Lana — AI Instagram Carousel Platform",
    description: "Automatically plan, design, schedule and publish Instagram carousel posts using AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
