"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CALENDLY_URL = "https://calendly.com/clickncontent-b/intromoede-med-bartosz";

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, mounted]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[9998] bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Centering shell — no transforms here, just flex */}
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ padding: "1.5rem" }}
          >
            <motion.div
              key="modal"
              style={{
                width: "calc(100% - 2rem)",
                maxWidth: "1100px",
                maxHeight: "90vh",
                overflowY: "auto",
                borderRadius: "19px",
                background: "rgba(3, 144, 252, 0.18)",
                backdropFilter: "blur(9px) saturate(193%)",
                WebkitBackdropFilter: "blur(9px) saturate(193%)",
                border: "6px solid rgba(0, 31, 102, 0.2)",
                boxShadow: "6px 12px 20px 0 rgba(51,51,51,0.22), inset 0 0 31px rgba(255,255,255,0.15), inset 0 0 4px 2px rgba(255,255,255,0.28)",
              }}
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Reflection layers */}
              <div
                className="absolute inset-0 pointer-events-none z-[1] rounded-[inherit]"
                style={{ background: "linear-gradient(to left top, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 50%)" }}
              />
              <div
                className="absolute inset-0 pointer-events-none z-[1] rounded-[inherit]"
                style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.084) 0%, rgba(255,255,255,0) 100%)" }}
              />

              {/* Top bar */}
              <div className="relative z-10 flex items-center justify-between px-6 py-4">
                <span className="font-display text-base font-bold text-white drop-shadow">
                  Book et gratis møde
                </span>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Luk"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Calendly iframe */}
              <div className="relative z-10 px-4 pb-4 h-[700px] sm:h-[750px]">
                <iframe
                  src={CALENDLY_URL}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Book et møde"
                  style={{ borderRadius: "12px", display: "block" }}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
