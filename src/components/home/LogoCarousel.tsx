"use client";
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
import logo19 from "@/assets/logos/logo19.png";
import logo20 from "@/assets/logos/logo20.png";
import logo21 from "@/assets/logos/logo21.png";
import logo22 from "@/assets/logos/logo22.png";
import logo23 from "@/assets/logos/logo23.png";
import logo24 from "@/assets/logos/logo24.png";
import logo25 from "@/assets/logos/logo25.png";
import logo26 from "@/assets/logos/logo26.png";
import logo27 from "@/assets/logos/logo27.png";
import logo28 from "@/assets/logos/logo28.png";

const logos = [
  { src: logo19.src, alt: "Handyhand" },
  { src: logo20.src, alt: "TjekBil" },
  { src: logo23.src, alt: "Shell" },
  { src: logo27.src, alt: "Heymate" },
  { src: dressForSuccess.src, alt: "Dress for Success" },
  { src: ajr.src, alt: "AJR" },
  { src: logo25.src, alt: "Vores Digital" },
  { src: lumant.src, alt: "Lumant" },
  { src: gainerHair.src, alt: "Gainer Hair" },
  { src: nyght.src, alt: "Nyght" },
  { src: logo22.src, alt: "Lejstudentervogn" },
  { src: logo24.src, alt: "Engelbrecht" },
  { src: logo21.src, alt: "Boligly" },
  { src: logo28.src, alt: "Elite Driver" },
  { src: nadim.src, alt: "Nadim Aesthetics" },
  { src: cityaddress.src, alt: "Cityaddress" },
  { src: skoenhedsklinik.src, alt: "Skønhedsklinik Aarhus" },
  { src: logo26.src, alt: "Klik Forsikring" },
  { src: yuki.src, alt: "YUKI" },
  { src: ecohus.src, alt: "Ecohus" },
];

const LogoCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const positionRef = useRef(0);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    const speed = 2.5; // px per frame

    const step = () => {
      if (!isPausedRef.current) {
        positionRef.current += speed;
        // Reset when we've scrolled through the first set of logos
        const halfWidth = el.scrollWidth / 2;
        if (positionRef.current >= halfWidth) {
          positionRef.current = 0;
        }
        el.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate for seamless loop
  const allLogos = [...logos, ...logos];

  return (
    <section className="pt-8 pb-12 relative z-10">
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
