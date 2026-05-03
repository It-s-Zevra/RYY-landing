"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.19, 1, 0.22, 1] as const;
const INTERVAL = 2600;

type Props = {
  words: readonly string[];
  /** Word used for width measurement — must be the longest. */
  widest: string;
  /** Delay before the first word shows (s). */
  delay?: number;
  className?: string;
};

export function RotatingWord({ words, widest, delay = 0, className }: Props) {
  const [hasAppeared, setHasAppeared] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHasAppeared(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!hasAppeared) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [hasAppeared, words.length]);

  return (
    <span className={`relative inline-block overflow-hidden align-bottom pb-[0.18em] -mb-[0.18em] ${className ?? ""}`}>
      {/* Width spacer — defines container width using the longest word */}
      <span aria-hidden className="invisible italic">
        {widest}
      </span>

      {hasAppeared && (
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-105%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="absolute inset-0 italic text-mint"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
}
