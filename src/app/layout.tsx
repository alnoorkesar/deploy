import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";
import Navbar from "@/components/navbar";
import CartDrawer from "@/components/cart-drawer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al-Noor Kesar | Premium Kashmiri Saffron & Dry Fruits",
  description: "Experience the authentic taste of Kashmir. Premium quality saffron, wild mushrooms, and Himalayan treasures harvested with care and delivered with love.",
  keywords: ["Kashmiri Saffron", "Kesar", "Dry Fruits", "Premium Spices", "Kashmir", "Organic", "Pampore"],
  authors: [{ name: "Al-Noor Kesar" }],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Al-Noor Kesar | Premium Kashmiri Saffron",
    description: "The Gold of Kashmir - Harvested by Young Thoughtful Minds",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <LenisProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
