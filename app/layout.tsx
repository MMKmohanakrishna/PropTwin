import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PropTwin | 3D Modeling & Digital Twins for Real Estate",
    template: "%s | PropTwin",
  },
  description:
    "PropTwin is a 3D modeling studio for real estate. We turn floor plans, CAD and BIM files into accurate 3D models, photoreal renders and interactive digital twins for web, mobile and VR.",
  keywords: [
    "3D modeling",
    "architectural 3D modeling",
    "digital twin",
    "real estate 3D",
    "3D walkthrough",
    "VR property tour",
    "architectural visualization",
    "Bengaluru",
  ],
  openGraph: {
    title: "PropTwin | 3D Modeling & Digital Twins for Real Estate",
    description:
      "Accurate 3D models, photoreal renders and interactive digital twins for apartments, villas and real-estate projects.",
    siteName: "PropTwin",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
