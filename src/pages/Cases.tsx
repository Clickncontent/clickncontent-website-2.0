import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { TrendingUp, Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendlyButton } from "@/components/CalendlyButton";

const cases = [
  {
    client: "Nadim Aesthetics",
    category: "Skønhed & Æstetik",
    platform: "Organisk + Meta",
    description: "200.000 organiske visninger på 30 dage — 0 kr. i annoncering",
    metrics: [
      { label: "Visninger", value: "200K" },
      { label: "Dage", value: "30" },
      { label: "Annoncering", value: "0 kr." },
    ],
    color: "from-primary/20 to-accent",
  },
  {
    client: "Lumant",
    category: "B2B / Leads",
    platform: "Meta",
    description: "3x flere leads — lukkeraten på møder steg fra 25% til 50%",
    metrics: [
      { label: "Leads", value: "3x" },
      { label: "Lukkerate", value: "50%" },
      { label: "ROAS", value: "↑↑↑" },
    ],
    color: "from-accent to-primary/15",
  },
  {
    client: "Skønhedsklinik Aarhus",
    category: "Skønhed",
    platform: "Meta",
    description: "4x ROAS på Meta-annoncering",
    metrics: [
      { label: "ROAS", value: "4x" },
      { label: "Platform", value: "Meta" },
      { label: "CPA", value: "↓" },
    ],
    color: "from-primary/15 to-accent",
  },
  {
    client: "Ecohus",
    category: "Bolig & Ejendom",
    platform: "Meta",
    description: "68x ROI med videoer og datadrevne Meta-kampagner",
    metrics: [
      { label: "ROI", value: "68x" },
      { label: "Platform", value: "Meta" },
      { label: "Video", value: "✓" },
    ],
    color: "from-accent to-primary/20",
  },
  {
    client: "Dress for Success",
    category: "Mode & Livsstil",
    platform: "Meta",
    description: "Slog corona-rekord — 'Vi har aldrig haft noget, der har performet sådan her.'",
    metrics: [
      { label: "Rekord", value: "✓" },
      { label: "Platform", value: "Meta" },
      { label: "Salg", value: "↑↑" },
    ],
    color: "from-primary/20 to-accent",
  },
  {
    client: "Hejslet Begravelsesforretning",
    category: "Lokale services",
    platform: "Meta",
    description: "500 nye hjemmesidebesøgende på 2 dage",
    metrics: [
      { label: "Besøg", value: "500+" },
      { label: "Dage", value: "2" },
      { label: "Pris", value: "↓" },
    ],
    color: "from-accent to-primary/15",
  },
];

const Cases = () => {
  return (
    <Layout>
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="max-w-3xl mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Vores <span className="text-primary">cases</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Se hvordan vi har hjulpet virksomheder med at skalere deres paid social performance gennem stærke video creatives.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <motion.div
                key={c.client}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {/* Video preview */}
                <div className={`relative aspect-[9/16] max-h-64 bg-gradient-to-b ${c.color}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary fill-primary" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-medium bg-card/90 text-foreground px-2 py-1 rounded-full">{c.platform}</span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs font-medium text-primary mb-1">{c.category}</p>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{c.client}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{c.description}</p>

                  <div className="grid grid-cols-3 gap-2">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="text-center p-2 rounded-lg bg-accent/50">
                        <p className="font-display text-lg font-bold text-primary">{m.value}</p>
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Klar til at blive vores næste <span className="text-primary">succeshistorie?</span>
          </h2>
          <p className="text-foreground/70 text-lg mb-8 max-w-lg mx-auto">
            Lad os tale om, hvordan vi kan hjælpe dig med at skalere.
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

export default Cases;
