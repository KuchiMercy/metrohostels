import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MetroHostels",
  description: "Proximity and Comfort",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#f5f5f5] ${openSans.variable} antialiased`}>
        {children}
      </body>
      <script src="https://js.paystack.co/v1/inline.js" async></script>
    </html>
  );
}
