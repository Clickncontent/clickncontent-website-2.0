import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import LogoCarousel from "@/components/home/LogoCarousel";
import VideoGrid from "@/components/home/VideoGrid";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSection from "@/components/home/ProcessSection";
import CaseResults from "@/components/home/CaseResults";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Content Marketing Bureau Aarhus | ClicknContent</title>
        <meta name="description" content="Vi er jeres eksterne marketingafdeling med speciale i video og betalte annoncer. Se resultater fra 40+ kunder." />
        <meta property="og:title" content="Content Marketing Bureau Aarhus | ClicknContent" />
        <meta property="og:description" content="Vi er jeres eksterne marketingafdeling med speciale i video og betalte annoncer. Se resultater fra 40+ kunder." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://clickncontent.dk/" />
      </Helmet>
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
    </Layout>
  );
};

export default Index;
