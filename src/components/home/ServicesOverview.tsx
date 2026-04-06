import { motion } from "framer-motion";
import { Lightbulb, Video, FlaskConical, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/Highlight";

const services = [
  { icon: Lightbulb, title: "Kreativ Strategi", description: "Vi researchar jeres marked, målgruppe og konkurrenter og bygger en kreativ retning, der er designet til at performe i ads." },
  { icon: Video, title: "Videoproduktion", description: "Vi producerer video i volume. Fra rå UGC-stil til poleret brand content, alt skræddersyet til feed og annoncer." },
  { icon: FlaskConical, title: "Creative Testing", description: "Vi tester hooks, angles og formater systematisk, så budgettet går til de creatives der faktisk konverterer." },
  { icon: BarChart3, title: "Performance Analyse", description: "Vi analyserer hook rate, hold rate og konverteringsdata og omsætter det til konkrete ændringer i næste runde creatives." },
];

const ServicesOverview = () => {
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden">
      {/* Centered subtle glow behind cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:gap-20">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
           <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
            <div className="flex-1">
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Ydelser</p>
              <h2 className="font-display text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight">
                Alt du behøver
                <br />
                for at <Highlight delay={0.3} className="text-primary-foreground">skalere.</Highlight>
              </h2>
            </div>
            <div className="max-w-md w-full">
              <p className="text-primary-foreground/60 text-lg leading-relaxed mb-6">
                Vi dækker hele kæden fra kreativ strategi til performancedata, så du ikke skal koordinere mellem bureau, videograf og mediekøber.
              </p>
              <Button asChild variant="outline" className="rounded-xl group border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:border-primary">
                <Link to="/ydelser">
                  Se alle ydelser
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
           </div>
          </motion.div>

          {/* Liquid Glass Cards Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className="group p-8 lg:p-10 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-xl hover:bg-primary-foreground/10 hover:border-primary/30 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-default overflow-hidden relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {/* Liquid glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-500 border border-primary-foreground/10 group-hover:border-primary/40 shadow-sm">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                    <p className="text-primary-foreground/60 leading-relaxed text-lg">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
