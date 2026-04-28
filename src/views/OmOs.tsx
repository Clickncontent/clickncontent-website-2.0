"use client";


import { motion } from "framer-motion";
import { Target, Heart, Zap, Users } from "lucide-react";
import Link from 'next/link';
;
import { Button } from "@/components/ui/button";
import { CalendlyButton } from "@/components/CalendlyButton";
import { ArrowRight } from "lucide-react";
import dynamic from 'next/dynamic';

const TeamSection = dynamic(() => import("@/components/home/TeamSection"));
const BehindTheScenes = dynamic(() => import("@/components/home/BehindTheScenes"));
import { Highlight } from "@/components/Highlight";

const values = [
  { icon: Target, title: "Resultatdrevet", description: "Alt vi laver måles på performance. Vi optimerer for resultater, ikke likes." },
  { icon: Heart, title: "Kreativ passion", description: "Vi nørder kreativt håndværk. Fordi det er forskellen på en video folk scroller forbi og en der stopper dem." },
  { icon: Zap, title: "Hurtig eksekvering", description: "Fra idé til færdigt creative på dage, ikke uger. Tempo er en del af vores DNA." },
  { icon: Users, title: "Ægte partnerskab", description: "Vi ser os selv som en forlængelse af dit team, ikke en leverandør." },
];

const OmOs = () => {
  return (
    <>
      
      {/* Behind the scenes */}
      <div className="pt-28 lg:pt-36">
        <BehindTheScenes />
      </div>

      {/* Team */}
      <TeamSection />

      {/* Values */}
      <section className="pb-16 lg:pb-20">
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
    </>
  );
};

export default OmOs;
