import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendlyButton } from "@/components/CalendlyButton";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Highlight } from "@/components/Highlight";

const FinalCTA = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary text-base lg:text-lg font-semibold tracking-widest uppercase mb-6">Lad os starte</p>
          <h2 className="font-display text-5xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
            Klar til at <Highlight delay={0.2}>skalere</Highlight>
            <br />
            din performance?
          </h2>
          <p className="text-primary-foreground/50 text-lg mb-10 leading-relaxed max-w-md mx-auto">
            Lad os tage en uforpligtende snak om, hvordan vi kan blive jeres kreative motor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CalendlyButton size="lg" className="text-base px-10 h-13 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
              Book et møde
              <ArrowRight className="w-4 h-4 ml-1" />
            </CalendlyButton>
            <Button asChild variant="outline" size="lg" className="text-base px-8 h-13 rounded-xl border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/cases">Se vores resultater</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
