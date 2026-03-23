import { motion } from "framer-motion";
import { Play } from "lucide-react";

const videos = [
  { id: 1, title: "Fashion Brand – UGC", platform: "Meta", gradient: "from-[hsl(209,60%,70%)] to-[hsl(209,40%,50%)]" },
  { id: 2, title: "Fitness – Testimonial", platform: "Instagram", gradient: "from-[hsl(220,30%,65%)] to-[hsl(209,50%,45%)]" },
  { id: 3, title: "SaaS – Product Demo", platform: "TikTok", gradient: "from-[hsl(200,40%,60%)] to-[hsl(209,60%,40%)]" },
  { id: 4, title: "E-com – Unboxing", platform: "Meta", gradient: "from-[hsl(215,35%,65%)] to-[hsl(209,45%,48%)]" },
  { id: 5, title: "Startup – Founder", platform: "Instagram", gradient: "from-[hsl(205,45%,62%)] to-[hsl(209,55%,42%)]" },
  { id: 6, title: "DTC – Before/After", platform: "TikTok", gradient: "from-[hsl(210,50%,68%)] to-[hsl(209,50%,45%)]" },
];

const VideoGrid = () => {
  return (
    <section className="py-28 lg:py-36">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          className="max-w-xl mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Vores arbejde</p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground leading-tight">
            Creatives der
            <br />
            stopper scrollet.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className={`relative aspect-[9/16] rounded-2xl bg-gradient-to-b ${video.gradient} overflow-hidden transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:shadow-primary/10`}>
                {/* Subtle noise overlay */}
                <div className="absolute inset-0 bg-foreground/5" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <div className="w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg scale-75 group-hover:scale-100 transition-transform duration-400">
                    <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                  <p className="text-xs font-semibold text-primary-foreground tracking-wide">{video.title}</p>
                  <p className="text-[10px] text-primary-foreground/60 uppercase tracking-wider mt-0.5">{video.platform}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;
