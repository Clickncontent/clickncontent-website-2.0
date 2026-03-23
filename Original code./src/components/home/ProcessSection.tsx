import { motion } from "framer-motion";
import { Lightbulb, Video, FlaskConical, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Strategi",
    description: "Vi analyserer jeres målgruppe, produkt og konkurrenter for at definere den kreative retning.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Produktion",
    description: "Vi producerer videoer med stærke hooks, storylines og CTA'er – klar til alle platforme.",
    icon: Video,
  },
  {
    number: "03",
    title: "Testing",
    description: "Vi leverer varianter og hjælper med at identificere de vindende creatives.",
    icon: FlaskConical,
  },
  {
    number: "04",
    title: "Optimering",
    description: "Vi analyserer performance data og itererer for konstant forbedring.",
    icon: BarChart3,
  },
];

const ProcessSection = () => {
  return (
    <section className="py-28 lg:py-36 bg-foreground relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Proces</p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-4">
            Sådan arbejder vi
          </h2>
          <p className="text-primary-foreground/50 text-lg max-w-lg mx-auto">
            En struktureret proces der sikrer creatives der performer.
          </p>
        </motion.div>

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:grid grid-cols-4 gap-0 items-start relative">
          {/* Connecting line behind cards */}
          <div className="absolute top-[72px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative z-10 flex flex-col items-center text-center px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
            >
              {/* Icon circle */}
              <div className="group cursor-default">
                <div className="w-36 h-36 rounded-2xl bg-card/5 border border-primary-foreground/10 backdrop-blur-sm flex flex-col items-center justify-center mb-6 hover:border-primary/40 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500">
                  <span className="font-display text-3xl font-bold text-primary/40 mb-1">{step.number}</span>
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-primary-foreground/45 leading-relaxed max-w-[200px] mx-auto">{step.description}</p>
              </div>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div className="absolute top-[72px] -right-3 z-20">
                  <ArrowRight className="w-5 h-5 text-primary/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/20 to-transparent" />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative flex gap-6 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {/* Timeline dot */}
                <div className="w-16 h-16 rounded-xl bg-card/5 border border-primary-foreground/10 flex items-center justify-center flex-shrink-0 relative z-10">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="pt-1">
                  <span className="font-display text-sm font-bold text-primary/50 tracking-wider">{step.number}</span>
                  <h3 className="font-display text-lg font-bold text-primary-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-primary-foreground/45 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
