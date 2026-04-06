import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "ClicknContent har fuldstændig transformeret vores annoncering. Deres creatives leverer konsistent høj ROAS – det er vores bedste investering.",
    author: "Maria Jensen",
    role: "Marketing Director",
    company: "Fashion Brand X",
    rating: 5,
  },
  {
    quote: "Professionelt, hurtigt og med et skarpt øje for hvad der virker. De forstår paid social på et helt andet niveau end andre bureauer.",
    author: "Anders Larsen",
    role: "Growth Lead",
    company: "SaaS Startup Y",
    rating: 5,
  },
  {
    quote: "Fra strategi til levering – hele processen er gnidningsfri. Vores CTR er tredoblet og CPA halveret siden vi startede samarbejdet.",
    author: "Sophie Nielsen",
    role: "E-commerce Manager",
    company: "Brand Z",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary text-base lg:text-lg font-semibold tracking-widest uppercase mb-4">Testimonials</p>
          <h2 className="font-display text-5xl lg:text-7xl font-bold text-foreground leading-tight">
            Hvad vores kunder siger.
          </h2>
        </motion.div>

        {/* Video testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {[
            { src: "/Lumant testimonial.MP4", label: "Lumant", desc: "B2B / Leads" },
            { src: "/AJR testimonial.mp4", label: "AJR", desc: "Kunde" },
          ].map((v, i) => (
            <motion.div
              key={v.label}
              className="rounded-2xl overflow-hidden border border-primary/20 bg-card/40 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="aspect-video bg-black">
                <video
                  src={v.src}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <p className="font-display font-bold text-foreground">{v.label}</p>
                <p className="text-xs text-muted-foreground">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              className="group relative p-8 lg:p-10 rounded-2xl bg-primary-foreground/5 backdrop-blur-xl border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed text-[15px] mb-8">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-sm font-bold text-primary">
                    {t.author.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                </div>
              </div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/0 to-primary/0 group-hover:from-primary/[0.02] group-hover:to-transparent transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
