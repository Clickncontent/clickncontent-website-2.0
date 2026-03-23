import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Lightbulb, Video, FlaskConical, BarChart3, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Kreativ Strategi",
    subtitle: "Vi finder ud af hvad der virker – før vi producerer.",
    description: "Vi analyserer din målgruppe, dine konkurrenter og jeres eksisterende data for at udvikle en kreativ retning, der er bygget til performance. Ingen gætværk – kun datadrevet strategi.",
    features: [
      "Målgruppe- og konkurrentanalyse",
      "Kreativ retning og konceptudvikling",
      "Hook- og angle-frameworks",
      "Format- og platformstrategi",
    ],
  },
  {
    icon: Video,
    number: "02",
    title: "Videoproduktion",
    subtitle: "Professionelle creatives bygget til paid social.",
    description: "Vi producerer videoer i alle formater – fra rå UGC til polerede brand-videoer. Alt er skræddersyet til vertikale formater og optimeret til at stoppe scrollet.",
    features: [
      "UGC og creator-indhold",
      "Studio- og on-location produktion",
      "Redigering, grafik og lyddesign",
      "Tilpasset alle platforme og placeringer",
    ],
  },
  {
    icon: FlaskConical,
    number: "03",
    title: "Creative Testing",
    subtitle: "Vi tester systematisk for at finde vinderne.",
    description: "Vi leverer varianter af hooks, angles og formater, så I kan teste struktureret. Vi hjælper med at identificere hvad der performer – og hvorfor.",
    features: [
      "Hook- og angle-varianter",
      "A/B test-klare leverancer",
      "Format-iterationer",
      "Test-frameworks og anbefalinger",
    ],
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Performance Analyse",
    subtitle: "Vi analyserer data og optimerer løbende.",
    description: "Vi dykker ned i jeres creative data for at forstå hvad der driver resultater. Insights bruges til at informere næste runde af creatives – så performance stiger over tid.",
    features: [
      "Creative performance rapportering",
      "Winning element-analyse",
      "Anbefalinger til næste iteration",
      "Løbende optimering af creative output",
    ],
  },
];

const Ydelser = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-foreground relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Vores Ydelser</p>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-6">
              Fra strategi til
              <br />
              <span className="text-primary">performance.</span>
            </h1>
            <p className="text-lg text-primary-foreground/60 leading-relaxed max-w-lg">
              Vi håndterer hele den kreative proces – så du får creatives der performer. Vi producerer indhold, men styrer ikke jeres annonceringskonti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-0">
            {services.map((service, i) => (
              <motion.div
                key={service.number}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-16 first:pt-0 last:pb-0 border-b border-border last:border-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                {/* Number + Icon */}
                <div className="lg:col-span-1">
                  <span className="font-display text-5xl font-bold text-primary/15 group-hover:text-primary/30 transition-colors duration-500">
                    {service.number}
                  </span>
                </div>

                {/* Title + Description */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                      <service.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">{service.title}</h2>
                  </div>
                  <p className="font-medium text-foreground/80 mb-3">{service.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>

                {/* Features */}
                <div className="lg:col-span-5 lg:col-start-8">
                  <ul className="space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-2xl bg-accent/50 border border-border p-8 lg:p-10 text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Bemærk:</span> Vi producerer creatives og leverer creative analyse – men vi styrer ikke jeres annonceringskonti eller media buying. Vi samarbejder tæt med jeres interne team eller mediebureau.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Klar til at løfte jeres <span className="text-primary">creatives?</span>
            </h2>
            <p className="text-primary-foreground/60 text-lg mb-8 max-w-md mx-auto">
              Lad os tage en uforpligtende snak om jeres behov.
            </p>
            <Button asChild size="lg" className="text-base px-8 h-13 rounded-xl shadow-lg shadow-primary/25">
              <Link to="/kontakt">
                Book et møde
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Ydelser;
