import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { DemoModeBanner } from "@/components/layout/DemoModeBanner";
import { SkipLink } from "@/components/layout/SkipLink";
import { CartProvider } from "@/components/commerce/CartProvider";
import { AnalyticsScripts } from "@/components/layout/AnalyticsScripts";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { UtmCapture } from "@/components/layout/UtmCapture";
import { brand } from "@/lib/content/brand";
import { seo } from "@/lib/content/seo";
import { absoluteUrl } from "@/lib/utils/cn";
import { isDemoMode } from "@/lib/validation/env";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: seo.home.title,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  keywords: [...seo.keywords],
  authors: [{ name: brand.name, url: absoluteUrl("/") }],
  creator: brand.name,
  publisher: brand.name,
  category: "shopping",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: brand.name,
    title: seo.home.title,
    description: brand.description,
    images: [
      {
        url: brand.shareImage.src,
        width: brand.shareImage.width,
        height: brand.shareImage.height,
        alt: brand.shareImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.home.title,
    description: brand.description,
    images: [brand.shareImage.src],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const demo = isDemoMode();

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans text-ink">
        <SkipLink />
        <CartProvider>
          <DemoModeBanner show={demo} />
          <AnnouncementBar />
          <Navigation />
          <main id="main-content" className="min-h-[70vh]">
            {children}
          </main>
          <Footer />
          <ConsentBanner />
          <UtmCapture />
          <AnalyticsScripts />
        </CartProvider>
      </body>
    </html>
  );
}
