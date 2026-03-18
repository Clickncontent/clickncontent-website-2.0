import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Linkedin, Instagram } from "lucide-react";
import bartoszImg from "@/assets/team/bartosz.jpg";
import kasperImg from "@/assets/team/kasper.jpg";
import stigImg from "@/assets/team/stig.jpg";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  image: string;
  description: string;
  linkedin?: string;
  instagram?: string;
}

const team: TeamMember[] = [
  {
    name: "Bartozs Otreba",
    role: "Co-Founder & head of sales",
    initials: "BO",
    image: bartoszImg,
    description:
      "Bartozs driver salg og partnerskaber hos ClicknContent. Med sin energi og passion for performance marketing sørger han for, at vi altid matcher de rigtige brands med de rigtige løsninger.",
  },
  {
    name: "Kasper Olander Linder",
    role: "Co-founder & head of operations",
    initials: "KOL",
    image: kasperImg,
    description:
      "Kasper sikrer at alt kører gnidningsfrit bag kulisserne. Fra projektledelse til leverancer – han holder styr på processerne, så teamet kan fokusere på det kreative.",
  },
  {
    name: "Stig Stryhn Larsen",
    role: "Co-Founder & head of creatives",
    initials: "SSL",
    image: stigImg,
    description:
      "Stig er hjernen bag det kreative output. Han leder den visuelle retning og sørger for, at hvert creative ikke bare ser godt ud – men performer.",
  },
];

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Mød <span className="text-primary">teamet</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="group relative bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-border/50"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* + Button */}
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 cursor-pointer"
                    aria-label={`Læs mere om ${member.name}`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-display font-semibold text-foreground text-lg">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
              onClick={() => setSelectedMember(null)}
            />

            {/* Content */}
            <motion.div
              className="relative bg-background rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto border border-border/50"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors cursor-pointer shadow-md"
                aria-label="Luk"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large photo */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Details */}
              <div className="p-6 lg:p-8">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {selectedMember.name}
                </h3>
                <p className="text-primary font-medium mt-1">
                  {selectedMember.role}
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {selectedMember.description}
                </p>

                {/* Social icons */}
                <div className="flex gap-3 mt-6">
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {selectedMember.instagram && (
                    <a
                      href={selectedMember.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TeamSection;
