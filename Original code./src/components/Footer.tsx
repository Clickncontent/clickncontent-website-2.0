import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-8 pt-20 pb-10">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-2xl font-bold mb-4">
              Click<span className="text-primary">n</span>Content
            </h3>
            <p className="text-sm text-primary-foreground/50 leading-relaxed max-w-xs mb-6">
              Vi skaber højtydende video creatives til paid social, der skalerer din performance på Meta og TikTok.
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
            >
              Book et møde
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-primary-foreground/30 mb-5">Sider</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Forside" },
                { to: "/ydelser", label: "Ydelser" },
                { to: "/cases", label: "Cases" },
                { to: "/om-os", label: "Om Os" },
                { to: "/kontakt", label: "Kontakt" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-primary-foreground/50 hover:text-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-primary-foreground/30 mb-5">Ydelser</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/50">
              <li>Kreativ Strategi</li>
              <li>Videoproduktion</li>
              <li>Creative Testing</li>
              <li>Performance Analyse</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-primary-foreground/30 mb-5">Kontakt</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/50">
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-primary/70" />
                hej@clickncontent.dk
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-primary/70" />
                +45 12 34 56 78
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-primary/70" />
                København, Danmark
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} ClicknContent. Alle rettigheder forbeholdes.
          </p>
          <p className="text-xs text-primary-foreground/30">
            Kreativt bureau · København, Danmark
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
