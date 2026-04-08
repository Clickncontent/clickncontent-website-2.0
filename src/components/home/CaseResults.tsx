"use client";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Users, TrendingUp, Play, Pause, BarChart3, Zap, Calendar, CircleDollarSign, Target, CheckCircle2, Video } from "lucide-react";
import Link from 'next/link';
;
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/Highlight";
import { VIDEOS } from "@/lib/supabase";

const cases = [
  {
    client: "Nadim Aesthetics",
    industry: "Skønhed & Æstetik",
    description: "200.000 organiske visninger på 30 dage — 0 kr. i annoncering",
    image: "from-primary/30 via-primary/10 to-foreground/5",
    metrics: [
      { icon: Eye, value: "200K", label: "Visninger" },
      { icon: Calendar, value: "30", label: "Dage" },
      { icon: CircleDollarSign, value: "0 kr.", label: "Annoncering" },
    ],
  },
  {
    client: "Lumant",
    industry: "B2B / Leads",
    description: "3x flere leads — lukkeraten på møder steg fra 25% til 50%",
    video: VIDEOS.lumantTestimonial,
    image: "from-accent via-primary/15 to-foreground/5",
    metrics: [
      { icon: Users, value: "3x", label: "Leads" },
      { icon: Target, value: "50%", label: "Lukkerate" },
      { icon: TrendingUp, value: "↑↑↑", label: "ROAS" },
    ],
  },
  {
    client: "Hejslet Begravelsesforretning",
    industry: "Begravelse",
    description: "Højt engagement og markant stigning i kundehenvendelser via kreative videoer.",
    video: null,
    image: "from-primary/20 via-accent to-foreground/5",
    metrics: [
      { icon: Video, value: "15", label: "Videoer" },
      { icon: Zap, value: "Højt", label: "Engagement" },
      { icon: Users, value: "Fuld", label: "Kapacitet" },
    ],
  },
];

const VideoCard = ({ src, industry }: { src: string; industry: string }) => {
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
    <div className="relative aspect-video overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer group/vid"
        onClick={toggle}
      >
        {!isPlaying && <div className="absolute inset-0 bg-black/30" />}
        <div className={`relative z-10 w-14 h-14 rounded-full backdrop-blur-md flex items-center justify-center border transition-all duration-300 ${
          isPlaying
            ? "bg-black/0 border-white/0 opacity-0 group-hover/vid:opacity-100 group-hover/vid:bg-black/40 group-hover/vid:border-white/30"
            : "bg-primary-foreground/15 border-primary-foreground/30 hover:bg-primary/30 hover:border-primary/50"
        }`}>
          {isPlaying
            ? <Pause className="w-5 h-5 text-white fill-white" />
            : <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          }
        </div>
      </div>
      <div className="absolute top-4 left-4 z-20">
        <span className="text-[11px] font-semibold tracking-wider uppercase bg-foreground/60 backdrop-blur-md text-primary-foreground/80 px-3 py-1 rounded-full">
          {industry}
        </span>
      </div>
    </div>
  );
};

const CaseResults = () => {
  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-primary text-base lg:text-lg font-semibold tracking-widest uppercase mb-3"><Highlight delay={0.2} className="text-primary-foreground">Cases</Highlight></p>
            <h2 className="font-display text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              Resultater der
              <br />
              taler for sig selv.
            </h2>
          </div>
          <Button asChild variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground self-start sm:self-auto">
            <Link href="/cases">
              Alle cases
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.client}
              className={`glass-card overflow-hidden group transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 ${
                c.client === "Lumant" ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/10" : ""
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              {/* Video preview area */}
              {c.video ? (
                <VideoCard src={c.video} industry={c.industry} />
              ) : (
                <div className={`relative aspect-video bg-gradient-to-b ${c.image} overflow-hidden`}>
                  <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary-foreground/10 backdrop-blur-md flex items-center justify-center border border-primary-foreground/20 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500">
                      <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-0.5 group-hover:text-primary group-hover:fill-primary transition-colors duration-500" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-semibold tracking-wider uppercase bg-foreground/60 backdrop-blur-md text-primary-foreground/80 px-3 py-1 rounded-full">
                      {c.industry}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Client logo placeholder */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 border border-primary-foreground/10 flex items-center justify-center">
                    <span className="font-display text-xs font-bold text-primary">{c.client[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-primary-foreground tracking-wide">{c.client}</h3>
                  </div>
                </div>

                <p className="text-sm text-primary-foreground/50 leading-relaxed mb-6">{c.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {c.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="text-center p-3 rounded-xl bg-primary-foreground/[0.04] border border-primary-foreground/[0.06] group-hover:border-primary/20 transition-colors duration-500"
                    >
                      <m.icon className="w-4 h-4 text-primary mx-auto mb-1.5 opacity-70" />
                      <p className="font-display text-xl font-bold text-primary-foreground">{m.value}</p>
                      <p className="text-[11px] text-primary-foreground/40 mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover glow line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseResults;
