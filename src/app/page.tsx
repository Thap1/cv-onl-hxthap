import { getLocale } from "next-intl/server";
import { Navigation } from "@/components/ui/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { EasterEggs } from "@/components/ui/EasterEggs";
import { CursorEffect } from "@/components/ui/CursorEffect";

export default async function Home() {
  const locale = await getLocale();

  return (
    <main className="relative">
      <CursorEffect />
      <Navigation />
      <Hero locale={locale} />
      <About locale={locale} />
      <Skills locale={locale} />
      <Experience locale={locale} />
      <Projects locale={locale} />
      <Education locale={locale} />
      <Contact locale={locale} />
      <EasterEggs />
    </main>
  );
}
