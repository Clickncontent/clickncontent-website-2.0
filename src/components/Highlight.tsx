"use client";
import { motion } from "framer-motion";

export function Highlight({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) {
  return (
    <span className={`relative inline-block px-1 ${className}`}>
      <motion.span
        className="absolute bottom-1 left-0 w-full h-3 bg-primary/40 -z-10 rounded-sm origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
