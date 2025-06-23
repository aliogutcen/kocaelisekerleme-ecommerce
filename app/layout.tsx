import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { NavbarPremium } from "@/components/navbar-premium";
import { FooterPremium } from "@/components/footer-premium";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kocaeli Şekerleme - Geleneksel Doğal Ürünler",
  description: "1948'den beri tahin, tahin helvası, pekmez ve lokum üreticisi",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}