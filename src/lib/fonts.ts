import { Spectral, Inter, JetBrains_Mono } from "next/font/google";

export const spectral = Spectral({
  subsets: ["latin"],
  variable: "--font-spectral",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});
