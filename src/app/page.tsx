import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Process } from "@/components/sections/Process";
import { Insights } from "@/components/sections/Insights";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Team />
        <Process />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
