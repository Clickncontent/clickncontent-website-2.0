import { useState, useEffect } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { CalendlyModal } from "@/components/CalendlyModal";
import { useNavigate } from "react-router-dom";

interface CalendlyButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function CalendlyButton({ children, ...props }: CalendlyButtonProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Listen for Calendly's "event scheduled" postMessage
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        e.origin === "https://calendly.com" &&
        e.data?.event === "calendly.event_scheduled"
      ) {
        setOpen(false);
        navigate("/tak-for-din-bestilling");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate]);

  return (
    <>
      <Button onClick={() => setOpen(true)} {...props}>
        {children}
      </Button>
      <CalendlyModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
