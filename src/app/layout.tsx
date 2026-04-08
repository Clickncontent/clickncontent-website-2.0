import { ReactNode } from "react";
import "../index.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieBanner from "@/components/CookieBanner";
import LayoutComponent from "@/components/Layout";

export const metadata = {
  title: "Content Marketing Bureau Aarhus | ClicknContent",
  description: "Vi er jeres eksterne marketingafdeling med speciale i video og betalte annoncer. Se resultater fra 40+ kunder.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="da" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link href='https://assets.calendly.com/assets/external/widget.css' rel='stylesheet' />
        <script src='https://assets.calendly.com/assets/external/widget.js' async></script>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Abril+Fatface&family=Playfair+Display:wght@900&family=Oswald:wght@700&family=Fraunces:wght@800&family=Syne:wght@800&family=DM+Serif+Display&display=swap" rel="stylesheet" />
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
      </body>
    </html>
  );
}
