import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

const videos = [
  { id: 1, title: "Fashion Brand – UGC", platform: "Meta", youtubeId: "08npwcMB_EE" },
  { id: 2, title: "Fitness – Testimonial", platform: "Instagram", youtubeId: "8Fd7QWYOVJA" },
  { id: 3, title: "SaaS – Product Demo", platform: "TikTok", youtubeId: "8ZNGLYft7_w" },
  { id: 4, title: "E-com – Unboxing", platform: "Meta", youtubeId: "Lgps-K2vRXI" },
  { id: 5, title: "Startup – Founder", platform: "Instagram", youtubeId: "cjQIrYl1L0k" },
  { id: 6, title: "DTC – Before/After", platform: "TikTok", youtubeId: "cjjTxWYkk3g" },
];

const VideoCard = ({ video, index }: { video: any, index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [player, setPlayer] = useState<any>(null);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    if (!hasStarted) {
      setHasStarted(true);
    } else if (player) {
      player.playVideo();
    }
  };

  const onReady: YouTubeProps['onReady'] = (event) => {
    setPlayer(event.target);
  };

  const onPause: YouTubeProps['onPause'] = () => {
    setIsPlaying(false);
  };

  const onPlay: YouTubeProps['onPlay'] = () => {
    setIsPlaying(true);
  };

  return (
    <motion.div
      className="group flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <div className="glass-card-video w-full aspect-[9/16] transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl relative flex items-center justify-center flex-col overflow-hidden mb-4">
        
        {/* Background YouTube Component (only mounts after first play) */}
        {hasStarted && (
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-auto rounded-[14px] overflow-hidden">
            <YouTube
              videoId={video.youtubeId}
              opts={{ 
                width: '100%', 
                height: '100%', 
                playerVars: { autoplay: 1, mute: 0, modestbranding: 1, rel: 0, controls: 1 } 
              }}
              onReady={onReady}
              onPause={onPause}
              onPlay={onPlay}
              className="absolute inset-0 w-full h-full"
              iframeClassName="w-full h-full border-0 absolute top-0 left-0"
            />
          </div>
        )}

        {/* Overlay layer handles thumbnail and play button */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-[14px] cursor-pointer pointer-events-auto"
            onClick={handlePlayClick}
          >
            <img 
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
              alt={video.title} 
              className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-70 group-hover:opacity-100 group-hover:blur-0 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
            
            <div className="relative z-30 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}
      </div>

      <div className="px-1 text-left">
        <h3 className="text-sm font-bold text-foreground mb-1 leading-tight">{video.title}</h3>
        <p className="text-xs text-foreground/70 font-medium leading-tight">
          Se, hvordan vi skaber {video.platform}-resultater.
        </p>
      </div>
    </motion.div>
  );
};

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

        {/* Grid layout perfectly supporting 6 vertical video cards in a row natively */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;
