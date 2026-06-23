"use client";
import { useEffect, useState, useRef } from "react";

import { motion } from "framer-motion";
import { Play, Pause, ArrowRight } from "lucide-react";
import Link from 'next/link';
;
import { CalendlyButton } from "@/components/CalendlyButton";
import Testimonials from "@/components/home/Testimonials";
import { VIDEOS, getMediaUrl } from "@/lib/supabase";

// Click-to-play video for case cards
const CaseVideoCard = ({ src, color, platform, preload = "none" }: { src: string; color: string; platform: string, preload?: "auto" | "metadata" | "none" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="relative flex-shrink-0 h-full overflow-hidden bg-black cursor-pointer group/vid"
      style={{ width: "180px" }}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={`${src}#t=0.1`}
        loop
        playsInline
        preload={preload === "none" ? "metadata" : preload}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dim overlay when paused */}
      {!isPlaying && <div className="absolute inset-0 bg-black/35" />}
      {/* Play/Pause button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
        isPlaying ? "opacity-0 group-hover/vid:opacity-100" : "opacity-100"
      }`}>
        <div className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center border transition-all duration-200 ${
          isPlaying
            ? "bg-black/40 border-white/30"
            : "bg-primary-foreground/15 border-primary-foreground/30"
        }`}>
          {isPlaying
            ? <Pause className="w-4 h-4 text-white fill-white" />
            : <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          }
        </div>
      </div>
      {/* Platform tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-xs font-medium bg-card/90 text-foreground px-2 py-1 rounded-full">
          {platform}
        </span>
      </div>
    </div>
  );
};

const cases = [
  {
    client: "Hejslet Begravelsesforretning",
    slug: "hejslet-begravelsesforretning",
    category: "Lokale services",
    platform: "Meta",
    description: "500 nye hjemmesidebesøgende på 2 dage",
    metrics: [
      { label: "Besøg", value: "500+" },
      { label: "Dage", value: "2" },
      { label: "Pris", value: "↓" },
    ],
    color: "from-accent to-primary/15",
    imageColor: "from-primary/20 via-accent/50 to-primary/20",
    video: VIDEOS.hejslet,
    image: getMediaUrl("images", "dsc01262.jpg"),
  },
  {
    client: "Lumant",
    slug: "lumant",
    category: "B2B / Leads",
    platform: "Meta",
    description: "3x flere leads — lukkeraten på møder steg fra 25% til 50%",
    metrics: [
      { label: "Leads", value: "3x" },
      { label: "Lukkerate", value: "50%" },
      { label: "ROAS", value: "↑↑↑" },
    ],
    color: "from-accent to-primary/15",
    imageColor: "from-accent/60 via-primary/30 to-primary/10",
    video: VIDEOS.lumantThumbnail,
    image: getMediaUrl("images", "lumant.webp"),
  },
  {
    client: "Skønhedsklinik Aarhus",
    slug: "skoenhedsklinik-aarhus",
    category: "Skønhed",
    platform: "Meta",
    description: "4x ROAS på Meta-annoncering",
    metrics: [
      { label: "ROAS", value: "4x" },
      { label: "Platform", value: "Meta" },
      { label: "CPA", value: "↓" },
    ],
    color: "from-primary/15 to-accent",
    imageColor: "from-primary/30 via-accent/40 to-primary/10",
    video: VIDEOS.skonhedsklinikThumb,
    image: getMediaUrl("images", "skonhedsklinik.png"),
  },
  {
    client: "Ecohus",
    slug: "ecohus",
    category: "Bolig & Ejendom",
    platform: "Meta",
    description: "68x ROI med videoer og datadrevne Meta-kampagner",
    metrics: [
      { label: "ROI", value: "68x" },
      { label: "Platform", value: "Meta" },
      { label: "Video", value: "✓" },
    ],
    color: "from-accent to-primary/20",
    imageColor: "from-accent/50 via-primary/20 to-accent/30",
    video: null,
    image: "/ecohus-case.webp",
  },
  {
    client: "Dress for Success",
    slug: "dress-for-success",
    category: "Mode & Livsstil",
    platform: "Meta",
    description: "Slog corona-rekord — 'Vi har aldrig haft noget, der har performet sådan her.'",
    metrics: [
      { label: "Rekord", value: "✓" },
      { label: "Platform", value: "Meta" },
      { label: "Salg", value: "↑↑" },
    ],
    color: "from-primary/20 to-accent",
    imageColor: "from-primary/35 via-accent/40 to-primary/15",
    video: VIDEOS.dressforsuccess,
    image: getMediaUrl("images", "dressforsuccess.jpg"),
  },
  {
    client: "Nadim Aesthetics",
    slug: "nadim-aesthetics",
    category: "Skønhed & Æstetik",
    platform: "Organisk",
    description: "200.000 organiske visninger på 30 dage — 0 kr. i annoncering",
    metrics: [
      { label: "Visninger", value: "200K" },
      { label: "Dage", value: "30" },
      { label: "Annoncering", value: "0 kr." },
    ],
    color: "from-primary/20 to-accent",
    imageColor: "from-primary/40 via-primary/20 to-accent/60",
    video: VIDEOS.nadimThumbnail,
    image: getMediaUrl("images", "nadim-aesthetics.jpeg"),
  },
];


const Cases = () => {
  const [activeSection, setActiveSection] = useState("cases");

  useEffect(() => {
    const handleScroll = () => {
      const testimonialsEl = document.getElementById("testimonials");
      if (testimonialsEl) {
        const testRect = testimonialsEl.getBoundingClientRect();
        if (testRect.top < 400) {
          setActiveSection("testimonials");
        } else {
          setActiveSection("cases");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="pt-24 pb-20 lg:pt-28 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-2xl lg:text-3xl font-medium text-foreground leading-relaxed">
              Se hvordan vi har hjulpet virksomheder med at skalere deres{" "}
              <span className="text-primary font-bold">paid social performance</span> gennem stærke{" "}
              <span className="text-primary font-bold">video creatives</span>.
            </h1>
          </motion.div>

          {/* Toggle Buttons */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => scrollToSection("cases")}
              className={`px-6 py-2 rounded-full font-display font-medium text-base transition-all duration-300 border ${
                activeSection === "cases"
                  ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-background/40 border-border text-foreground hover:bg-background/80 backdrop-blur-md"
              }`}
            >
              Cases
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className={`px-6 py-2 rounded-full font-display font-medium text-base transition-all duration-300 border ${
                activeSection === "testimonials"
                  ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-background/40 border-border text-foreground hover:bg-background/80 backdrop-blur-md"
              }`}
            >
              Udtalelser
            </button>
          </div>

          {/* Cases grid — 2 columns */}
          <div id="cases" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <motion.div
                key={c.client}
                className="group rounded-xl border border-border bg-card overflow-hidden flex flex-col hover:shadow-lg transition-shadow relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {/* Preview: 9:16 video left + image fill right */}
                <div className="flex h-80 overflow-hidden">

                  {/* 9:16 portrait video column — h-64=256px → width=144px */}
                  {c.video ? (
                    <CaseVideoCard src={c.video} color={c.color} platform={c.platform} preload={i < 3 ? "auto" : "metadata"} />
                  ) : (
                    <div
                      className={`relative flex-shrink-0 h-full overflow-hidden bg-gradient-to-b ${c.color}`}
                      style={{ width: "180px" }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Play className="w-4 h-4 text-primary fill-primary" />
                        </div>
                      </div>
                      <div className="absolute top-3 left-3 z-10">
                        <span className="text-xs font-medium bg-card/90 text-foreground px-2 py-1 rounded-full">
                          {c.platform}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Image fill — right side */}
                  {c.image ? (
                    <div className="flex-1 h-full overflow-hidden relative">
                      <img
                        src={c.image}
                        alt={c.client}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading={i < 3 ? "eager" : "lazy"}
                        fetchPriority={i < 3 ? "high" : "auto"}
                        decoding="async"
                      />
                      {/* subtle dark vignette */}
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
                    </div>
                  ) : (
                    <div
                      className={`flex-1 h-full bg-gradient-to-br ${c.imageColor} relative overflow-hidden`}
                    >
                      <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                          backgroundSize: "18px 18px",
                        }}
                      />
                      <div className="absolute inset-0 flex items-end p-5">
                        <span className="font-display text-5xl font-bold text-white/10 select-none leading-none">
                          {c.client[0]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card content */}
                <Link href={`/cases/${c.slug}`} className="block p-6 flex-1 cursor-pointer group/link hover:bg-white/[0.02] transition-colors relative z-20 flex flex-col">
                  <p className="text-xs font-medium text-primary mb-1">{c.category}</p>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover/link:text-primary transition-colors">{c.client}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{c.description}</p>

                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="text-center p-2 rounded-lg bg-accent/50 border border-transparent group-hover/link:border-primary/20 transition-all duration-300">
                        <p className="font-display text-lg font-bold text-primary">{m.value}</p>
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-medium group-hover/link:bg-primary group-hover/link:text-primary-foreground transition-all duration-300"
                  >
                    Læs case <ArrowRight className="w-3.5 h-3.5 group-hover/link:-rotate-45 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <div id="testimonials" className="scroll-mt-24">
        <Testimonials />
      </div>

      {/* CTA */}
      <section className="pt-20 pb-24 lg:pt-28 lg:pb-32">
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
    </>
  );
};

export default Cases;
