import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CalendlyButton } from "@/components/CalendlyButton";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Navn er påkrævet").max(100),
  email: z.string().email("Ugyldig email-adresse"),
  company: z.string().max(100).optional(),
  message: z.string().min(10, "Beskeden skal være mindst 10 tegn").max(2000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Du skal acceptere, at vi må kontakte dig." }),
  }),
});

export default function Kontakt() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      consent: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Noget gik galt. Prøv igen eller ring til os.");
      }

      toast({
        title: "Besked sendt!",
        description: "Vi vender tilbage hurtigst muligt.",
      });
      form.reset();
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fejl",
        description: error.message || "Noget gik galt. Prøv igen eller ring til os.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
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
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send os en besked</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Navn</FormLabel>
                          <FormControl>
                            <Input placeholder="Dit navn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="din@email.dk" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Virksomhed <span className="text-muted-foreground font-normal">(Valgfri)</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Din virksomhed" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Besked</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Fortæl os om dit projekt..." rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal text-sm cursor-pointer">
                            Jeg accepterer, at ClicknContent må kontakte mig angående min henvendelse.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full sm:w-auto text-base px-8 h-12" disabled={isSubmitting}>
                    {isSubmitting ? "Sender..." : (
                      <>
                        Send besked
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
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
                    <p className="text-muted-foreground">+45 50 12 92 06</p>
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
                {/* Note: CalendlyButton applied in Phase 3 */}
                <CalendlyButton variant="secondary" size="lg" className="text-base font-bold">
                  Book et kald
                </CalendlyButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}