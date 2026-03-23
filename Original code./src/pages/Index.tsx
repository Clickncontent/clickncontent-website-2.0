import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import LogoCarousel from "@/components/home/LogoCarousel";
import VideoGrid from "@/components/home/VideoGrid";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSection from "@/components/home/ProcessSection";
import CaseResults from "@/components/home/CaseResults";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <LogoCarousel />
      <VideoGrid />
      <ServicesOverview />
      <ProcessSection />
      <CaseResults />
      <Testimonials />
      <FinalCTA />
    </Layout>
  );
};

export default Index;
