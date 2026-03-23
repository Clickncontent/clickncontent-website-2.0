import { motion } from "framer-motion";
import { Lightbulb, Video, FlaskConical, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Lightbulb,
    title: "Kreativ Strategi",
    description: "Vi analyserer målgruppe og konkurrenter for at udvikle en datadrevet kreativ retning.",
  },
  {
    icon: Video,
    title: "Videoproduktion",
    description: "Professionelle videoer i alle formater – fra rå UGC til polerede brand-videoer.",
  },
  {
    icon: FlaskConical,
    title: "Creative Testing",
    description: "Systematisk test af hooks, angles og formater for at finde de vindende creatives.",
  },
  {
    icon: BarChart3,
    title: "Performance Analyse",
    description: "Dyb analyse af creative data der driver løbende optimering og bedre resultater.",
  },
];

const ServicesOverview = () => {
  return (
    <section className="py-28 lg:py-36 bg-card relative overflow-hidden">
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left headline */}
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Ydelser</p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Alt du behøver
              <br />
              for at skalere.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-sm">
              Fra strategi til analyse – vi håndterer hele den kreative proces, så du kan fokusere på vækst.
            </p>
            <Button asChild variant="outline" className="rounded-lg group">
              <Link to="/ydelser">
                Se alle ydelser
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Right cards */}
          <div className="lg:col-span-7 space-y-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className="group p-8 rounded-2xl border border-border bg-background/60 hover:bg-background hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors duration-500">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
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
