import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

// Editorial display serif — premium optical, used for headlines.
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

// Geist — the AI/SaaS grotesque, used for body, UI and mono.
export const geistSans = GeistSans;
export const geistMono = GeistMono;
