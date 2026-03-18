import { useRef, useEffect, useState } from "react";

import ajr from "@/assets/logos/AJR.png";
import lumant from "@/assets/logos/Lumant.png";
import nadim from "@/assets/logos/Nadim.png";
import ecohus from "@/assets/logos/Ecohus.png";
import gainerHair from "@/assets/logos/GainerHair.png";
import cityaddress from "@/assets/logos/Cityaddress.png";
import nyght from "@/assets/logos/Nyght.png";
import dressForSuccess from "@/assets/logos/DressForSuccess.png";
import skoenhedsklinik from "@/assets/logos/SkoenhedsklinikAarhus.png";
import yuki from "@/assets/logos/YUKI.png";

const logos = [
  { src: ajr, alt: "AJR" },
  { src: lumant, alt: "Lumant" },
  { src: nadim, alt: "Nadim Aesthetic Clinic" },
  { src: ecohus, alt: "Ecohus" },
  { src: gainerHair, alt: "Gainer Hair" },
  { src: cityaddress, alt: "Cityaddress" },
  { src: nyght, alt: "Nyght" },
  { src: dressForSuccess, alt: "Dress for Success" },
  { src: skoenhedsklinik, alt: "Skønhedsklinik Aarhus" },
  { src: yuki, alt: "YUKI" },
];

const LogoCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let position = 0;
    const speed = 0.5; // px per frame

    const step = () => {
      if (!isPaused) {
        position += speed;
        // Reset when we've scrolled through the first set of logos
        const halfWidth = el.scrollWidth / 2;
        if (position >= halfWidth) {
          position = 0;
        }
        el.style.transform = `translateX(-${position}px)`;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Duplicate for seamless loop
  const allLogos = [...logos, ...logos];

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
          Virksomheder vi har arbejdet med
        </h2>
        <p className="text-white/60 max-w-xl mx-auto">
          Vi hjælper ambitiøse brands med at skabe content der performer på paid social.
        </p>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex items-center w-max will-change-transform"
          style={{ gap: "100px" }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-[80px] lg:h-[150px] w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
