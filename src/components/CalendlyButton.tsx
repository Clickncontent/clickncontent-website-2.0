import { Button, ButtonProps } from "@/components/ui/button";

interface CalendlyButtonProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function CalendlyButton({ children, onClick, ...props }: CalendlyButtonProps) {
  const handleOpenCalendly = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    
    const url = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/clickncontent';
    
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url });
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <Button onClick={handleOpenCalendly} {...props}>
      {children}
    </Button>
  );
}
