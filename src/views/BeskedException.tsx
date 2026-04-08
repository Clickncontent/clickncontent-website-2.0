"use client";

import { motion } from "framer-motion";
import { MailCheck, ArrowRight, Clock } from "lucide-react";
import Link from 'next/link';
;

export default function BeskedException() {
  return (
    <>
      <section className="min-h-[80vh] flex items-center justify-center pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="mb-8 flex justify-center"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <MailCheck className="w-12 h-12 text-primary" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
              Besked modtaget
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Vi har modtaget din besked!
            </h1>
            <p className="text-foreground/60 text-lg leading-relaxed mb-4">
              Tak fordi du henvendte dig. Vi vender tilbage til dig hurtigst muligt — typisk inden for 24 timer.
            </p>

            <div className="inline-flex items-center gap-2 text-foreground/40 text-sm mb-10 bg-accent/30 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              Svartid: inden for 24 timer
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Tilbage til forsiden <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cases"
                className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl border border-border text-foreground font-medium hover:bg-accent transition-colors"
              >
                Se vores cases
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
