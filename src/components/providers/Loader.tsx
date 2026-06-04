"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const EASE = [0.19, 1, 0.22, 1] as const;
const HOLD = 2200;

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
    }, HOLD + 1000);

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
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* Flat backdrop with a single soft radial glow — no imagery */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[80vmin] w-[80vmin] rounded-full bg-mint/[0.06] blur-3xl"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={
              phase === "out"
                ? { scale: 1.25, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: phase === "out" ? 0.7 : 1.5, ease: EASE }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,transparent_30%,rgba(6,24,42,0.6)_100%)]"
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
            animate={
              phase === "out"
                ? { opacity: 0, scale: 1.03, y: -12, filter: "blur(0px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{
              duration: phase === "out" ? 0.7 : 1.2,
              ease: EASE,
              delay: phase === "in" ? 0.25 : 0,
            }}
            className="relative z-10"
          >
            {/* Soft glow halo — breathes once */}
            <motion.span
              aria-hidden
              className="absolute -inset-10 rounded-full bg-mint/12 blur-3xl"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={
                phase === "in"
                  ? { opacity: [0, 0.6, 0.3], scale: [0.7, 1.05, 1] }
                  : { opacity: 0 }
              }
              transition={{ duration: 2, ease: EASE, delay: 0.35 }}
            />

            <div className="relative">
              <motion.div
                animate={
                  phase === "in"
                    ? {
                        filter: [
                          "drop-shadow(0 0 0 rgba(218,246,239,0))",
                          "drop-shadow(0 0 26px rgba(218,246,239,0.45))",
                          "drop-shadow(0 0 12px rgba(218,246,239,0.16))",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.8, ease: EASE, delay: 0.45 }}
              >
                <Image
                  src={site.logos.light}
                  alt=""
                  width={680}
                  height={400}
                  priority
                  sizes="(min-width: 1024px) 15rem, (min-width: 768px) 12rem, 9rem"
                  className="h-auto w-[9rem] md:w-[12rem] lg:w-[15rem]"
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
                animate={phase === "in" ? { backgroundPositionX: "-120%" } : {}}
                transition={{ duration: 1.6, ease: EASE, delay: 0.7 }}
              />
            </div>
          </motion.div>

          {/* Editorial caption */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={
              phase === "out" ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }
            }
            transition={{
              duration: phase === "out" ? 0.4 : 0.85,
              ease: EASE,
              delay: phase === "out" ? 0 : 1.2,
            }}
            className="relative z-10 mt-12 flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.32em] text-mint/65"
          >
            <span className="h-px w-12 bg-mint/35" />
            Rivas <span className="text-mint/35">·</span> Yuraszeck
            <span className="h-px w-12 bg-mint/35" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={phase === "out" ? { opacity: 0 } : { opacity: 1 }}
            transition={{
              duration: 0.55,
              ease: EASE,
              delay: phase === "out" ? 0 : 1.5,
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
