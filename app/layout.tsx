import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const mulish = localFont({
  src: [
    {
      path: "./fonts/mulish/Mulish-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/mulish/Mulish-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/mulish/Mulish-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mulish",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

const newsreader = localFont({
  src: [
    {
      path: "./fonts/newsreader/Newsreader-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/newsreader/Newsreader-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/newsreader/Newsreader-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const sourceSans = localFont({
  src: [
    {
      path: "./fonts/source-sans-3/SourceSans3-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/source-sans-3/SourceSans3-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-source-sans-3",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: "Headwaters — A better home for your photos",
  description:
    "A new space for photographers to preserve the places, stories, and experiences that give their images meaning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mulish.variable} ${newsreader.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
