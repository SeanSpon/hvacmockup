import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FD Pierce Company | Commercial HVAC, Refrigeration & Ice Machines | Louisville, KY",
  description:
    "Louisville's most trusted commercial HVAC partner since 1978. Expert heating, cooling, refrigeration, and ice machine services. 24/7 emergency repairs. BBB A+ rated. Call (502) 969-3377.",
  keywords: [
    "HVAC Louisville",
    "commercial HVAC",
    "refrigeration repair Louisville",
    "ice machine service",
    "FD Pierce",
    "heating and cooling Louisville KY",
    "24/7 HVAC emergency",
    "commercial refrigeration Louisville",
  ],
  openGraph: {
    title: "FD Pierce Company | Commercial HVAC Experts",
    description:
      "Keeping Louisville Cool Since 1978. Commercial HVAC, Refrigeration & Ice Machine experts. BBB A+ rated.",
    type: "website",
    locale: "en_US",
    url: "https://fdpierce.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0a1628] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
