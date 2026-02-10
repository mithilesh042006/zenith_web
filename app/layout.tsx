import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZENITH'26 | Rise of Innovation",
  description: "ZENITH'26 - The premier technical symposium of Jeppiaar Engineering College. Experience the rise of innovation.",
  keywords: ["ZENITH", "symposium", "Jeppiaar Engineering College", "technical fest", "2026"],
  authors: [{ name: "Jeppiaar Engineering College" }],
  openGraph: {
    title: "ZENITH'26 | Rise of Innovation",
    description: "The premier technical symposium of Jeppiaar Engineering College",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[#0F0F14] text-[#EDEDED]`}
      >
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
