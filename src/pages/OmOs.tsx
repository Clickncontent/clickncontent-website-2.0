import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendlyButton } from "@/components/CalendlyButton";
import { ArrowRight } from "lucide-react";
import TeamSection from "@/components/home/TeamSection";
import { Highlight } from "@/components/Highlight";

const values = [
  { icon: Target, title: "Resultatdrevet", description: "Alt vi laver måles på performance. Vi optimerer for resultater, ikke likes." },
  { icon: Heart, title: "Kreativ passion", description: "Vi brænder for at skabe indhold, der skiller sig ud i feedet." },
  { icon: Zap, title: "Hurtig eksekvering", description: "Fra idé til færdigt creative – vi leverer hurtigt uden at gå på kompromis." },
  { icon: Users, title: "Ægte partnerskab", description: "Vi ser os selv som en forlængelse af dit team, ikke en leverandør." },
];

const OmOs = () => {
  return (
    <Layout>
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Om <Highlight delay={0.2} className="text-primary-foreground">ClicknContent</Highlight>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Vi er et kreativt bureau med én mission: at skabe video creatives, der performer på paid social. Vi kombinerer kreativitet med data for at levere annoncer, der skalerer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Vores <span className="text-primary">værdier</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="p-6 rounded-xl bg-card border border-border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <TeamSection />

      {/* CTA */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Lad os arbejde <span className="text-primary">sammen</span>
          </h2>
          <p className="text-foreground/70 text-lg mb-8 max-w-lg mx-auto">
            Vi er altid klar til en snak om, hvordan vi kan hjælpe.
          </p>
          <CalendlyButton size="lg" className="text-base px-8 h-12">
            Book et møde
            <ArrowRight className="w-4 h-4 ml-1" />
          </CalendlyButton>
        </div>
      </section>
    </Layout>
  );
};

export default OmOs;
