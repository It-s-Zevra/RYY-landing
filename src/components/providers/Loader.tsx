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
          {/* Banner image — cinematic backdrop */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={
              phase === "out"
                ? { opacity: 0, scale: 1.12 }
                : { opacity: 1, scale: 1 }
            }
            transition={{
              duration: phase === "out" ? 0.75 : 1.6,
              ease: EASE,
            }}
          >
            <Image
              src={site.banner}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={90}
              className="object-cover object-center"
            />
          </motion.div>

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

          {/* Editorial darkening — keeps banner legible while ensuring caption contrast */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-cape/35"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cape via-cape/30 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,transparent_25%,rgba(6,24,42,0.55)_100%)]"
          />

          {/* Logo + cinematic shimmer */}
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
              delay: phase === "in" ? 0.35 : 0,
            }}
            className="relative z-10"
          >
            {/* Soft glow halo — breathes once */}
            <motion.span
              aria-hidden
              className="absolute -inset-12 rounded-full bg-mint/15 blur-3xl"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={
                phase === "in"
                  ? { opacity: [0, 0.7, 0.35], scale: [0.7, 1.05, 1] }
                  : { opacity: 0 }
              }
              transition={{ duration: 2.2, ease: EASE, delay: 0.4 }}
            />

            <div className="relative">
              <motion.div
                animate={
                  phase === "in"
                    ? {
                        filter: [
                          "drop-shadow(0 0 0 rgba(218,246,239,0))",
                          "drop-shadow(0 0 32px rgba(218,246,239,0.5))",
                          "drop-shadow(0 0 14px rgba(218,246,239,0.18))",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, ease: EASE, delay: 0.5 }}
              >
                <Image
                  src={site.logos.light}
                  alt=""
                  width={680}
                  height={400}
                  priority
                  sizes="(min-width: 1024px) 24rem, (min-width: 768px) 18rem, 12rem"
                  className="h-auto w-[12rem] md:w-[16rem] lg:w-[22rem]"
                />
              </motion.div>

              {/* Light sweep */}
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
                transition={{ duration: 1.7, ease: EASE, delay: 0.8 }}
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
            className="relative z-10 mt-14 flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.32em] text-mint/65"
          >
            <span className="h-px w-12 bg-mint/35" />
            Rivas <span className="text-mint/35">·</span> Yuraszeck
            <span className="h-px w-12 bg-mint/35" />
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
            className="relative z-10 mt-3 font-mono text-[9px] uppercase tracking-[0.4em] text-mint/35"
          >
            Estudio jurídico · Santiago de Chile
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
