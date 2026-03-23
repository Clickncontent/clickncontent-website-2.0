import { motion } from "framer-motion";
import { ArrowRight, Eye, Users, TrendingUp, Play, BarChart3, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const cases = [
  {
    client: "ELEVATE",
    industry: "Fashion & Lifestyle",
    description: "UGC-kampagne der transformerede brandets tilstedeværelse på Meta og Instagram.",
    image: "from-primary/30 via-primary/10 to-foreground/5",
    metrics: [
      { icon: Users, value: "+140k", label: "Følgere" },
      { icon: Eye, value: "11M", label: "Visninger" },
      { icon: TrendingUp, value: "4.2x", label: "ROAS" },
    ],
  },
  {
    client: "NOOVA",
    industry: "SaaS & Tech",
    description: "Product demos og testimonial-videoer der drev massiv lead generation.",
    image: "from-accent via-primary/15 to-foreground/5",
    metrics: [
      { icon: BarChart3, value: "52%", label: "Engagement ↑" },
      { icon: Eye, value: "8.3M", label: "Visninger" },
      { icon: TrendingUp, value: "5.1x", label: "ROAS" },
    ],
  },
  {
    client: "PURE",
    industry: "Beauty & Skincare",
    description: "Scroll-stopping creatives til TikTok og Reels der halverede CPA.",
    image: "from-primary/20 via-accent to-foreground/5",
    metrics: [
      { icon: Zap, value: "-51%", label: "CPA" },
      { icon: Eye, value: "14M", label: "Visninger" },
      { icon: Users, value: "+95k", label: "Følgere" },
    ],
  },
];

const CaseResults = () => {
  return (
    <section className="py-24 lg:py-32 bg-foreground relative overflow-hidden">
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
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Cases</p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground leading-tight">
              Resultater der
              <br />
              taler for sig selv.
            </h2>
          </div>
          <Button asChild variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground self-start sm:self-auto">
            <Link to="/cases">
              Alle cases
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.client}
              className="group relative rounded-2xl bg-primary-foreground/[0.04] border border-primary-foreground/[0.08] overflow-hidden hover:border-primary/30 hover:bg-primary-foreground/[0.06] transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              {/* Video preview area */}
              <div className={`relative aspect-[4/3] bg-gradient-to-b ${c.image} overflow-hidden`}>
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors duration-500" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary-foreground/10 backdrop-blur-md flex items-center justify-center border border-primary-foreground/20 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500">
                    <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-0.5 group-hover:text-primary group-hover:fill-primary transition-colors duration-500" />
                  </div>
                </div>

                {/* Industry tag */}
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-semibold tracking-wider uppercase bg-foreground/60 backdrop-blur-md text-primary-foreground/80 px-3 py-1 rounded-full">
                    {c.industry}
                  </span>
                </div>
              </div>

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
