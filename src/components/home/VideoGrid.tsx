import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const videos = [
  { id: 1, title: "Fashion Brand – UGC", platform: "Meta", youtubeId: "dQw4w9WgXcQ" },
  { id: 2, title: "Fitness – Testimonial", platform: "Instagram", youtubeId: "dQw4w9WgXcQ" },
  { id: 3, title: "SaaS – Product Demo", platform: "TikTok", youtubeId: "dQw4w9WgXcQ" },
  { id: 4, title: "E-com – Unboxing", platform: "Meta", youtubeId: "dQw4w9WgXcQ" },
  { id: 5, title: "Startup – Founder", platform: "Instagram", youtubeId: "dQw4w9WgXcQ" },
  { id: 6, title: "DTC – Before/After", platform: "TikTok", youtubeId: "dQw4w9WgXcQ" },
];

const VideoGrid = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // When closing the dialog, reset the active video
  const onOpenChange = (open: boolean) => {
    if (!open) setActiveVideo(null);
  };

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

        <Dialog onOpenChange={onOpenChange}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {videos.map((video, i) => (
              <DialogTrigger asChild key={video.id}>
                <motion.div
                  className="group cursor-pointer"
                  onClick={() => setActiveVideo(video.youtubeId)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <div className="relative aspect-[9/16] rounded-2xl bg-muted overflow-hidden transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:shadow-primary/20">
                    {/* YouTube maxresdefault thumbnail */}
                    <img 
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                      alt={video.title} 
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />

                    {/* Dark gradient overlay so text is readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-400">
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                      <p className="text-xs font-semibold text-white tracking-wide">{video.title}</p>
                      <p className="text-[10px] text-white/70 uppercase tracking-wider mt-0.5">{video.platform}</p>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
            ))}
          </div>
          
          {/* Modal to play video */}
          <DialogContent className="max-w-4xl w-full p-0 bg-black/90 border-black/50 overflow-hidden aspect-video flex justify-center items-center">
            {activeVideo && (
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0 aspect-video max-h-[85vh]"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default VideoGrid;
