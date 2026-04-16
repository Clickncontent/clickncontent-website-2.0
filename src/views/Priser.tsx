"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendlyButton } from "@/components/CalendlyButton";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Video,
  Image,
  Layers,
  Star,
  Zap,
  Trophy,
  FileText,
  User,
  BarChart2,
  Target,
  Globe,
  TrendingUp,
  Link2,
  Monitor,
  ChevronRight,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { useState, useMemo, useRef, MouseEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// PRICING DATA
// ─────────────────────────────────────────────────────────────

const PRICE_PER_AD_VIDEO = 2500;
const PRICE_PER_ORGANIC_VIDEO = 1500;
const PRICE_PER_IMAGE = 200;

const contentTypes = [
  {
    id: "paid",
    icon: Video,
    label: "Paid videoer",
    description: "Annoncevideoer til Meta, TikTok og Google Ads.",
  },
  {
    id: "organic",
    icon: TrendingUp,
    label: "Organiske videoer",
    description: "Organisk content til sociale medier og brand.",
  },
  {
    id: "both",
    icon: Layers,
    label: "Begge dele",
    description: "En komplet mix af paid og organiske videoer.",
  },
];

const ambitions = [
  {
    id: "starter",
    icon: Star,
    label: "Starter",
    description: "Perfekt til virksomheder der vil i gang med content.",
    videoCount: { ad: 2, organic: 3 },
    imageCount: 8,
  },
  {
    id: "growth",
    icon: Zap,
    label: "Growth",
    description: "Øg synlighed og konverteringer med mere indhold.",
    videoCount: { ad: 4, organic: 5 },
    imageCount: 10,
    popular: true,
  },
  {
    id: "scale",
    icon: Trophy,
    label: "Scale",
    description: "Fuld tilstedeværelse og maksimal vækst online.",
    videoCount: { ad: 8, organic: 7 },
    imageCount: 20,
  },
];

const videoVolumes = [
  {
    id: "small",
    icon: "📹",
    label: "Lille (1–5)",
    description: "Perfekt til månedlig contentstrategi.",
    adVideos: 2,
    organicVideos: 3,
  },
  {
    id: "medium",
    icon: "🎬",
    label: "Mellem (6–10)",
    description: "Løbende aktivitet på tværs af platforme.",
    adVideos: 4,
    organicVideos: 6,
    popular: true,
  },
  {
    id: "large",
    icon: "🚀",
    label: "Stor (10+)",
    description: "Maksimal rækkevidde og brandsynlighed.",
    adVideos: 8,
    organicVideos: 8,
  },
];

const imageCountOptions = [5, 10, 20, 30];

const addOnOptions = [
  { id: "scripts", label: "Scripts", price: 1000, icon: FileText, description: "Kreative manuskripter til dine videoer" },
  { id: "model", label: "Model", price: 3000, icon: User, description: "Professionel skuespiller / model" },
  { id: "content-strategi", label: "Content-strategi", price: 3000, icon: BarChart2, description: "Skræddersyet strategi for dit brand" },
  { id: "marketing-strategi", label: "Marketing-strategi", price: 5000, icon: Target, description: "Komplet digital marketingplan" },
  { id: "data-analyse", label: "Dataanalyse & rapportering", price: 5000, icon: TrendingUp, description: "Tracking, insights og optimering" },
  { id: "meta-ads", label: "Meta Ads håndtering", price: 10000, icon: Globe, description: "Fuld annoncehåndtering på Meta" },
  { id: "linkbuilding", label: "Linkbuilding", price: 5000, icon: Link2, description: "SEO-styrkende linkbuilding" },
  { id: "hjemmeside", label: "Hjemmeside", price: 12000, icon: Monitor, description: "Professionel hjemmeside" },
];

const packages = [
  { name: "Starter", price: "15.250", period: "1–3 måned", features: ["5 videoer", "Scripting", "Workshop og kreativ retning", "Content strategi"], highlighted: false },
  { name: "Growth", price: "27.000", period: "1–3 måned", features: ["9 videoer", "Scripting", "Workshop og kreativ retning", "Content strategi", "Marketing strategi", "Løbende optimeringsanbefalinger"], highlighted: true, badge: "Mest populær" },
  { name: "Scale", price: "39.500", period: "1–3 måned", features: ["15 videoer", "Scripting", "Workshop og kreativ retning", "Content og marketing strategi", "Løbende optimeringsanbefalinger", "Dedikeret kontaktperson og fast sparring"], highlighted: false },
];

const formatDKK = (n: number) => n.toLocaleString("da-DK") + " DKK";

// ─────────────────────────────────────────────────────────────
// FLOATING CARD (cursor 3D tilt)
// ─────────────────────────────────────────────────────────────

interface FloatingCardProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  popular?: boolean;
  className?: string;
}

function FloatingCard({ selected, onClick, children, popular, className }: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-80, 80], [12, -12]);
  const rotateY = useTransform(x, [-80, 80], [-12, 12]);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d", perspective: 800 }}
      whileHover={{ scale: 1.04, z: 10 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative cursor-pointer rounded-2xl p-6 border-2 transition-colors duration-300",
        "flex flex-col items-center text-center gap-3 select-none",
        selected
          ? "border-[hsl(207,82%,55%)] bg-[hsl(207,82%,55%)]/10 shadow-[0_0_32px_rgba(49,149,220,0.25)]"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
        className
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-[hsl(207,82%,55%)] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
            <Sparkles className="w-2.5 h-2.5" /> Mest populær
          </span>
        </div>
      )}
      {selected && (
        <motion.div
          className="absolute top-3 right-3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <div className="w-5 h-5 rounded-full bg-[hsl(207,82%,55%)] flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      )}
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP INDICATOR
// ─────────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "h-1 rounded-full",
            i <= current ? "bg-[hsl(207,82%,55%)]" : "bg-white/15"
          )}
          animate={{ width: i === current ? 32 : i < current ? 20 : 12 }}
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SLIDER FIELD
// ─────────────────────────────────────────────────────────────

function SliderField({
  label,
  unit,
  price,
  sliderValue,
  onChange,
  max,
}: {
  label: string;
  unit: string;
  price: string;
  sliderValue: number[];
  onChange: (v: number[]) => void;
  max: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-white/80">{label}</span>
        <div className="text-right">
          <span className="text-sm font-bold text-white">{unit}</span>
          <span className="text-xs text-white/40 ml-2">({price})</span>
        </div>
      </div>
      <Slider
        value={sliderValue}
        onValueChange={onChange}
        min={0}
        max={max}
        step={1}
        className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-primary [&_[role=slider]]:bg-[hsl(222,47%,10%)] [&_[role=slider]]:shadow-md [&_[role=slider]]:transition-shadow [&_[role=slider]]:hover:shadow-lg [&_[role=slider]]:hover:shadow-primary/30 [&_.bg-primary]:bg-primary"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function Priser() {
  const [step, setStep] = useState(0);
  const [contentType, setContentType] = useState<string | null>(null);
  const [ambition, setAmbition] = useState<string | null>(null);
  const [videoVolume, setVideoVolume] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  // Images add-on (selected in add-ons step)
  const [imagesEnabled, setImagesEnabled] = useState(false);
  const [imageCount, setImageCount] = useState(10);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [priceRevealed, setPriceRevealed] = useState(false);
  const [direction, setDirection] = useState(1);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fine-tune sliders (initialized when price is revealed)
  const [showFineTune, setShowFineTune] = useState(false);
  const [ftAdVideos, setFtAdVideos] = useState([3]);
  const [ftOrganicVideos, setFtOrganicVideos] = useState([2]);
  const [ftImages, setFtImages] = useState([0]);

  const totalSteps = 5;

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  // Base estimated price from step selections
  const baseEstimatedPrice = useMemo(() => {
    const vol = videoVolumes.find((v) => v.id === videoVolume);
    const amb = ambitions.find((a) => a.id === ambition);

    // Paid = ad videos, Organic = organic videos, Both = mix
    let adVideos = 0;
    let organicVideos = 0;
    if (contentType === "paid") {
      adVideos = vol?.adVideos ?? amb?.videoCount.ad ?? 3;
    } else if (contentType === "organic") {
      organicVideos = vol?.organicVideos ?? amb?.videoCount.organic ?? 3;
    } else {
      // both
      adVideos = vol?.adVideos ?? amb?.videoCount.ad ?? 3;
      organicVideos = vol?.organicVideos ?? amb?.videoCount.organic ?? 2;
    }

    const images = imagesEnabled ? imageCount : 0;

    return { adVideos, organicVideos, images };
  }, [contentType, ambition, videoVolume, imagesEnabled, imageCount]);

  const addOnTotal = useMemo(() =>
    addOnOptions
      .filter((a) => selectedAddOns.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0),
    [selectedAddOns]
  );

  // Fine-tuned total (used after reveal)
  const fineTuneTotal = useMemo(() =>
    ftAdVideos[0] * PRICE_PER_AD_VIDEO +
    ftOrganicVideos[0] * PRICE_PER_ORGANIC_VIDEO +
    ftImages[0] * PRICE_PER_IMAGE +
    addOnTotal,
    [ftAdVideos, ftOrganicVideos, ftImages, addOnTotal]
  );

  // Step-based total (before fine-tune)
  const stepTotal = useMemo(() =>
    baseEstimatedPrice.adVideos * PRICE_PER_AD_VIDEO +
    baseEstimatedPrice.organicVideos * PRICE_PER_ORGANIC_VIDEO +
    baseEstimatedPrice.images * PRICE_PER_IMAGE +
    addOnTotal,
    [baseEstimatedPrice, addOnTotal]
  );

  // Once revealed, always show fineTuneTotal so slider adjustments persist after closing the panel
  const estimatedPrice = priceRevealed ? fineTuneTotal : stepTotal;

  // Init fine-tune sliders when price is first revealed
  useEffect(() => {
    if (priceRevealed) {
      setFtAdVideos([baseEstimatedPrice.adVideos]);
      setFtOrganicVideos([baseEstimatedPrice.organicVideos]);
      setFtImages([baseEstimatedPrice.images]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRevealed]);

  const scheduleAutoAdvance = () => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    autoAdvanceTimer.current = setTimeout(() => {
      setDirection(1);
      setStep((s) => Math.min(s + 1, totalSteps));
    }, 380);
  };

  const goNext = () => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const goPrev = () => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const canProceed = () => {
    if (step === 0) return contentType !== null;
    if (step === 1) return ambition !== null;
    if (step === 2) return videoVolume !== null;
    if (step === 3) return true;
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);

    const addOnLabels = selectedAddOns.length > 0
      ? selectedAddOns.map((id) => addOnOptions.find((a) => a.id === id)?.label).join(", ")
      : "Ingen";

    const message = `LEAD FRA PRISBEREGNER
• Content type: ${contentType}
• Ambitionsniveau: ${ambition}
• Videovolumen: ${videoVolume ?? "N/A"}
• Tilvalg: ${addOnLabels}
• Estimeret pris: ${formatDKK(stepTotal)}`;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email,
          phone: "00000000",
          company: "Prisberegner",
          message,
          consent: true,
        }),
      });
    } catch (err) {
      console.error(err);
    }

    setPriceRevealed(true);
    setSubmitting(false);
    goNext();
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <>
      {/* ── Hero & Packages ─── */}
      <section className="pt-24 lg:pt-36 pb-28 lg:pb-36 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Priser & Pakker</p>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              Få content <span className="text-primary">hver måned.</span>
            </h1>
            <p className="text-lg text-foreground/60 leading-relaxed max-w-xl mx-auto mb-8">
              Vælg den rette pakke eller beregn en estimeret pris på jeres næste contentproduktion.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <a
                href="#prisberegner"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("prisberegner")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  background: "rgba(34, 61, 103, 0.55)",
                  backdropFilter: "blur(16px) saturate(180%)",
                  WebkitBackdropFilter: "blur(16px) saturate(180%)",
                  border: "1px solid rgba(100, 149, 220, 0.25)",
                  boxShadow: "0 8px 32px rgba(49, 130, 206, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
                className="inline-flex items-center text-white font-semibold text-sm px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:brightness-110"
              >
                Beregn din egen pris
              </a>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                className={cn(
                  "w-full transition-transform duration-500 relative",
                  pkg.highlighted ? "glass-card-blue scale-[1.03] shadow-2xl z-10 lg:-mx-2" : "glass-card hover:scale-[1.02] border-none"
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="card-content !px-6 !py-10 lg:!px-8 lg:!py-12 flex flex-col h-full">
                  {pkg.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                      <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                        <Sparkles className="w-3.5 h-3.5" />{pkg.badge}
                      </span>
                    </div>
                  )}
                  <div className="card-header w-full">
                    <div className="user-info w-full text-left">
                      <div className="avatar">
                        <svg className="avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div className="user-details">
                        <p className="user-name">Pakke</p>
                        <p className="user-role">{pkg.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-body flex flex-col flex-1">
                    <h3 className="card-title text-4xl mb-1">{pkg.price}</h3>
                    <p className="card-description mb-6">DKK / {pkg.period}</p>
                    <ul className="space-y-3 mb-8 text-left text-sm">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 flex-shrink-0 text-primary" />
                          <span className="opacity-90">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <CalendlyButton className="glass-button w-full mt-auto mb-2 text-sm h-12 rounded-xl">
                      Vælg pakke
                    </CalendlyButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Step-by-step Calculator ─── */}
      <section id="prisberegner" className="py-28 lg:py-36 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Prisberegner</p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground leading-tight">
              Beregn jeres pris.
            </h2>
            <p className="text-foreground/50 mt-4 max-w-lg mx-auto text-base">
              Svar på 4 korte spørgsmål og få en vejledende pris øjeblikkeligt.
            </p>
          </motion.div>

          {/* ── WIDER Calculator Container (max-w-5xl) ── */}
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="relative rounded-3xl border border-white/10 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(12,18,35,0.98) 0%, rgba(8,14,28,0.98) 100%)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="p-8 lg:p-14">
                <StepIndicator current={step} total={totalSteps} />

                <AnimatePresence mode="wait" custom={direction}>

                  {/* ── Step 0: Video type ── */}
                  {step === 0 && (
                    <motion.div key="step-0" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeInOut" }}>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">Hvilken type videoer?</h3>
                      <p className="text-white/50 mb-8 text-sm">Vælg den type content der passer bedst til jeres behov.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {contentTypes.map((ct) => (
                          <FloatingCard key={ct.id} selected={contentType === ct.id}
                            onClick={() => { setContentType(ct.id); scheduleAutoAdvance(); }}>
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-1 transition-colors", contentType === ct.id ? "bg-primary/20" : "bg-white/5")}>
                              <ct.icon className={cn("w-6 h-6 transition-colors", contentType === ct.id ? "text-primary" : "text-white/60")} />
                            </div>
                            <p className="font-semibold text-white text-sm">{ct.label}</p>
                            <p className="text-white/40 text-xs leading-relaxed">{ct.description}</p>
                          </FloatingCard>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 1: Ambition ── */}
                  {step === 1 && (
                    <motion.div key="step-1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeInOut" }}>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">Ambitionsniveauet?</h3>
                      <p className="text-white/50 mb-8 text-sm">Hvad er jeres mål med content-produktionen?</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {ambitions.map((amb) => (
                          <FloatingCard key={amb.id} selected={ambition === amb.id}
                            onClick={() => { setAmbition(amb.id); scheduleAutoAdvance(); }} popular={amb.popular}>
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-1 transition-colors", ambition === amb.id ? "bg-primary/20" : "bg-white/5")}>
                              <amb.icon className={cn("w-6 h-6 transition-colors", ambition === amb.id ? "text-primary" : "text-white/60")} />
                            </div>
                            <p className="font-semibold text-white text-sm">{amb.label}</p>
                            <p className="text-white/40 text-xs leading-relaxed">{amb.description}</p>
                          </FloatingCard>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 2: Volume ── */}
                  {step === 2 && (
                    <motion.div key="step-2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeInOut" }}>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">Hvor mange videoer?</h3>
                      <p className="text-white/50 mb-8 text-sm">Vælg det volumen der passer til jeres aktivitetsniveau.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {videoVolumes.map((vol) => (
                          <FloatingCard key={vol.id} selected={videoVolume === vol.id}
                            onClick={() => { setVideoVolume(vol.id); scheduleAutoAdvance(); }} popular={vol.popular}>
                            <div className="text-3xl mb-1">{vol.icon}</div>
                            <p className="font-semibold text-white text-sm">{vol.label}</p>
                            <p className="text-white/40 text-xs leading-relaxed">{vol.description}</p>
                          </FloatingCard>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 3: Add-ons ── */}
                  {step === 3 && (
                    <motion.div key="step-3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeInOut" }}>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">Særlige tilvalg?</h3>
                      <p className="text-white/50 mb-8 text-sm">Tilføj ekstra services til din pakke — eller spring over.</p>

                      {/* ── Images add-on ── */}
                      <div className="mb-4">
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setImagesEnabled((v) => !v)}
                          className={cn(
                            "relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                            imagesEnabled
                              ? "border-primary/40 bg-primary/10 shadow-[0_0_20px_rgba(49,149,220,0.15)]"
                              : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                          )}
                        >
                          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors", imagesEnabled ? "bg-primary/20" : "bg-white/5")}>
                            <Image className={cn("w-4 h-4 transition-colors", imagesEnabled ? "text-primary" : "text-white/50")} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-semibold">Billeder</p>
                            <p className="text-white/40 text-xs truncate">Professionelle stillbilleder til brand og socials</p>
                          </div>
                          <span className={cn("text-xs font-bold whitespace-nowrap transition-colors", imagesEnabled ? "text-primary" : "text-white/40")}>
                            +{PRICE_PER_IMAGE.toLocaleString("da-DK")} kr/stk
                          </span>
                          {imagesEnabled && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </motion.div>
                          )}
                        </motion.div>

                        {/* Image count selector */}
                        <AnimatePresence>
                          {imagesEnabled && (
                            <motion.div
                              key="image-count"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="mt-3 px-4 py-4 rounded-xl border border-primary/20 bg-primary/5">
                                <p className="text-white/60 text-xs font-semibold mb-3">Antal billeder</p>
                                <div className="flex gap-3 flex-wrap">
                                  {imageCountOptions.map((count) => (
                                    <button
                                      key={count}
                                      onClick={(e) => { e.stopPropagation(); setImageCount(count); }}
                                      className={cn(
                                        "px-4 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-200",
                                        imageCount === count
                                          ? "border-primary bg-primary/20 text-primary"
                                          : "border-white/15 bg-white/5 text-white/50 hover:border-white/30"
                                      )}
                                    >
                                      {count} stk
                                    </button>
                                  ))}
                                </div>
                                <p className="text-white/30 text-xs mt-3">
                                  {imageCount} billeder · {formatDKK(imageCount * PRICE_PER_IMAGE)}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {addOnOptions.map((addon) => {
                          const isSelected = selectedAddOns.includes(addon.id);
                          return (
                            <motion.label
                              key={addon.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleAddOn(addon.id)}
                              className={cn(
                                "relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                                isSelected
                                  ? "border-primary/40 bg-primary/10 shadow-[0_0_20px_rgba(49,149,220,0.15)]"
                                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                              )}
                            >
                              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors", isSelected ? "bg-primary/20" : "bg-white/5")}>
                                <addon.icon className={cn("w-4 h-4 transition-colors", isSelected ? "text-primary" : "text-white/50")} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-xs font-semibold">{addon.label}</p>
                                <p className="text-white/40 text-xs truncate">{addon.description}</p>
                              </div>
                              <span className={cn("text-xs font-bold whitespace-nowrap transition-colors", isSelected ? "text-primary" : "text-white/40")}>
                                +{addon.price.toLocaleString("da-DK")} kr
                              </span>
                              {isSelected && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                  className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-white" />
                                </motion.div>
                              )}
                            </motion.label>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 4: Lead gate ── */}
                  {step === 4 && !priceRevealed && (
                    <motion.div key="step-4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeInOut" }}>
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                          <Sparkles className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">Din pris er klar 🎉</h3>
                        <p className="text-white/50 text-sm max-w-sm mx-auto">
                          Udfyld dit navn og email for at se din estimerede pris. Ingen forpligtelse — prisen er din med det samme.
                        </p>
                      </div>

                      {/* Blurred preview */}
                      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-6 overflow-hidden">
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Estimeret pris</p>
                        <div className="relative">
                          <p className="font-display text-5xl font-bold text-white blur-md select-none">{formatDKK(stepTotal)}</p>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-primary/80 text-white text-xs font-bold px-4 py-1.5 rounded-full backdrop-blur-sm">
                              Udfyld formularen for at se prisen
                            </span>
                          </div>
                        </div>
                        <p className="text-white/25 text-xs mt-2">Ekskl. moms · Vejledende pris</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3 max-w-xl mx-auto">
                        <Input required type="text" placeholder="Dit navn" value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary/50" />
                        <Input required type="email" placeholder="Din email" value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary/50" />
                        <Button type="submit" disabled={submitting} className="w-full h-12 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20">
                          {submitting ? "Henter..." : "Se min estimerede pris"}
                          {!submitting && <ChevronRight className="w-4 h-4 ml-1" />}
                        </Button>
                        <p className="text-center text-white/25 text-xs">Ingen spam · Vi kontakter dig kun hvis du ønsker det</p>
                      </form>
                    </motion.div>
                  )}

                  {/* ── Step 5: Reveal + Fine-tune ── */}
                  {step === 5 && priceRevealed && (
                    <motion.div key="step-5" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: "easeInOut" }}>

                      {/* Header */}
                      <div className="text-center mb-8">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                          className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5"
                        >
                          <Check className="w-8 h-8 text-primary" />
                        </motion.div>
                        <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">Din estimerede pris</h3>
                        <p className="text-white/50 text-sm">Vejledende pris baseret på jeres valg</p>
                      </div>

                      {/* Price display */}
                      <motion.div
                        className="rounded-2xl border border-primary/20 bg-primary/5 p-8 mb-6 text-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.p
                          className="font-display text-5xl lg:text-6xl font-bold text-primary mb-2"
                          key={estimatedPrice}
                          initial={{ scale: 1.05, opacity: 0.6 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.25 }}
                        >
                          {formatDKK(estimatedPrice)}
                        </motion.p>
                        <p className="text-white/30 text-xs">Ekskl. moms · Vejledende pris pr. måned</p>
                      </motion.div>

                      {/* ── Fine-tune accordion ── */}
                      <motion.div
                        className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <button
                          onClick={() => setShowFineTune((v) => !v)}
                          className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <SlidersHorizontal className="w-4 h-4 text-primary" />
                            <span className="text-white text-sm font-semibold">Finjustér din pris</span>
                            <span className="text-white/30 text-xs">Tilpas antal og se prisen ændre sig live</span>
                          </div>
                          <motion.div animate={{ rotate: showFineTune ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown className="w-4 h-4 text-white/40" />
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {showFineTune && (
                            <motion.div
                              key="finetune-panel"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="px-6 pb-6 space-y-8 border-t border-white/10 pt-6">

                                {/* Live price breakdown bar */}
                                <div className="flex items-center justify-between rounded-xl bg-primary/8 border border-primary/15 px-5 py-3">
                                  <span className="text-white/50 text-xs font-medium">Live estimat inkl. tilvalg</span>
                                  <motion.span
                                    className="text-primary font-bold text-lg"
                                    key={fineTuneTotal}
                                    initial={{ scale: 1.08, opacity: 0.6 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {formatDKK(fineTuneTotal)}
                                  </motion.span>
                                </div>

                                {(contentType === "paid" || contentType === "both") && (
                                  <SliderField
                                    label="Paid videoer"
                                    unit={`${ftAdVideos[0]} videoer`}
                                    price={formatDKK(ftAdVideos[0] * PRICE_PER_AD_VIDEO)}
                                    sliderValue={ftAdVideos}
                                    onChange={setFtAdVideos}
                                    max={20}
                                  />
                                )}

                                {(contentType === "organic" || contentType === "both") && (
                                  <SliderField
                                    label="Organiske videoer"
                                    unit={`${ftOrganicVideos[0]} videoer`}
                                    price={formatDKK(ftOrganicVideos[0] * PRICE_PER_ORGANIC_VIDEO)}
                                    sliderValue={ftOrganicVideos}
                                    onChange={setFtOrganicVideos}
                                    max={20}
                                  />
                                )}

                                {imagesEnabled && (
                                  <SliderField
                                    label="Billeder"
                                    unit={`${ftImages[0]} billeder`}
                                    price={formatDKK(ftImages[0] * PRICE_PER_IMAGE)}
                                    sliderValue={ftImages}
                                    onChange={setFtImages}
                                    max={50}
                                  />
                                )}

                                {/* Add-on summary */}
                                {selectedAddOns.length > 0 && (
                                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                    <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-3">Valgte tilvalg</p>
                                    <div className="space-y-2">
                                      {selectedAddOns.map((id) => {
                                        const a = addOnOptions.find((x) => x.id === id);
                                        return a ? (
                                          <div key={id} className="flex justify-between items-center">
                                            <span className="text-white/70 text-xs">{a.label}</span>
                                            <span className="text-primary/80 text-xs font-semibold">+{a.price.toLocaleString("da-DK")} kr</span>
                                          </div>
                                        ) : null;
                                      })}
                                    </div>
                                  </div>
                                )}

                                <p className="text-white/25 text-xs text-center">Prisen er vejledende og ekskl. moms</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Config summary */}
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 mb-6 text-left space-y-3">
                        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">Jeres konfiguration</p>
                        {[
                          { label: "Videotype", value: contentTypes.find((c) => c.id === contentType)?.label },
                          { label: "Ambition", value: ambitions.find((a) => a.id === ambition)?.label },
                          videoVolume ? { label: "Videovolumen", value: videoVolumes.find((v) => v.id === videoVolume)?.label } : null,
                          imagesEnabled ? { label: "Billeder", value: `${imageCount} stk` } : null,
                          selectedAddOns.length > 0 ? { label: "Tilvalg", value: selectedAddOns.map((id) => addOnOptions.find((a) => a.id === id)?.label).join(", ") } : null,
                        ].filter(Boolean).map((item: any, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-white/40 text-sm">{item.label}</span>
                            <span className="text-white text-sm font-medium">{item.value}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-white/40 text-xs mb-5 text-center">
                        Vi vender tilbage til <span className="text-white">{email}</span> med mere info.
                      </p>

                      <CalendlyButton className="w-full h-12 rounded-xl glass-button text-sm font-semibold">
                        Book et uforpligtende møde <ArrowRight className="w-4 h-4 ml-2 inline" />
                      </CalendlyButton>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* ── Navigation ── */}
                {step < 4 && (
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                    {/* Always show back button */}
                    <Button
                      variant="ghost"
                      onClick={goPrev}
                      disabled={step === 0}
                      className="text-white/50 hover:text-white hover:bg-white/10 gap-2 transition-all disabled:opacity-30"
                    >
                      <ArrowLeft className="w-4 h-4" /> Gå tilbage
                    </Button>

                    {/* Always show next button — enabled only when step is complete */}
                    <Button
                      onClick={goNext}
                      disabled={!canProceed()}
                      className={cn(
                        "gap-2 px-6 rounded-xl h-11 font-semibold transition-all",
                        canProceed() ? "shadow-lg shadow-primary/20" : "opacity-40 cursor-not-allowed"
                      )}
                    >
                      {step === 3 ? "Se min pris" : "Næste skridt"} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
