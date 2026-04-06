import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function TakForDinBestilling() {
  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="mb-8 flex justify-center"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
              Booking bekræftet
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Tak for din booking!
            </h1>
            <p className="text-foreground/60 text-lg leading-relaxed mb-4">
              Vi glæder os til at tale med dig. Du modtager snart en kalenderinvitation med alle detaljer.
            </p>
            <p className="text-foreground/50 text-base mb-10">
              Har du spørgsmål inden mødet? Skriv til os på{" "}
              <a href="mailto:kontakt@clickncontent.dk" className="text-primary hover:underline">
                kontakt@clickncontent.dk
              </a>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Tilbage til forsiden <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/cases"
                className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl border border-border text-foreground font-medium hover:bg-accent transition-colors"
              >
                <Calendar className="w-4 h-4" /> Se vores cases
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
