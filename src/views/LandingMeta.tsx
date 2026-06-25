"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  Quote,
  Camera,
  Scissors,
  PenLine,
  Play,
} from "lucide-react";

import { VIDEOS } from "@/lib/supabase";
import logoWhite from "@/assets/clickncontent_logo.png";
import logoEcohus from "@/assets/logos/Ecohus.png";
import logoLumant from "@/assets/logos/Lumant.png";
import logoNadim from "@/assets/logos/Nadim.png";
import logoAJR from "@/assets/logos/AJR.png";
import logoNyght from "@/assets/logos/Nyght.png";
import logoYUKI from "@/assets/logos/YUKI.png";
import logoGainer from "@/assets/logos/GainerHair.png";
import logoDFS from "@/assets/logos/DressForSuccess.png";

const FORM_ID = "ansog";

const scrollToForm = () => {
  const el = document.getElementById(FORM_ID);
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 16,
      behavior: "smooth",
    });
  }
};

// ── Reusable bits ───────────────────────────────────────────────
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-display text-[11px] font-bold tracking-[0.18em] uppercase text-primary">
    {children}
  </p>
);

const CtaButton = ({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "dark";
}) => (
  <button
    onClick={scrollToForm}
    className={
      "group inline-flex items-center gap-2.5 rounded-md px-7 py-4 font-bold text-base transition-colors " +
      (variant === "dark"
        ? "bg-background text-foreground hover:bg-secondary"
        : "bg-primary text-primary-foreground hover:bg-primary/90")
    }
  >
    {children}
    <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" />
  </button>
);

// Live showreel cards used in the marquee
const reel = [
  { src: VIDEOS.ss6Story, label: "Tjekbil" },
  { src: VIDEOS.nadiaNadim, label: "AJR x Nadia Nadim" },
  { src: VIDEOS.nygthJanuar, label: "Nyght" },
  { src: VIDEOS.video1, label: "Gainer Hair" },
  { src: VIDEOS.lejStudentervogn, label: "Lejstudentervogn" },
  { src: VIDEOS.yukiVideo, label: "Yuki" },
  { src: VIDEOS.mads, label: "AJR" },
  { src: VIDEOS.balvid, label: "Balvid" },
];

const clientLogos = [
  { src: logoEcohus, alt: "Ecohus" },
  { src: logoLumant, alt: "Lumant" },
  { src: logoNadim, alt: "Nadim" },
  { src: logoAJR, alt: "AJR" },
  { src: logoNyght, alt: "Nyght" },
  { src: logoYUKI, alt: "YUKI" },
  { src: logoGainer, alt: "Gainer Hair" },
  { src: logoDFS, alt: "Dress for Success" },
];

const formSchema = z.object({
  name: z.string().min(1, "Navn er påkrævet").max(100),
  company: z.string().min(1, "Virksomhed er påkrævet").max(100),
  email: z.string().email("Ugyldig email"),
  phone: z.string().min(8, "Telefonnummer er påkrævet").max(30),
  website: z.string().max(200).optional(),
  spend: z.string().optional(),
  budget: z.string().optional(),
  goal: z.string().max(2000).optional(),
  timing: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Du skal acceptere, at vi må kontakte dig." }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LandingMeta() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { budget: "Under 10.000 kr.", timing: "Nu" },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    // Pack the qualification answers into the message field so the existing
    // /api/contact endpoint (Notion + email) captures everything unchanged.
    const message = [
      values.goal ? `Mål med content: ${values.goal}` : "Mål med content: (ikke angivet)",
      `Bruger allerede på annoncering/content: ${values.spend || "(ikke angivet)"}`,
      `Markedsføringsbudget pr. måned: ${values.budget}`,
      `Ønsker at starte: ${values.timing}`,
      values.website ? `Hjemmeside: ${values.website}` : "",
      "Kilde: Meta landing page (/lp/meta)",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: values.company,
          message,
          consent: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Noget gik galt. Prøv igen eller ring til os.");
      }
      router.push("/besked-modtaget");
    } catch (err: any) {
      toast.error(err.message || "Noget gik galt. Prøv igen eller ring til os.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-md bg-secondary/40 border border-border px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      {/* Silberg-style faint grid texture over a near-black canvas */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 75% 20%, hsl(var(--primary) / 0.12), transparent 45%)",
        }}
      />

      <div className="relative z-10">
        <style>{`
          @keyframes cncMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes cncPulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
          .cnc-marquee-track { animation: cncMarquee 38s linear infinite; }
          .cnc-marquee:hover .cnc-marquee-track { animation-play-state: paused; }
        `}</style>

        {/* ============ 1. HERO ============ */}
        <section className="px-6 pt-7 pb-16">
          <div className="mx-auto max-w-[1160px]">
            <div className="flex items-center pb-12 lg:pb-16">
              <Image src={logoWhite} alt="ClicknContent" className="h-7 w-auto" priority />
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-7"
              >
                <Eyebrow>Din eksterne kreative afdeling</Eyebrow>
                <h1 className="font-display text-[clamp(42px,7vw,84px)] font-bold leading-[0.95] tracking-[-0.03em] uppercase">
                  <span className="text-primary">Flere kunder.</span>
                  <br />
                  Ikke bare visninger.
                </h1>
                <p className="max-w-[560px] text-[clamp(17px,2.2vw,20px)] font-medium leading-relaxed text-muted-foreground">
                  Vi bygger video, der er skabt til at performe i betalte annoncer
                  på Meta. Ikke for at se godt ud. For at sælge.
                </p>
                <div className="pt-1">
                  <CtaButton>Ansøg om en samtale</CtaButton>
                </div>

                {/* Stat blocks */}
                <div className="mt-3 grid max-w-[560px] grid-cols-3 overflow-hidden rounded-md border border-border">
                  {[
                    { v: "200+", l: "creatives leveret", accent: false },
                    { v: "68x", l: "bedste case-ROI", accent: true },
                    { v: "40+", l: "kunder", accent: false },
                  ].map((s, i) => (
                    <div
                      key={s.l}
                      className={
                        "px-4 py-5 " + (i < 2 ? "border-r border-border" : "")
                      }
                    >
                      <div
                        className={
                          "font-display text-[clamp(28px,4.5vw,40px)] font-bold leading-none tracking-[-0.03em] " +
                          (s.accent ? "text-primary" : "text-foreground")
                        }
                      >
                        {s.v}
                      </div>
                      <div className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Hero vertical video with glowing frame (Silberg-inspired) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="relative mx-auto w-full max-w-[320px]"
              >
                <div className="absolute -inset-4 rounded-[28px] bg-primary/25 blur-3xl" />
                <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-primary/40 bg-card shadow-2xl shadow-primary/20">
                  <video
                    src={VIDEOS.transformerStory}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-4">
                    <p className="text-sm font-semibold">Performance video</p>
                    <p className="text-xs text-muted-foreground">Bygget til Meta</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============ 2. SHOWREEL MARQUEE ============ */}
        <section className="cnc-marquee border-y border-border py-10">
          <p className="mb-6 px-6 text-center font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Et udpluk af creatives vi har leveret
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="cnc-marquee-track flex w-max gap-4">
              {[...reel, ...reel].map((v, i) => (
                <div
                  key={i}
                  className="relative aspect-[9/16] w-[150px] shrink-0 overflow-hidden rounded-xl border border-border bg-card"
                >
                  <video
                    src={`${v.src}#t=0.6`}
                    preload="metadata"
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 to-transparent p-2.5">
                    <span className="text-[11px] font-semibold">{v.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 3. PROBLEM / AGITATION ============ */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[820px] flex flex-col gap-7">
            <Eyebrow>Problemet</Eyebrow>
            <h2 className="font-display text-[clamp(28px,4.2vw,46px)] font-bold leading-[1.05] tracking-[-0.02em]">
              De fleste video-folk forstår ikke annoncering. Det gør de hos os.
            </h2>
            <div className="flex flex-col gap-3 text-[clamp(17px,2vw,20px)] font-medium text-muted-foreground">
              <p>Den ene ghostede jer i flere dage.</p>
              <p>Den anden skulle bruge 12 runder feedback.</p>
              <p>En tredje forstod ikke produktet.</p>
            </div>
            <p className="border-l-2 border-primary pl-5 text-[clamp(18px,2.2vw,22px)] font-semibold leading-snug text-foreground">
              I vil bare have resultater. Det er præcis det vi leverer, fordi vi
              forstår, hvad der stopper scrollen og skaber salg.
            </p>
          </div>
        </section>

        {/* ============ 4. PROMISE ============ */}
        <section className="border-y border-border bg-secondary/20 px-6 py-24">
          <div className="mx-auto max-w-[880px] flex flex-col gap-6">
            <Eyebrow>Det handler ikke om visninger</Eyebrow>
            <h2 className="font-display text-[clamp(28px,4.2vw,46px)] font-bold leading-[1.05] tracking-[-0.02em] uppercase">
              Går du kun op i at gå viralt, smider du måske penge ud af vinduet.
            </h2>
            <p className="text-[clamp(18px,2.2vw,22px)] font-medium leading-relaxed text-muted-foreground">
              Video handler om at skabe tillid, så din virksomhed får flere
              kunder og mere omsætning. Derfor bygger vi video, der er designet
              til at konvertere og skalere. Ikke én flot video, men mange
              testbare assets, der finder det, som faktisk virker.
            </p>
          </div>
        </section>

        {/* ============ 5. THE BIG 3 / SÅDAN ARBEJDER VI ============ */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[1160px] flex flex-col gap-12">
            <div className="flex flex-col gap-3 max-w-[720px]">
              <Eyebrow>Sådan skaber vi resultater</Eyebrow>
              <h2 className="font-display text-[clamp(28px,4.2vw,46px)] font-bold leading-[1.05] tracking-[-0.02em] uppercase">
                Vi fokuserer på de tre ting, der flytter tallene.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
              {[
                {
                  icon: Camera,
                  title: "Optagelse",
                  body: "Vi dukker ikke bare op og trykker optag. Vi tester dristige vinkler og prøver ideer, andre ikke tør.",
                },
                {
                  icon: Scissors,
                  title: "Performance-redigering",
                  body: "Det ser skarpt ud, men hver klipning har et formål. Hjælper det ikke videoen med at performe, ryger det ud.",
                },
                {
                  icon: PenLine,
                  title: "Script og strategi",
                  body: "Vi reviderer ikke bare jeres scripts, vi udfordrer dem. Sådan bygges vindende annonce-scripts.",
                },
              ].map((c) => (
                <div key={c.title} className="flex flex-col gap-4 bg-background p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                    {c.title}
                  </h3>
                  <p className="text-[15px] font-medium leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 6. CASES ============ */}
        <section className="border-y border-border bg-secondary/20 px-6 py-24">
          <div className="mx-auto max-w-[1160px] flex flex-col gap-12">
            <div className="flex flex-col gap-3 max-w-[720px]">
              <Eyebrow>Cases</Eyebrow>
              <h2 className="font-display text-[clamp(28px,4.2vw,46px)] font-bold leading-[1.05] tracking-[-0.02em] uppercase">
                Resultater der taler for sig selv.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  video: VIDEOS.transformerStory,
                  metric: "68x",
                  name: "Ecohus",
                  body: "68x ROI med video og datadrevne Meta-kampagner.",
                  tag: "Bolig & Ejendom",
                },
                {
                  video: VIDEOS.lumantThumbnail,
                  metric: "3x",
                  name: "Lumant",
                  body: "3x flere leads. Lukkeraten på møder steg fra 25% til 50%.",
                  tag: "B2B / Leads",
                },
                {
                  video: VIDEOS.hejslet,
                  metric: "15",
                  name: "Hejslet Begravelsesforretning",
                  body: "15 videoer, højt engagement og markant flere kundehenvendelser.",
                  tag: "Service",
                },
              ].map((c) => (
                <div
                  key={c.name}
                  className="flex flex-col overflow-hidden rounded-lg border border-border bg-card"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <video
                      src={`${c.video}#t=0.6`}
                      preload="metadata"
                      muted
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover opacity-90"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <div className="font-display text-[clamp(36px,5vw,52px)] font-bold leading-none tracking-[-0.03em] text-primary">
                      {c.metric}
                    </div>
                    <div className="font-semibold">{c.name}</div>
                    <p className="text-[15px] leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                    <span className="mt-1 self-start rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {c.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Client logos */}
            <div className="flex flex-col gap-6 border-t border-border pt-10">
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Betroet af
              </p>
              <div className="grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-4">
                {clientLogos.map((l) => (
                  <Image
                    key={l.alt}
                    src={l.src}
                    alt={l.alt}
                    className="h-8 w-auto object-contain opacity-60 transition hover:opacity-100"
                  />
                ))}
              </div>
            </div>

            <div>
              <CtaButton>Ansøg om en samtale</CtaButton>
            </div>
          </div>
        </section>

        {/* ============ 7. DET RETTE MATCH ============ */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[880px] flex flex-col gap-9">
            <div className="flex flex-col gap-3">
              <Eyebrow>Det rette match</Eyebrow>
              <h2 className="font-display text-[clamp(28px,4.2vw,46px)] font-bold leading-[1.05] tracking-[-0.02em] uppercase">
                Vi er måske et match, hvis I...
              </h2>
            </div>
            <div className="flex flex-col">
              {[
                "allerede investerer i annoncering eller content, eller er klar til det",
                "vil have video, der skaber målbare resultater, ikke bare flotte visninger",
                "har et reelt behov og budgettet til at investere i vækst",
                "er trætte af ustabile freelancere og vil have en fast kreativ partner",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-start gap-4 border-t border-border py-5 last:border-b"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <p className="text-[clamp(17px,2vw,20px)] font-semibold leading-snug">
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 8. TESTIMONIAL ============ */}
        <section className="border-y border-border bg-secondary/20 px-6 py-20">
          <div className="mx-auto max-w-[820px] flex flex-col gap-6">
            <Quote className="h-9 w-9 text-primary" />
            <p className="text-[clamp(20px,2.6vw,28px)] font-semibold leading-snug">
              ClicknContent forstår forskellen på en video, der ser godt ud, og
              en video, der sælger. Vi har aldrig fået mere ud af vores
              annoncekroner.
            </p>
            <p className="text-sm font-medium text-muted-foreground">
              Tilfreds kunde, Meta Ads
            </p>
          </div>
        </section>

        {/* ============ 9. SCARCITY / KAPACITET ============ */}
        <section className="bg-primary px-6 py-20 text-primary-foreground">
          <div className="mx-auto max-w-[880px] flex flex-col gap-6">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/75">
              Begrænset kapacitet
            </p>
            <h2 className="font-display text-[clamp(24px,3.4vw,38px)] font-bold leading-[1.12]">
              Vi tager kun et begrænset antal nye samarbejder ind ad gangen, så
              vi kan arbejde tæt med hver kunde om strategi, produktion og
              performance.
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-background/15 px-4 py-2.5 text-sm font-bold">
                <span
                  className="h-2.5 w-2.5 rounded-full bg-primary-foreground"
                  style={{ animation: "cncPulse 1.6s ease-in-out infinite" }}
                />
                Plads til 8 faste kunder
              </span>
              <span className="text-base font-medium text-primary-foreground/90">
                Lige nu er der ledige pladser, men de fyldes løbende.
              </span>
            </div>
            <div className="pt-1">
              <CtaButton variant="dark">Ansøg om en samtale</CtaButton>
            </div>
          </div>
        </section>

        {/* ============ 10. FORM ============ */}
        <section id={FORM_ID} className="px-6 py-24">
          <div className="mx-auto max-w-[680px]">
            <div className="mb-10 flex flex-col gap-3">
              <Eyebrow>Ansøg</Eyebrow>
              <h2 className="font-display text-[clamp(28px,4.2vw,46px)] font-bold leading-[1.02] tracking-[-0.03em] uppercase">
                Ansøg om en samtale
              </h2>
              <p className="text-[clamp(16px,2vw,19px)] font-medium leading-relaxed text-muted-foreground">
                Udfyld kort. Passer det, ringer vi dig op og tager en
                uforpligtende snak om, hvordan vi kan skabe resultater for jer.
                Passer det ikke, siger vi det hurtigt og ærligt. Ingen ghosting.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Navn *</label>
                <input className={inputClass} {...register("name")} />
                {errors.name && (
                  <span className="text-xs text-destructive-foreground/90">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Virksomhed *</label>
                <input className={inputClass} {...register("company")} />
                {errors.company && (
                  <span className="text-xs text-destructive-foreground/90">
                    {errors.company.message}
                  </span>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Email *</label>
                  <input type="email" className={inputClass} {...register("email")} />
                  {errors.email && (
                    <span className="text-xs text-destructive-foreground/90">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Telefon *</label>
                  <input type="tel" className={inputClass} {...register("phone")} />
                  {errors.phone && (
                    <span className="text-xs text-destructive-foreground/90">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Hjemmeside</label>
                <input
                  placeholder="https://"
                  className={inputClass}
                  {...register("website")}
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-bold">
                  Bruger I allerede penge på annoncering eller content?
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {["Ja", "Nej", "Lidt"].map((opt) => (
                    <label
                      key={opt}
                      className="flex flex-1 min-w-[90px] cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-secondary/40 py-3 text-sm font-semibold transition has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                    >
                      <input
                        type="radio"
                        value={opt}
                        className="accent-primary"
                        {...register("spend")}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">
                  Nuværende markedsføringsbudget pr. måned
                </label>
                <select className={inputClass} {...register("budget")}>
                  <option>Under 10.000 kr.</option>
                  <option>10.000 til 25.000 kr.</option>
                  <option>25.000 til 50.000 kr.</option>
                  <option>Over 50.000 kr.</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">
                  Hvad er jeres mål med content?
                </label>
                <textarea rows={4} className={inputClass} {...register("goal")} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Hvornår vil I gerne i gang?</label>
                <select className={inputClass} {...register("timing")}>
                  <option>Nu</option>
                  <option>1 til 3 måneder</option>
                  <option>Bare nysgerrig</option>
                </select>
              </div>

              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  className="mt-1 accent-primary"
                  {...register("consent")}
                />
                <span>
                  Jeg accepterer, at ClicknContent må kontakte mig angående min
                  henvendelse.
                </span>
              </label>
              {errors.consent && (
                <span className="text-xs text-destructive-foreground/90">
                  {errors.consent.message}
                </span>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-1 inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-7 py-4 text-[17px] font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {isSubmitting ? "Sender..." : "Send ansøgning"}
                <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-center text-[13px] leading-relaxed text-muted-foreground">
                Vi vender tilbage inden for 1 til 2 hverdage. Helt uforpligtende.
              </p>
            </form>

            <div className="mt-16 flex items-center gap-3.5 border-t border-border pt-7">
              <Image src={logoWhite} alt="ClicknContent" className="h-5 w-auto" />
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                Performance først. Altid.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
