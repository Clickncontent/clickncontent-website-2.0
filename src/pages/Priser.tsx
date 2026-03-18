import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { CalendlyButton } from "@/components/CalendlyButton";
import { ArrowRight } from "lucide-react";

export default function Priser() {
  return (
    <Layout>
      <section className="py-20 lg:py-40 relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Priser</p>
            <h1 className="font-display text-4xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-8">
              Skræddersyede
              <br />
              løsninger til <span className="text-primary">jeres behov.</span>
            </h1>
            <p className="text-lg lg:text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto mb-10">
              Vi arbejder ikke med faste prispakker. Vi skræddersyer altid prisen ud fra jeres 
              unikke behov, ambitionsniveau og de præcise indholdstyper, der vil skabe mest værdi for jer.
            </p>
            <div className="flex justify-center">
              <CalendlyButton size="lg" className="text-base px-10 h-14 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                Book et opstartskald
                <ArrowRight className="w-5 h-5 ml-2" />
              </CalendlyButton>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
