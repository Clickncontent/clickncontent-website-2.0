import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Universal Ambient Light Blur Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Top Left Primary Light */}
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[140px] opacity-70 mix-blend-screen" />
        
        {/* Bottom Right Blue Tint Light */}
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#2873B8]/15 blur-[160px] opacity-60 mix-blend-screen" />
        
        {/* Center Mid-Level Gentle Glow */}
        <div className="absolute top-[30%] left-[60%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px] opacity-50 mix-blend-screen" />
      </div>

      {/* Noise filter overlay */}
      <svg
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-soft-light w-full h-full"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <Navbar />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
