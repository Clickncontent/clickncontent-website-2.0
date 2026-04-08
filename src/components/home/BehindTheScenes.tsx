"use client";
import { motion } from "framer-motion";

const btsImageNames = [
  "Bartosz skonhedsklinik.webp",
  "Bartosz, Martin, Kasper.webp",
  "DSC00129.JPG",
  "IMG_2823.jpeg",
  "IMG_2963.jpeg",
  "IMG_2983.jpeg",
  "IMG_3107.jpeg",
  "IMG_3459.jpeg",
  "IMG_3477.jpeg",
  "IMG_3515.jpeg",
  "IMG_3721.jpeg",
  "IMG_4646.jpeg",
  "IMG_4700.jpeg",
  "IMG_4988.jpeg",
  "IMG_5078.jpeg",
  "IMG_5583.jpeg",
  "IMG_5593.jpeg",
  "IMG_5894.jpeg",
  "IMG_5930.jpeg",
  "IMG_5971.jpeg",
  "IMG_6206.jpeg",
  "IMG_7026.jpeg",
  "IMG_7030.jpeg",
  "IMG_7201.jpeg",
  "IMG_7295.jpeg",
  "IMG_9565.jpeg",
  "Kasper-Bartosz-Stig.webp",
  "Martin og Bartosz.webp",
  "Mathias-bartosz-stig.webp",
  "Minigolf.webp",
  "Nyght studie shoot.webp",
  "amalie-cityadress.webp",
  "dressforsuccess-shoot.webp",
  "dressforsuccess.webp",
  "dsc02739-1-1.webp",
  "frederik-gainer.webp",
  "kasper-bartosz-mode.webp",
  "mathias-bartosz.webp",
  "stig-danser.webp",
  "studie.webp",
  "team-cnc.webp",
];

const btsImages = btsImageNames.map((name) => ({
  src: `/bts/${encodeURI(name)}`,
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
          animation: bts-scroll 120s linear infinite;
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
