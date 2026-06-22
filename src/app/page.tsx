import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Insights } from "@/components/sections/Insights";
import { Contact } from "@/components/sections/Contact";
import { getLatestPosts } from "@/lib/blog";

export const revalidate = 300;

export default async function HomePage() {
  const posts = await getLatestPosts(3);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Manifesto />
        <Services />
        <Process />
        <Insights posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
