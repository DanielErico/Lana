import type { Metadata } from "next";
import { DM_Sans, Nunito } from "next/font/google";
import "./globals.css";
import BackgroundBlobs from "@/components/ui/BackgroundBlobs";
import { BrandProvider } from "@/components/providers/BrandProvider";
import { UserProvider } from "@/components/providers/UserProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-nunito",
});

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
    <html lang="en" className={`${dmSans.variable} ${nunito.variable}`}>
      <body className={`font-sans antialiased bg-clay-canvas text-clay-foreground min-h-screen relative overflow-x-hidden`}>
        <BackgroundBlobs />
        <UserProvider>
          <BrandProvider>
            {children}
          </BrandProvider>
        </UserProvider>
      </body>
    </html>
  );
}
