"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.6 });
  const prefersReduced = useReducedMotion();

  function handleMove(e: React.MouseEvent) {
    if (prefersReduced || !ref.current) return;
    const rect = (ref.current as HTMLElement).getBoundingClientRect();
    const cx = e.clientX - (rect.left + rect.width / 2);
    const cy = e.clientY - (rect.top + rect.height / 2);
    x.set(cx * 0.25);
    y.set(cy * 0.35);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const styles =
    variant === "primary"
      ? "bg-mint text-cape hover:bg-mint-dark"
      : variant === "outline"
        ? "border border-mint/40 text-mint hover:border-mint hover:bg-mint hover:text-cape"
        : "text-current hover:opacity-80";

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-pill px-7 py-3.5 font-mono text-eyebrow uppercase tracking-widest transition-colors will-change-transform";

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: sx, y: sy }}
        className={cn(base, styles, className)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={cn(base, styles, className)}
    >
      {children}
    </motion.button>
  );
}
