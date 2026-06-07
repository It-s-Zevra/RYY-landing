"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.19, 1, 0.22, 1] as const;
const NAVBAR_OFFSET = 64;

type Theme = "dark" | "light";

function useSectionTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;

    const update = () => {
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-section-theme]",
      );
      const probe = window.scrollY + NAVBAR_OFFSET;
      let next: Theme = "dark";
      for (const el of Array.from(sections)) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (probe >= top && probe < bottom) {
          next = (el.dataset.sectionTheme as Theme) ?? "dark";
          break;
        }
      }
      setTheme(next);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return theme;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const theme = useSectionTheme();

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 60);
  });

  const isLight = theme === "light";

  return (
    <>
      {/* Scroll progress hairline at very top */}
      <motion.div
        className={cn(
          "fixed inset-x-0 top-0 z-[90] h-px origin-left transition-colors duration-500",
          isLight ? "bg-cape" : "bg-mint",
        )}
        style={{ scaleX: progress }}
      />

      {/* Top status bar — desktop · phone only, top-right */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-[60] hidden h-9 items-center backdrop-blur-xl transition-all duration-500 md:flex",
          scrolled && "h-0 overflow-hidden border-transparent",
          isLight
            ? "border-b border-cape/10 bg-porcelain/85 text-cape/65"
            : "border-b border-obsidian/20 bg-cape/85 text-mint/70",
        )}
      >
        <div className="container-page flex items-center justify-end font-mono text-[10px] uppercase tracking-[0.22em]">
          <a
            href={`tel:${site.contact.phoneIntl}`}
            className={cn(
              "flex items-center gap-2 transition-colors",
              isLight ? "hover:text-cape" : "hover:text-mint",
            )}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={cn(
                  "absolute inset-0 animate-ping rounded-full opacity-50",
                  isLight ? "bg-cape" : "bg-mint",
                )}
              />
              <span
                className={cn(
                  "relative h-1.5 w-1.5 rounded-full",
                  isLight ? "bg-cape" : "bg-mint",
                )}
              />
            </span>
            {site.contact.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 z-[70] transition-all duration-500",
          scrolled ? "top-3 md:top-4" : "top-0 md:top-9",
        )}
      >
        <div
          className={cn(
            "container-page transition-all duration-500",
            scrolled && "max-w-[1180px]",
          )}
        >
          <nav
            className={cn(
              "flex items-center justify-between gap-4 transition-all duration-500 lg:grid lg:grid-cols-[1fr_auto_1fr]",
              scrolled
                ? "rounded-pill border px-3 py-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(6,24,42,0.18)] md:px-4 md:py-2.5"
                : "border-b-0 bg-transparent px-0 py-5",
              scrolled &&
                (isLight
                  ? "border-cape/10 bg-porcelain/80"
                  : "border-mint/15 bg-cape/75"),
            )}
          >
            {/* Logo — switches between white/dark by section theme */}
            <Link
              href="/"
              aria-label={`${site.legalName} — Inicio`}
              className="group relative flex items-center justify-self-start"
            >
              <div className="relative">
                <Image
                  src={site.logos.light}
                  alt={site.legalName}
                  width={520}
                  height={300}
                  priority
                  sizes="160px"
                  className={cn(
                    "h-auto w-auto object-contain transition-all duration-500",
                    scrolled ? "max-h-9" : "max-h-11",
                    isLight && "opacity-0",
                  )}
                />
                <Image
                  src={site.logos.dark}
                  alt=""
                  width={520}
                  height={300}
                  sizes="160px"
                  aria-hidden
                  className={cn(
                    "absolute inset-0 h-auto w-auto object-contain transition-all duration-500",
                    scrolled ? "max-h-9" : "max-h-11",
                    isLight ? "opacity-100" : "opacity-0",
                  )}
                />
              </div>
            </Link>

            {/* Center nav with animated indicator — anchored to page center via grid */}
            <ul
              onMouseLeave={() => setHovered(null)}
              className="hidden items-center gap-0.5 justify-self-center lg:flex"
            >
              {site.nav.map((item) => (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setHovered(item.href)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative z-10 block px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors xl:px-4",
                      hovered === item.href
                        ? isLight
                          ? "text-porcelain"
                          : "text-cape"
                        : isLight
                          ? "text-cape/70 hover:text-cape"
                          : "text-mint/75 hover:text-mint",
                    )}
                  >
                    {item.label}
                  </Link>
                  {hovered === item.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className={cn(
                        "absolute inset-0 -z-0 rounded-pill",
                        isLight ? "bg-cape" : "bg-mint",
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>

            {/* Right side */}
            <div className="flex items-center gap-2 justify-self-end">
              <Link
                href="/#contacto"
                className={cn(
                  "group relative hidden items-center gap-2 overflow-hidden rounded-pill px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] shadow-[0_8px_28px_-8px_rgba(218,246,239,0.35)] transition-all duration-300 md:inline-flex",
                  isLight
                    ? "bg-cape text-porcelain hover:bg-cape-700 hover:shadow-[0_10px_32px_-8px_rgba(10,37,54,0.45)]"
                    : "bg-mint text-cape hover:bg-mint-dark hover:shadow-[0_10px_32px_-8px_rgba(218,246,239,0.6)]",
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <span className="relative z-10">Reunámonos · 30 min</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Abrir menú"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-pill border transition-colors lg:hidden",
                  isLight
                    ? "border-cape/30 text-cape hover:bg-cape hover:text-porcelain"
                    : "border-mint/30 text-mint hover:bg-mint hover:text-cape",
                )}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="drawer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[120] bg-cape text-mint"
    >
      <motion.div
        initial={{ y: "-3%" }}
        animate={{ y: 0 }}
        exit={{ y: "-3%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex h-full flex-col"
      >
        <div className="container-page flex h-20 items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            aria-label="Inicio"
            className="flex items-center"
          >
            <Image
              src={site.logos.light}
              alt={site.legalName}
              width={520}
              height={300}
              sizes="120px"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="flex h-11 w-11 items-center justify-center rounded-pill border border-mint/30 text-mint hover:bg-mint hover:text-cape"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="container-page flex-1 pt-6">
          <ul className="space-y-2">
            {site.nav.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.08 * i }}
                className="border-b border-mint/15 py-5"
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-baseline justify-between"
                >
                  <span className="font-serif text-4xl font-medium text-mint sm:text-5xl">
                    {item.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mint/50">
                    0{i + 1}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="container-page space-y-6 pb-12 pt-10">
          <Link
            href="/#contacto"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-pill bg-mint px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-cape"
          >
            Reunámonos · 30 min
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <div className="flex flex-col gap-2 text-mint/70">
            <a href={`tel:${site.contact.phoneIntl}`} className="font-mono text-sm">
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="font-mono text-sm">
              {site.contact.email}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
