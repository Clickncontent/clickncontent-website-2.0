"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { VIDEOS } from "@/lib/supabase";

const videos = [
  { id: 1, title: "Smartsalg", platform: "Meta", src: VIDEOS.ss6Story },
  { id: 2, title: "Lejstudentervogn", platform: "Instagram", src: VIDEOS.lejStudentervogn },
  { id: 3, title: "AJR x Nadia Nadim", platform: "TikTok", src: VIDEOS.nadiaNadim },
  { id: 4, title: "Nygth", platform: "Meta", src: VIDEOS.nygthJanuar },
  { id: 5, title: "Skønhedsklinik Aarhus", platform: "Instagram", src: VIDEOS.skonhedsklinikThumb },
  { id: 6, title: "Yuki", platform: "TikTok", src: VIDEOS.yukiVideo },
];

const VideoCard = ({ video, index }: { video: any, index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Trigger loading slightly before it enters the viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
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
        
        {/* Background Native Video Component */}
        <div 
          ref={containerRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-auto rounded-[14px] overflow-hidden" 
          onClick={toggleVideo}
        >
          {isIntersecting && (
            <video
              ref={videoRef}
              src={`${video.src}#t=0.5`}
              loop
              muted={false}
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Overlay layer handles thumbnail and play button native recreation */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-[14px] cursor-pointer pointer-events-none"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 backdrop-blur-[2px]" />
            
            <div className="relative z-30 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
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
