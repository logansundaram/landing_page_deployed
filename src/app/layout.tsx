import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Nav from "./components/nav";
import Footer from "./components/footer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saturday.ai — Local-first AI agents you can see",
  description:
    "Saturday.ai is a local-first AI agent platform that exposes workflows, tools, metrics, and decisions instead of hiding them. The terminal is the product.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} min-h-screen antialiased`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
