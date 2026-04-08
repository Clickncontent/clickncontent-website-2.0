import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    } else if (consent === "all") {
      injectFB();
    }
  }, []);

  const injectFB = () => {
    if (document.getElementById("fb-pixel")) return;
    const script = document.createElement("script");
    script.id = "fb-pixel";
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '826386112897059');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  };

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    injectFB();
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  const handleSaveSettings = () => {
    // If they click 'Gem indstillinger' without any toggles, treat as declined for FB pixel
    localStorage.setItem("cookie-consent", "partial");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      <div className="container mx-auto p-4 lg:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8">
        <div className="flex-1 pr-6">
          <h3 className="font-display font-semibold text-foreground mb-1">Vi bruger cookies 🍪</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Vi og vores samarbejdspartnere bruger cookies og lignende teknologier til at analysere trafik, 
            levere funktioner på sociale medier og målrette annoncer. Du kan altid ændre dit samtykke.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 lg:gap-3 w-full lg:w-auto">
          <Button variant="outline" size="sm" onClick={handleDeclineAll} className="flex-1 lg:flex-none">
            Afvis alle
          </Button>
          <Button variant="secondary" size="sm" onClick={handleSaveSettings} className="flex-1 lg:flex-none">
            Gem indstillinger
          </Button>
          <Button size="sm" onClick={handleAcceptAll} className="flex-1 lg:flex-none shadow-primary/20">
            Accepter alle
          </Button>
        </div>
        
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Luk banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
