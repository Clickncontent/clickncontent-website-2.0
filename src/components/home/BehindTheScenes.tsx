import { motion } from "framer-motion";

// ─── BTS images: bts-001 to bts-168, skip bts-071 (it's a .mov video) ────────
const getExt = (n: number) => {
  if (n === 19) return "png";
  if (n === 168) return "webp";
  // bts-041 to bts-167 are .jpeg, except 118 and 165 which are .jpg
  if (n >= 41 && n <= 167 && n !== 118 && n !== 165) return "jpeg";
  return "jpg";
};

// Take every 5th image (~34 images) and skip the video file (71)
const btsImages = Array.from({ length: 168 }, (_, i) => i + 1)
  .filter((n) => n % 5 === 1 && n !== 71)
  .map((n) => ({
    src: `/bts/bts-${String(n).padStart(3, "0")}.${getExt(n)}`,
    alt: "Bag kameraet — ClicknContent",
  }));

const BehindTheScenes = () => {
  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      {/* Inject keyframes via a style tag — pure CSS, runs on GPU compositor */}
      <style>{`
        @keyframes bts-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .bts-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: bts-scroll 80s linear infinite;
          will-change: transform;
        }
        .bts-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div className="container mx-auto px-4 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Bag kameraet
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            Hvad du ikke{" "}
            <span className="text-primary">ser på feedet</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee — pure CSS, no JS per-frame cost */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="bts-track">
          {/* Render twice for seamless loop */}
          {[...btsImages, ...btsImages].map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-48 sm:w-56 lg:w-64 aspect-[3/4] rounded-2xl overflow-hidden border border-border/40 shadow-md bg-accent/20"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BehindTheScenes;
