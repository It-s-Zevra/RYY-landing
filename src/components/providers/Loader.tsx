"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const EASE = [0.19, 1, 0.22, 1] as const;
const HOLD = 2400;

export function Loader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("ryy:loader")) {
      setPhase("done");
      return;
    }

    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("out"), HOLD);
    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("ryy:loader", "1");
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    }, HOLD + 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-cape"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          {/* Atmospheric radial mint glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[85vmin] w-[85vmin] rounded-full bg-mint/[0.07] blur-3xl"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={
              phase === "out"
                ? { scale: 1.4, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: phase === "out" ? 0.8 : 1.6, ease: EASE }}
          />

          {/* Vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,transparent_25%,rgba(6,24,42,0.6)_100%)]"
          />

          {/* Logo block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
            animate={
              phase === "out"
                ? {
                    opacity: 0,
                    scale: 1.04,
                    y: -16,
                    filter: "blur(0px)",
                  }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{
              duration: phase === "out" ? 0.75 : 1.3,
              ease: EASE,
              delay: phase === "in" ? 0.15 : 0,
            }}
            className="relative"
          >
            {/* Soft glow halo — breathes once */}
            <motion.span
              aria-hidden
              className="absolute -inset-12 rounded-full bg-mint/20 blur-3xl"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={
                phase === "in"
                  ? { opacity: [0, 0.85, 0.45], scale: [0.7, 1.05, 1] }
                  : { opacity: 0 }
              }
              transition={{ duration: 2.2, ease: EASE, delay: 0.3 }}
            />

            {/* Logo with shimmer sweep */}
            <div className="relative">
              <motion.div
                animate={
                  phase === "in"
                    ? {
                        filter: [
                          "drop-shadow(0 0 0 rgba(218,246,239,0))",
                          "drop-shadow(0 0 32px rgba(218,246,239,0.55))",
                          "drop-shadow(0 0 12px rgba(218,246,239,0.18))",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, ease: EASE, delay: 0.4 }}
              >
                <Image
                  src={site.logos.light}
                  alt=""
                  width={680}
                  height={400}
                  priority
                  sizes="(min-width: 1024px) 28rem, (min-width: 768px) 22rem, 14rem"
                  className="h-auto w-[14rem] md:w-[20rem] lg:w-[26rem]"
                />
              </motion.div>

              {/* Cinematic light sweep */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 30%, rgba(218,246,239,0.85) 50%, transparent 70%)",
                  backgroundSize: "250% 100%",
                }}
                initial={{ backgroundPositionX: "220%" }}
                animate={
                  phase === "in" ? { backgroundPositionX: "-120%" } : {}
                }
                transition={{ duration: 1.7, ease: EASE, delay: 0.7 }}
              />
            </div>
          </motion.div>

          {/* Editorial caption */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={
              phase === "out"
                ? { opacity: 0, y: -10 }
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: phase === "out" ? 0.45 : 0.9,
              ease: EASE,
              delay: phase === "out" ? 0 : 1.4,
            }}
            className="mt-14 flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.32em] text-mint/55"
          >
            <span className="h-px w-12 bg-mint/30" />
            Rivas <span className="text-mint/30">·</span> Yuraszeck
            <span className="h-px w-12 bg-mint/30" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={
              phase === "out" ? { opacity: 0 } : { opacity: 1 }
            }
            transition={{
              duration: 0.6,
              ease: EASE,
              delay: phase === "out" ? 0 : 1.7,
            }}
            className="mt-3 font-mono text-[9px] uppercase tracking-[0.4em] text-mint/30"
          >
            Estudio jurídico · Santiago de Chile
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
