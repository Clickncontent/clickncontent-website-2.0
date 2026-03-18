import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { question: "Hvilke typer videoer producerer I?", answer: "Vi producerer alt fra UGC og lo-fi content til high-end brandvideoer. Altid optimeret til paid social performance." },
  { question: "Hvad koster det?", answer: "Hver kunde er unik. Prisen afhænger fuldstændigt af indholdsformatet, mængden og jeres specifikke behov. Vores priser skræddersyes ud fra ambitionsniveau og budget. Kontakt os for at få et uforpligtende tilbud." },
  { question: "Binder jeg mig?", answer: "Nej, vi har ingen lange bindingsperioder. Tror vi ikke på resultaterne, forventer vi heller ikke I gør det." },
  { question: "Hvor længe går der før vi kan starte?", answer: "Fra vi afholder det indledende strategi-møde, går der typisk 1 til 2 uger inden de første creatives er klar og kampagneaktiveret." },
  { question: "Har I egne faste creators?", answer: "Ja, vi samarbejder med et stort, stærkt netværk af danske og internationale creators, så vi altid præcist kan matche dit brand med den rigtige profil." },
  { question: "Sender I raw-filer med?", answer: "Ja, det er jeres materiale. Udover de optimerede annonce-filer får du altid adgang til alle de rå videofiler, så I kan benytte dem kvit og frit på tværs af platforme." },
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
