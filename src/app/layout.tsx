import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "./components/nav";
import Footer from "./components/footer";
import { site } from "./lib/site";

/* One family carries every register — display, spec, micro, captures.
   Variable weight file, self-hosted; no third-party font requests. */
const commitMono = localFont({
  src: "./fonts/CommitMonoV143-VF.woff2",
  variable: "--font-commit",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "AI agent",
    "local-first AI",
    "local LLM",
    "terminal AI agent",
    "TUI agent",
    "transparent AI",
    "observable AI agent",
    "open source AI agent",
    "private AI agent",
    "on-device AI",
    "approval gates",
    "RAG",
    "developer tools",
    "Saturn",
    "Saturday.ai",
  ],
  authors: [{ name: site.org, url: site.url }],
  creator: site.org,
  publisher: site.org,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Saturn",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, WSL2, Windows",
    description: site.description,
    url: site.url,
    publisher: {
      "@type": "Organization",
      name: site.org,
      url: site.url,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en">
      <body className={`${commitMono.variable} min-h-screen antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        {/* Sections run full-bleed; each centers its own content */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
