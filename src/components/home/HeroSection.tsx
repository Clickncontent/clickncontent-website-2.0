"use client";
import Link from 'next/link';
;
import { Button } from "@/components/ui/button";
import { CalendlyButton } from "@/components/CalendlyButton";
import { ArrowRight, Play, Star, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { VIDEOS } from "@/lib/supabase";

const HeroSection = () => {
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const smallVideoRef = useRef<HTMLVideoElement>(null);
  const [isMainPlaying, setIsMainPlaying] = useState(true);
  const [isSmallPlaying, setIsSmallPlaying] = useState(false);
  const [isMainMuted, setIsMainMuted] = useState(true);

  const toggleMainVideo = () => {
    if (mainVideoRef.current) {
      if (isMainPlaying) {
        mainVideoRef.current.pause();
        setIsMainPlaying(false);
      } else {
        mainVideoRef.current.play();
        setIsMainPlaying(true);
      }
    }
  };

  const toggleSmallVideo = () => {
    if (smallVideoRef.current) {
      if (isSmallPlaying) {
        smallVideoRef.current.pause();
        setIsSmallPlaying(false);
      } else {
        smallVideoRef.current.play();
        setIsSmallPlaying(true);
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-[104px] pb-16">
      {/* Ambient glow effects spilling seamlessly into adjacent sections without rigid container bounds */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 py-16 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />
                ))}
              </div>
              <span className="text-primary-foreground/50 text-sm font-medium tracking-wide uppercase">
                Betroet af branchens førende brands
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-[2.75rem] sm:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-bold text-primary-foreground leading-[1.05] tracking-tight mb-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Video creatives
              <br />
              der{" "}
              <span className="relative inline-block">
                <span className="text-primary inline-block">
                  skalerer
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ originX: 0 }}
                />
              </span>{" "}
              din
              <br />
              paid social.
            </motion.h1>

            <motion.p
              className="text-lg lg:text-xl text-primary-foreground/60 max-w-lg mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Vi er jeres eksterne marketingafdeling — med speciale i video og betalte annoncer.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <CalendlyButton size="lg" className="text-base px-10 h-13 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                  Book et møde
                  <ArrowRight className="w-4 h-4 ml-1" />
                </CalendlyButton>
              <Button asChild variant="outline" size="lg" className="text-base px-8 h-13 rounded-xl border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link href="/cases">Se vores cases</Link>
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-primary-foreground/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {[
                { value: "200+", label: "Creatives leveret" },
                { value: "6.2x", label: "Gns. ROI" },
                { value: "40+", label: "Glade kunder" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl lg:text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-primary-foreground/40 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - floating video cards */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Main video card */}
              <div 
                className="relative z-20 aspect-[9/16] max-w-[280px] mx-auto rounded-2xl bg-card border border-primary-foreground/10 overflow-hidden shadow-2xl shadow-primary/10 cursor-pointer group"
                onClick={toggleMainVideo}
              >
                <video 
                  ref={mainVideoRef}
                  src={VIDEOS.transformerStory} 
                  autoPlay muted={isMainMuted} loop playsInline 
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (mainVideoRef.current) {
                      mainVideoRef.current.muted = !isMainMuted;
                      setIsMainMuted(!isMainMuted);
                      if (!isMainPlaying) {
                        mainVideoRef.current.play();
                        setIsMainPlaying(true);
                      }
                    }
                  }}
                  className="absolute top-3 right-3 z-30 p-2 rounded-full bg-background/30 backdrop-blur-md border border-white/10 hover:bg-background/50 transition-colors"
                  aria-label="Toggle mute"
                >
                  {isMainMuted ? (
                    <VolumeX className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-primary-foreground" />
                  )}
                </button>
                
                {!isMainPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm transition-all duration-300 z-20">
                    <div className="w-16 h-16 rounded-full bg-primary/40 backdrop-blur-sm flex items-center justify-center border border-primary/40 group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-primary-foreground fill-primary-foreground ml-1" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/80 to-transparent">
                  <p className="text-sm font-medium text-primary-foreground">UGC Campaign</p>
                  <p className="text-xs text-primary-foreground/60">Meta · 6.2x ROI</p>
                </div>
              </div>

              {/* Floating secondary card */}
              <motion.div
                className="absolute z-10 -left-12 top-1/3 w-[160px] aspect-[9/16] rounded-xl bg-card border border-primary-foreground/10 shadow-xl opacity-80 overflow-hidden cursor-pointer group"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                onClick={toggleSmallVideo}
              >
                <video 
                  ref={smallVideoRef}
                  src={VIDEOS.nadiaNadimNew} 
                  preload="auto"
                  loop playsInline 
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                
                {!isSmallPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm transition-all duration-300 z-20">
                    <div className="w-12 h-12 rounded-full bg-primary/40 backdrop-blur-sm flex items-center justify-center border border-primary/40 group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-1" />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Floating metric badge */}
              <motion.div
                className="absolute right-0 lg:right-4 z-20 top-16 bg-card rounded-xl p-3 shadow-xl border border-border"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
              >
                <p className="font-display text-base font-bold text-primary">End-to-end</p>
                <p className="text-xs text-muted-foreground">Produktion</p>
              </motion.div>

              {/* Floating metric badge bottom */}
              <motion.div
                className="absolute z-30 -left-8 bottom-16 bg-card rounded-xl p-3 shadow-xl border border-border"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
              >
                <p className="font-display text-lg font-bold text-primary">-42%</p>
                <p className="text-xs text-muted-foreground">CPA reduktion</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
