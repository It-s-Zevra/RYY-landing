"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.19, 1, 0.22, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0 },
};

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as];

  if (prefersReduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MaskReveal({
  children,
  className,
  delay = 0,
  eager = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Skip viewport detection — use for above-the-fold content. */
  eager?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced)
    return <span className={className}>{children}</span>;

  const motionProps = eager
    ? { initial: { y: "110%" }, animate: { y: "0%" } }
    : {
        initial: { y: "110%" },
        whileInView: { y: "0%" },
        viewport: { once: true, margin: "-40px" },
      };

  return (
    <span className={`inline-block overflow-hidden align-bottom ${className ?? ""}`}>
      <motion.span
        className="inline-block"
        transition={{ duration: 0.95, ease: EASE, delay }}
        {...motionProps}
      >
        {children}
      </motion.span>
    </span>
  );
}
