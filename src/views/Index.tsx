

import dynamic from 'next/dynamic';
import HeroSection from "@/components/home/HeroSection";
import LogoCarousel from "@/components/home/LogoCarousel";

const VideoGrid = dynamic(() => import("@/components/home/VideoGrid"));
const ServicesOverview = dynamic(() => import("@/components/home/ServicesOverview"));
const ProcessSection = dynamic(() => import("@/components/home/ProcessSection"));
const CaseResults = dynamic(() => import("@/components/home/CaseResults"));
const FAQSection = dynamic(() => import("@/components/home/FAQSection"));
const FinalCTA = dynamic(() => import("@/components/home/FinalCTA"));

const Index = () => {
  return (
    <>
      
      {/* Overflow hidden strictly applied here to clip X-axis spills globally without penalizing vertical bleeding between Hero and LogoCarousel */}
      <div className="relative overflow-hidden">
        {/* Continuous Grid fading out rapidly inside the Hero Section itself, fully decaying before LogoCarousel text */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, black 0%, black 95vh, transparent 110vh)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 95vh, transparent 110vh)'
        }} />
        <HeroSection />
        <LogoCarousel />
      </div>
      <VideoGrid />
      <ServicesOverview />
      <ProcessSection />
      <CaseResults />
      <FinalCTA />
      <FAQSection />
    </>
  );
};

export default Index;
