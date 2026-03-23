import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Kontakt = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Besked sendt!",
        description: "Vi vender tilbage hurtigst muligt."
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <Layout>
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}>
            
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Kontakt <span className="text-primary">os</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Klar til at tage din paid social til næste niveau? Book et møde eller send os en besked.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send os en besked</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Navn</Label>
                    <Input id="name" placeholder="Dit navn" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="din@email.dk" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Virksomhed</Label>
                  <Input id="company" placeholder="Din virksomhed" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Besked</Label>
                  <Textarea id="message" placeholder="Fortæl os om dit projekt..." rows={5} required />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto text-base px-8 h-12" disabled={isSubmitting}>
                  {isSubmitting ? "Sender..." :
                  <>
                      Send besked
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  }
                </Button>
              </form>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}>
              
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Kontaktoplysninger</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">kontakt@clickncontent.dk</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Telefon</p>
                    <p className="text-muted-foreground">+45 50 12 92 06 </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Lokation</p>
                    <p className="text-muted-foreground">Aarhus, Danmark</p>
                  </div>
                </div>
              </div>

              {/* Book a meeting highlight */}
              <div className="mt-10 p-6 rounded-xl bg-primary text-primary-foreground">
                <h3 className="font-display text-xl font-bold mb-2">Book et møde</h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  Foretrækker du en direkte snak? Book et uforpligtende møde med os.
                </p>
                <Button variant="secondary" size="lg" className="text-base">
                  Book nu
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>);

};

export default Kontakt;