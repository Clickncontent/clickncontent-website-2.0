import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { CalendlyButton } from "@/components/CalendlyButton";
import logo from "@/assets/clickncontent_logo.png";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border/20 relative overflow-hidden">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-8 pt-20 pb-10">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/">
              <img src={logo} alt="ClicknContent" className="h-8 w-auto mb-4" />
            </Link>
            <p className="text-sm text-foreground/50 leading-relaxed max-w-xs mb-6">
              Vi skaber højtydende video creatives til paid social, der skalerer din performance på Meta og TikTok.
            </p>
            <div className="flex gap-4 mb-6">
              <a href="https://www.facebook.com/share/14HyErn3TXQ/" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/clickncontent" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/clickncontent/" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/channel/UCeoAmBd65mshWeEKl_WwywA" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <CalendlyButton
              variant="link"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors p-0 h-auto"
            >
              Book et møde
              <ArrowRight className="w-3.5 h-3.5" />
            </CalendlyButton>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-foreground/30 mb-5">Sider</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Forside" },
                { to: "/ydelser", label: "Ydelser" },
                { to: "/cases", label: "Cases" },
                { to: "/om-os", label: "Om Os" },
                { to: "/kontakt", label: "Kontakt" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-foreground/50 hover:text-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-foreground/30 mb-5">Ydelser</h4>
            <ul className="space-y-3 text-sm text-foreground/50">
              <li><Link to="/ydelser" className="hover:text-primary transition-colors">Video & fotoproduktion</Link></li>
              <li><Link to="/ydelser" className="hover:text-primary transition-colors">SoMe & annonce content</Link></li>
              <li><Link to="/ydelser" className="hover:text-primary transition-colors">Annoncering & betalt trafik</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-foreground/30 mb-5">Kontakt</h4>
            <ul className="space-y-3 text-sm text-foreground/50">
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-primary/70" />
                <a href="mailto:kontakt@clickncontent.dk" className="hover:text-primary transition-colors">kontakt@clickncontent.dk</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-primary/70" />
                <a href="tel:+4550129206" className="hover:text-primary transition-colors">+45 50 12 92 06</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-primary/70" />
                <a href="https://maps.google.com/?q=Skovvejen+1,+8000+Aarhus" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Skovvejen 1, 1. sal, Aarhus C, 8000</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground/30">
            © {new Date().getFullYear()} ClicknContent. Alle rettigheder forbeholdes.
          </p>
          <p className="text-xs text-foreground/30">
            Kreativt bureau · Aarhus, Danmark
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
