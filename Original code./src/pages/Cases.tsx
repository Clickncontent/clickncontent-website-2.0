import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { TrendingUp, Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const cases = [
  {
    client: "Fashion Brand X",
    category: "Mode & Livsstil",
    platform: "Meta & Instagram",
    description: "Skalerbare UGC-videoannoncer der øgede ROAS med 68% og sænkede CPA med 42%.",
    metrics: [
      { label: "ROAS", value: "4.2x" },
      { label: "CTR", value: "3.8%" },
      { label: "CPA", value: "-42%" },
    ],
    color: "from-primary/20 to-accent",
  },
  {
    client: "SaaS Startup Y",
    category: "Software & Tech",
    platform: "Meta & LinkedIn",
    description: "Product demo-videoer og founder stories der drev leads med 85% højere ROAS.",
    metrics: [
      { label: "ROAS", value: "5.1x" },
      { label: "CTR", value: "4.2%" },
      { label: "CPA", value: "-38%" },
    ],
    color: "from-accent to-primary/15",
  },
  {
    client: "E-commerce Brand Z",
    category: "E-commerce",
    platform: "TikTok & Instagram",
    description: "Scroll-stopping creatives der tredobblede CTR og halverede CPA på tværs af platforme.",
    metrics: [
      { label: "ROAS", value: "3.8x" },
      { label: "CTR", value: "5.1%" },
      { label: "CPA", value: "-51%" },
    ],
    color: "from-primary/15 to-accent",
  },
  {
    client: "Fitness App Q",
    category: "Sundhed & Fitness",
    platform: "Instagram & TikTok",
    description: "Testimonial-videoer og transformation-indhold der skalerede brugeranskaffelsen markant.",
    metrics: [
      { label: "ROAS", value: "3.5x" },
      { label: "CTR", value: "4.8%" },
      { label: "CPA", value: "-35%" },
    ],
    color: "from-accent to-primary/20",
  },
  {
    client: "DTC Beauty Brand",
    category: "Skønhed",
    platform: "Meta & TikTok",
    description: "Before/after og unboxing-videoer der løftede konverteringsraten med 90%.",
    metrics: [
      { label: "ROAS", value: "4.7x" },
      { label: "CTR", value: "5.3%" },
      { label: "CPA", value: "-45%" },
    ],
    color: "from-primary/20 to-accent",
  },
  {
    client: "Food Delivery W",
    category: "Fødevarer",
    platform: "Meta & Instagram",
    description: "Appetitlige produktvideoer og UGC der fordobled bestillinger via paid social.",
    metrics: [
      { label: "ROAS", value: "3.9x" },
      { label: "CTR", value: "4.1%" },
      { label: "CPA", value: "-33%" },
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
      <section className="py-20 lg:py-28 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Klar til at blive vores næste <span className="text-primary">succeshistorie?</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-lg mx-auto">
            Lad os tale om, hvordan vi kan hjælpe dig med at skalere.
          </p>
          <Button asChild size="lg" className="text-base px-8 h-12">
            <Link to="/kontakt">
              Book et møde
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Cases;
