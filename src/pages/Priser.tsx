import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendlyButton } from "@/components/CalendlyButton";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// ── Packages ──────────────────────────────────────────────

const packages = [
  {
    name: "Starter",
    price: "15.250",
    period: "1–3 måned",
    features: ["5 videoer", "Scripting", "Workshop", "Content strategi", "Marketing strategi"],
    highlighted: false,
  },
  {
    name: "Grow",
    price: "27.000",
    period: "1–3 måned",
    features: ["9 videoer", "Scripting", "Workshop", "Content strategi", "Marketing strategi"],
    highlighted: true,
    badge: "Mest populær",
  },
  {
    name: "Premium",
    price: "39.500",
    period: "1–3 måned",
    features: ["15 videoer", "Scripting", "Workshop", "Content strategi", "Marketing strategi"],
    highlighted: false,
  },
];

// ── Add-ons ──────────────────────────────────────────────

const addOns = [
  { id: "scripts", label: "Scripts", price: 1000 },
  { id: "model", label: "Model", price: 3000 },
  { id: "content-strategi", label: "Content-strategi", price: 3000 },
  { id: "marketing-strategi", label: "Marketing-strategi", price: 5000 },
  { id: "data-analyse", label: "Dataanalyse & rapportering", price: 5000 },
];

// ── Price per unit ──────────────────────────────────────

const PRICE_PER_AD_VIDEO = 2500;
const PRICE_PER_ORGANIC_VIDEO = 2000;
const PRICE_PER_IMAGE = 800;

// ── Helpers ─────────────────────────────────────────────

const formatDKK = (n: number) =>
  n.toLocaleString("da-DK") + " DKK";

// ── Page ────────────────────────────────────────────────

const Priser = () => {
  const [adVideos, setAdVideos] = useState([3]);
  const [organicVideos, setOrganicVideos] = useState([2]);
  const [images, setImages] = useState([0]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [optInName, setOptInName] = useState("");
  const [optInEmail, setOptInEmail] = useState("");
  const [priceRevealed, setPriceRevealed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const estimatedPrice = useMemo(() => {
    const base =
      adVideos[0] * PRICE_PER_AD_VIDEO +
      organicVideos[0] * PRICE_PER_ORGANIC_VIDEO +
      images[0] * PRICE_PER_IMAGE;
    const extras = addOns
      .filter((a) => selectedAddOns.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    return base + extras;
  }, [adVideos, organicVideos, images, selectedAddOns]);

  const handleOptIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!optInName.trim() || !optInEmail.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setPriceRevealed(true);
      setSubmitting(false);
    }, 600);
  };

  return (
    <Layout>
      <Helmet>
        <title>Priser på content marketing pakker | ClicknContent</title>
        <meta name="description" content="Vælg en månedlig pakke eller beregn pris på jeres næste videoproduktion. Transparente priser fra Aarhus." />
        <meta property="og:title" content="Priser på content marketing pakker | ClicknContent" />
        <meta property="og:description" content="Vælg en månedlig pakke eller beregn pris på jeres næste videoproduktion. Transparente priser fra Aarhus." />
      </Helmet>
      {/* ── Hero & Packages ─────────────────────────────────────────── */}
      <section className="pt-24 lg:pt-36 pb-28 lg:pb-36 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Priser & Pakker</p>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              Få content <span className="text-primary">hver måned.</span>
            </h1>
            <p className="text-lg text-foreground/60 leading-relaxed max-w-xl mx-auto">
              Vælg den rette pakke eller beregn en estimeret pris på jeres næste contentproduktion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                className={cn(
                  "w-full transition-transform duration-500",
                  pkg.highlighted 
                    ? "glass-card-blue scale-[1.03] shadow-2xl z-10 lg:-mx-2" 
                    : "glass-card hover:scale-[1.02] border-none"
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="card-content !px-6 !py-10 lg:!px-8 lg:!py-12">
                  {pkg.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                      <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                        <Sparkles className="w-3.5 h-3.5" />
                        {pkg.badge}
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

                  <div className="card-body">
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

      {/* ── Calculator ───────────────────────────────────── */}
      <section id="prisberegner" className="py-28 lg:py-36 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

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
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="rounded-2xl border border-border bg-background p-8 lg:p-12 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Sliders */}
              <div className="space-y-10 mb-12">
                <SliderField
                  label="Antal annoncevideoer"
                  value={adVideos[0]}
                  unit={`${adVideos[0]} videoer`}
                  price={`${formatDKK(adVideos[0] * PRICE_PER_AD_VIDEO)}`}
                  sliderValue={adVideos}
                  onChange={setAdVideos}
                  max={20}
                />
                <SliderField
                  label="Antal organiske videoer"
                  value={organicVideos[0]}
                  unit={`${organicVideos[0]} videoer`}
                  price={`${formatDKK(organicVideos[0] * PRICE_PER_ORGANIC_VIDEO)}`}
                  sliderValue={organicVideos}
                  onChange={setOrganicVideos}
                  max={20}
                />
                <SliderField
                  label="Antal billeder"
                  value={images[0]}
                  unit={`${images[0]} billeder`}
                  price={`${formatDKK(images[0] * PRICE_PER_IMAGE)}`}
                  sliderValue={images}
                  onChange={setImages}
                  max={30}
                />
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-10" />

              {/* Add-ons */}
              <div className="mb-12">
                <h3 className="font-display text-lg font-bold text-foreground mb-6">Tilvalg</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addOns.map((addon) => {
                    const isSelected = selectedAddOns.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300",
                          isSelected
                            ? "border-primary/30 bg-accent shadow-sm"
                            : "border-border hover:border-primary/15 hover:bg-accent/50"
                        )}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleAddOn(addon.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className="flex-1 text-sm font-medium text-foreground">{addon.label}</span>
                        <span className="text-sm text-muted-foreground">
                          +{addon.price.toLocaleString("da-DK")} kr
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-8" />

              {/* Price gate */}
              {!priceRevealed ? (
                <motion.div
                  className="rounded-2xl border border-primary/20 bg-primary/5 p-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-center mb-6">
                    <p className="font-display text-xl font-bold text-foreground mb-1">Se din estimerede pris nu</p>
                    <p className="text-sm text-foreground/60">Udfyld nedenfor — du får prisen med det samme. Intet ventetid, intet tilbud, ingen forpligtelse.</p>
                  </div>
                  <form onSubmit={handleOptIn} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                    <Input
                      required
                      type="text"
                      placeholder="Dit navn"
                      value={optInName}
                      onChange={(e) => setOptInName(e.target.value)}
                      className="flex-1 h-12 bg-background border-border"
                    />
                    <Input
                      required
                      type="email"
                      placeholder="Din email"
                      value={optInEmail}
                      onChange={(e) => setOptInEmail(e.target.value)}
                      className="flex-1 h-12 bg-background border-border"
                    />
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="h-12 px-8 rounded-xl shadow-md shadow-primary/20 whitespace-nowrap"
                    >
                      {submitting ? "Henter..." : "Se pris"}
                      {!submitting && <ArrowRight className="w-4 h-4 ml-1" />}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-sm text-muted-foreground mb-2">Estimeret pris</p>
                  <motion.p
                    className="font-display text-5xl lg:text-6xl font-bold text-primary"
                    key={estimatedPrice}
                    initial={{ scale: 1.05, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatDKK(estimatedPrice)}
                  </motion.p>
                  <p className="text-xs text-muted-foreground mt-2 mb-8">Prisen er vejledende og ekskl. moms</p>
                  <p className="text-sm text-foreground/60">Vi vender tilbage til <span className="text-foreground font-medium">{optInEmail}</span> med mere info.</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// ── Slider field component ────────────────────────────────

const SliderField = ({
  label,
  unit,
  price,
  sliderValue,
  onChange,
  max,
}: {
  label: string;
  value: number;
  unit: string;
  price: string;
  sliderValue: number[];
  onChange: (v: number[]) => void;
  max: number;
}) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <div className="text-right">
        <span className="text-sm font-bold text-foreground">{unit}</span>
        <span className="text-xs text-muted-foreground ml-2">({price})</span>
      </div>
    </div>
    <Slider
      value={sliderValue}
      onValueChange={onChange}
      min={0}
      max={max}
      step={1}
      className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-primary [&_[role=slider]]:bg-card [&_[role=slider]]:shadow-md [&_[role=slider]]:transition-shadow [&_[role=slider]]:hover:shadow-lg [&_[role=slider]]:hover:shadow-primary/20"
    />
  </div>
);

export default Priser;
