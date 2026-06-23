import { ReactNode } from "react";
import "../index.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieBanner from "@/components/CookieBanner";
import LayoutComponent from "@/components/Layout";

export const metadata = {
  metadataBase: new URL("https://www.clickncontent.dk"),
  title: {
    default: "Content Marketing Bureau Aarhus | ClicknContent",
    template: "%s | ClicknContent",
  },
  description: "Vi er jeres eksterne marketingafdeling med speciale i video og betalte annoncer. Se resultater fra 40+ kunder.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://www.clickncontent.dk",
    siteName: "ClicknContent",
    title: "Content Marketing Bureau Aarhus | ClicknContent",
    description: "Vi er jeres eksterne marketingafdeling med speciale i video og betalte annoncer. Se resultater fra 40+ kunder.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ClicknContent — Video creatives der skalerer din paid social" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Content Marketing Bureau Aarhus | ClicknContent",
    description: "Vi er jeres eksterne marketingafdeling med speciale i video og betalte annoncer.",
    images: ["/og-image.jpg"],
  },
};

import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="da" suppressHydrationWarning>
      <head>
        <link href='https://assets.calendly.com/assets/external/widget.css' rel='stylesheet' />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <TooltipProvider>
          <LayoutComponent>
            {children}
            <CookieBanner />
          </LayoutComponent>
        </TooltipProvider>
        <Toaster />
        <Sonner />
        <SpeedInsights />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
