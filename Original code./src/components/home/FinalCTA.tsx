import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section className="relative py-32 lg:py-40 bg-foreground overflow-hidden">
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
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-6">Lad os starte</p>
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-6">
            Klar til at skalere
            <br />
            din performance?
          </h2>
          <p className="text-primary-foreground/50 text-lg mb-10 leading-relaxed max-w-md mx-auto">
            Lad os tage en uforpligtende snak om, hvordan vi kan skabe creatives der leverer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base px-10 h-13 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
              <Link to="/kontakt">
                Book et møde
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
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
