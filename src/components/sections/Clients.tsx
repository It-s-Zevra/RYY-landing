"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const EDGE_MASK =
  "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)";

function shuffle(arr: readonly string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Clients() {
  // Server renders the canonical order; the client reshuffles on mount so the
  // sequence is different (and random) on every visit.
  const [logos, setLogos] = useState<string[]>(() => [...site.clients]);
  useEffect(() => setLogos(shuffle(site.clients)), []);

  return (
    <section
      aria-label="Empresas que confían en RY Legal"
      data-section-theme="light"
      className="relative overflow-hidden bg-porcelain text-cape"
    >
      <div className="container-page pt-20 md:pt-28">
        <Reveal>
          <p className="eyebrow flex items-center justify-center gap-3 text-center text-cape/45">
            <span className="h-px w-8 bg-cape/20" />
            Empresas que confían en nosotros
            <span className="h-px w-8 bg-cape/20" />
          </p>
        </Reveal>
      </div>

      <div
        className="group relative mt-12 pb-20 md:mt-16 md:pb-28"
        style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
      >
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
            >
              {logos.map((src, i) => (
                <li
                  key={`${copy}-${i}`}
                  className="relative h-16 w-44 shrink-0 md:h-24 md:w-60"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 240px, 176px"
                    className="object-contain opacity-50 transition-all duration-500 ease-out-expo group-hover:opacity-75 hover:!opacity-100"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
