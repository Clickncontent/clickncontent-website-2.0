"use client";
import { useState, useEffect } from "react";

const CHARS = "!<>_[]{}—=+*^?#_";

export function useTextScramble(text: string, trigger: boolean = true) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!trigger) return;
    
    let frame = 0;
    const length = text.length;
    let timeout: NodeJS.Timeout;

    const animate = () => {
      let output = "";
      for (let i = 0; i < length; i++) {
        if (frame >= i * 2) { // Reveal character by character 
          output += text[i];
        } else {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayText(output);

      if (frame < length * 2) {
        frame++;
        timeout = setTimeout(animate, 30);
      }
    };

    animate();
    return () => clearTimeout(timeout);
  }, [text, trigger]);

  return displayText;
}
