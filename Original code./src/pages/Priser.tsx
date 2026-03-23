import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
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

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-foreground relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/12 rounded-full blur-[120px]" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Priser</p>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-6">
              Få content
              <br />
              <span className="text-primary">hver måned.</span>
            </h1>
            <p className="text-lg text-primary-foreground/60 leading-relaxed max-w-lg mb-10">
              Beregn en estimeret pris på jeres næste contentproduktion.
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

      {/* ── Packages ─────────────────────────────────────── */}
      <section className="py-28 lg:py-36">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Pakker</p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground leading-tight">
              Vælg den rette pakke.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                className={cn(
                  "relative rounded-2xl border p-8 lg:p-10 flex flex-col transition-all duration-500",
                  pkg.highlighted
                    ? "bg-foreground text-primary-foreground border-foreground shadow-2xl shadow-foreground/20 scale-[1.03] z-10"
                    : "bg-card border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <h3 className={cn(
                  "font-display text-lg font-bold mb-1",
                  pkg.highlighted ? "text-primary-foreground" : "text-foreground"
                )}>
                  {pkg.name}
                </h3>

                <div className="mb-6">
                  <span className={cn(
                    "font-display text-4xl font-bold",
                    pkg.highlighted ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {pkg.price}
                  </span>
                  <span className={cn(
                    "text-sm ml-1",
                    pkg.highlighted ? "text-primary-foreground/50" : "text-muted-foreground"
                  )}>
                    DKK / {pkg.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <Check className={cn(
                        "w-4 h-4 flex-shrink-0",
                        pkg.highlighted ? "text-primary" : "text-primary"
                      )} />
                      <span className={pkg.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  variant={pkg.highlighted ? "default" : "outline"}
                  className={cn(
                    "w-full rounded-xl h-12 text-base",
                    pkg.highlighted && "shadow-lg shadow-primary/25"
                  )}
                >
                  <Link to="/kontakt">Vælg pakke</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator ───────────────────────────────────── */}
      <section className="py-28 lg:py-36 bg-card relative overflow-hidden">
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

              {/* Price output */}
              <div className="text-center">
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
                <p className="text-xs text-muted-foreground mt-2">Prisen er vejledende og ekskl. moms</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-28 lg:py-36 bg-foreground relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground leading-[1.1] mb-6">
              Klar til at skalere jeres
              <br />
              <span className="text-primary">paid social creatives?</span>
            </h2>
            <p className="text-primary-foreground/50 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Lad os tage en uforpligtende snak om jeres behov og budget.
            </p>
            <Button asChild size="lg" className="text-base px-10 h-13 rounded-xl shadow-lg shadow-primary/25">
              <Link to="/kontakt">
                Book et kald
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </motion.div>
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
