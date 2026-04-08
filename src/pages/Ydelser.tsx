import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Lightbulb, Video, FlaskConical, BarChart3, ArrowRight, CheckCircle, Play, Infinity as InfinityIcon, Linkedin, Youtube, Users, Aperture, MessageSquare, Share2, Heart, Camera, Film, Sparkles, MonitorPlay, Globe, Link2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendlyButton } from "@/components/CalendlyButton";
import { useRef, useState } from "react";
import { VIDEOS } from "@/lib/supabase";

const contentFormats = [
  { icon: InfinityIcon, title: "Meta Ads" },
  { icon: Linkedin, title: "LinkedIn Ads" },
  { icon: Youtube, title: "Youtube Ads" },
  { icon: Users, title: "User Generated Content" },
  { icon: Video, title: "Brand Video" },
  { icon: Globe, title: "Hjemmeside" },
  { icon: Link2, title: "Linkbuilding" },
  { icon: Zap, title: "Automations" },
  { icon: Aperture, title: "Dronefilm" },
  { icon: MessageSquare, title: "Talking Head Videoer" },
  { icon: Share2, title: "Organisk SoMe Content" },
  { icon: Heart, title: "Testimonials" },
  { icon: Camera, title: "Stilbilleder" },
  { icon: Film, title: "GIF Animationer" },
  { icon: Sparkles, title: "Livstilsbilleder" },
  { icon: MonitorPlay, title: "Professionelt Studie" },
];

const services = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Kreativ Strategi",
    subtitle: "Vi finder ud af hvad der virker – før vi producerer.",
    description: "Vi analyserer din målgruppe, dine konkurrenter og jeres eksisterende data for at udvikle en kreativ retning, der er bygget til performance. Så I ved præcis hvad der skal produceres og hvorfor.",
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
    description: "Vi producerer videoer i volume, fra rå UGC-stil til poleret brand content. Alt er bygget til vertikale formater og designet til at stoppe scrollet og drive handling.",
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
    description: "Vi leverer varianter af hooks, angles og formater, så budgettet hurtigt finder hen til de creatives der konverterer. Vi identificerer hvad der performer og hvorfor, så næste runde starter skarpere.",
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
    subtitle: "Vi omsætter data til bedre creatives.",
    description: "Vi dykker ned i hook rate, hold rate og konverteringsdata for at forstå præcis hvad der driver resultater. Hver indsigt bliver til konkrete ændringer i næste runde creatives.",
    features: [
      "Creative performance rapportering",
      "Winning element-analyse",
      "Anbefalinger til næste iteration",
      "Løbende optimering af creative output",
    ],
  },
];

const Ydelser = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Videoproduktion & Content Strategi til Meta Ads | ClicknContent</title>
        <meta name="description" content="Vi producerer video, tester creatives og analyserer performance. Dit content bureau til Meta og TikTok. Se vores ydelser." />
        <meta property="og:title" content="Videoproduktion & Content Strategi til Meta Ads | ClicknContent" />
        <meta property="og:description" content="Vi producerer video, tester creatives og analyserer performance. Dit content bureau til Meta og TikTok. Se vores ydelser." />
      </Helmet>
      {/* Hero */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Vores Ydelser</p>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
                Fra strategi til
                <br />
                <span className="text-primary">performance.</span>
              </h1>
              <p className="text-lg text-foreground/60 leading-relaxed max-w-lg mb-8">
                Vi håndterer hele den kreative proces, fra strategi og scripting til produktion og optimering, så I får et konstant flow af creatives der konverterer. Har I brug for det, kan vi også stå for jeres annoncering.
              </p>
            </motion.div>

            {/* Right Video Placeholder */}
            <div className="lg:col-span-6 relative">
              <motion.div
                className="relative aspect-video w-full rounded-2xl bg-card border border-primary-foreground/10 overflow-hidden shadow-2xl shadow-primary/10 cursor-pointer group"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                onClick={toggleVideo}
              >
                <video 
                  ref={videoRef}
                  src={VIDEOS.balvid} 
                  autoPlay loop muted playsInline 
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm transition-all duration-300 z-20">
                    <div className="w-16 h-16 rounded-full bg-primary/40 backdrop-blur-sm flex items-center justify-center border border-primary/40 group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-primary-foreground fill-primary-foreground ml-1" />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Floating metric badge 1 */}
              <motion.div
                className="absolute -right-4 top-12 bg-card rounded-xl p-3 shadow-xl border border-border z-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{ 
                  opacity: { duration: 0.5, delay: 0.6 },
                  scale: { duration: 0.5, delay: 0.6 },
                  y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.6 }
                }}
              >
                <p className="font-display text-lg font-bold text-primary">End-to-end</p>
                <p className="text-xs text-muted-foreground">Produktion</p>
              </motion.div>

              {/* Floating metric badge 2 */}
              <motion.div
                className="absolute -left-6 bottom-16 bg-card rounded-xl p-3 shadow-xl border border-border z-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: [0, 6, 0] }}
                transition={{ 
                  opacity: { duration: 0.5, delay: 0.8 },
                  scale: { duration: 0.5, delay: 0.8 },
                  y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.8 }
                }}
              >
                <p className="font-display text-lg font-bold text-primary">Skalerbar</p>
                <p className="text-xs text-muted-foreground">Performance</p>
              </motion.div>
            </div>
          </div>
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
              <span className="font-semibold text-foreground">Bemærk:</span> Vi gør hvad vi er bedst til: video creatives og creative analyse på højeste niveau. Vi samarbejder tæt med jeres marketingteam eller mediebureau, så alt rammer jeres brand voice præcist. Har I ikke et team på plads, kan vi også stå for jeres annoncering.
            </p>
          </div>
        </div>
      </section>

      {/* Formats Grid */}
      <section className="pb-20 lg:pb-28 relative z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Vi tilbyder følgende <span className="text-primary">content formater</span>
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
              Fra lynhurtige TikToks til polerede brand-fortællinger. Vi leverer præcis det format, din strategi kræver.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {contentFormats.map((format, i) => (
              <motion.div
                key={format.title}
                className="group flex items-center gap-4 px-5 py-3.5 rounded-[16px] border border-border bg-card/40 backdrop-blur-sm hover:bg-card/80 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/10 flex flex-shrink-0 items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <format.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-medium text-base text-foreground group-hover:text-primary transition-colors">{format.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-16 pb-24 lg:pt-20 lg:pb-32 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Klar til at løfte jeres <span className="text-primary">creatives?</span>
            </h2>
            <p className="text-foreground/60 text-lg mb-8 max-w-md mx-auto">
              Fortæl os om jeres mål, så viser vi hvordan vi kan hjælpe.
            </p>
            <CalendlyButton size="lg" className="text-base px-8 h-13 rounded-xl shadow-lg shadow-primary/25">
              Book et møde
              <ArrowRight className="w-4 h-4 ml-1" />
            </CalendlyButton>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Ydelser;
