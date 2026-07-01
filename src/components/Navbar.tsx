"use client";
import { useState, useEffect } from "react";
import logo from "@/assets/clickncontent_logo.png";
import Link from 'next/link';
import { usePathname as useLocation } from 'next/navigation';
;
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendlyButton } from "@/components/CalendlyButton";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/ydelser", label: "Vores ydelser" },
  { to: "/cases", label: "Cases" },
  { to: "/kontakt", label: "Kontakt os" },
  { to: "/om-os", label: "Om os" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8 pt-4">
      <nav
        className={cn(
          "relative w-full max-w-6xl rounded-[20px] transition-all duration-500 overflow-hidden",
          "bg-[rgba(50,94,164,0.44)] backdrop-blur-[8px] backdrop-saturate-[180%]",
          "border border-[rgba(100,116,139,0.2)]",
          "shadow-[0px_12px_40px_0_rgba(2,6,23,0.3),inset_0_0_120px_rgba(79,70,229,0.08),inset_0px_0px_4px_2px_rgba(255,255,255,0.1)]",
          scrolled ? "bg-[rgba(50,94,164,0.6)]" : ""
        )}
      >
        <div className="px-5 lg:px-7">
          <div className="flex items-center justify-between h-14 lg:h-16">
            <Link href="/" className="relative z-10 shrink-0">
              <img src={logo.src} alt="ClicknContent" className="h-7 lg:h-8 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  className={cn(
                    "relative text-[13px] font-medium tracking-wide transition-colors duration-300 hover:text-primary py-1",
                    location === link.to
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  {location === link.to && (
                    <motion.span
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                      layoutId="nav-underline"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              <CalendlyButton size="sm" className="rounded-full ml-1 px-5 text-[13px] font-medium tracking-wide">
                Book et kald
              </CalendlyButton>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground relative z-10"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop – tap to close */}
            <motion.div
              className="lg:hidden fixed inset-0 z-40 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            {/* Slide-in panel */}
            <motion.div
              className="lg:hidden fixed inset-y-0 right-0 z-50 w-4/5 max-w-sm bg-card/98 backdrop-blur-2xl border-l border-border/40 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="flex flex-col gap-5 pt-20 px-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.to}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-semibold transition-colors hover:text-primary",
                        location === link.to ? "text-primary" : "text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <CalendlyButton size="lg" className="mt-4 w-full rounded-full" onClick={() => setIsOpen(false)}>
                    Book et kald
                  </CalendlyButton>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
