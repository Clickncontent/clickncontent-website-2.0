import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FAQItem[] = [
  {
    question: "Hvad gør jer anderledes end andre bureauer?",
    answer: "Vi er ikke et bureau der laver én video og sender en faktura. Vi fungerer som jeres eksterne content-afdeling og bygger annonce-sæt til hele funnelen. Strategi, produktion, testing og optimering samlet ét sted, så I slipper for at koordinere mellem tre leverandører.",
  },
  {
    question: "Hvad mener I med \"annonce-sæt\"?",
    answer: "Et annonce-sæt er en samlet pakke af forskellige annoncevideoer, der dækker top-, mid- og bottom-funnel. Det giver jer content til både awareness, overvejelse og konvertering, uden at I skal starte forfra hver måned.",
  },
  {
    question: "Hvilke virksomheder passer I bedst til?",
    answer: "Virksomheder der annoncerer eller vil annoncere på Meta og TikTok, og som mangler et konstant flow af videoindhold. Det kan være e-commerce, service, SaaS eller lokale brands. Vi supplerer jeres team med et fast flow af annonce-sæt.",
  },
  {
    question: "Hvordan foregår sparringen undervejs?",
    answer: "I får en fast kontaktperson og en enkel feedback-proces. Vi starter med workshop og retning, og undervejs sparrer vi på budskaber, scripts og prioritering af annonce-sættet. Efter leveringer følger vi op, så næste runde bliver endnu skarpere.",
  },

  {
    question: "Hvor hurtigt kan I starte?",
    answer: "Fra vi afholder det indledende strategi-møde, går der typisk 1 til 2 uger inden de første creatives er klar og kampagneaktiveret.",
  },
  {
    question: "Hvad koster det at arbejde med jer?",
    answer: (
      <>
        Vi arbejder ikke med standardpakker – vi skræddersyer prisen ud fra jeres behov, ambitionsniveau og indholdstyper. Det sikrer, at du hverken betaler for lidt eller for meget – men præcis det, der skal til for at opnå resultater.
        <br /><br />
        Vil du have et hurtigt estimat med det samme?{" "}
        <Link
          to="/priser#prisberegner"
          className="inline-flex items-center gap-1 text-primary font-semibold hover:underline underline-offset-2 transition-colors"
        >
          Prøv vores prisberegner <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </>
    ),
  },
];

const FAQSection = () => {
  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32" style={{ backgroundColor: 'hsl(222, 47%, 10%)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
           className="max-w-3xl mx-auto text-center mb-12"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <p className="text-primary text-base lg:text-lg font-semibold tracking-widest uppercase mb-4">FAQ</p>
          <h2 className="font-display text-5xl lg:text-7xl font-bold text-foreground mb-6">
            Ofte stillede <span className="text-primary">spørgsmål</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Få svar på de mest almindelige spørgsmål herunder. Finder du ikke det du leder efter, er du altid velkommen til at kontakte os.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="w-full bg-background border border-border/50 rounded-2xl p-6 lg:p-8 shadow-sm">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border/50 last:border-0 py-1">
                  <AccordionTrigger className="text-left font-display font-medium text-lg lg:text-xl hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 font-medium">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
