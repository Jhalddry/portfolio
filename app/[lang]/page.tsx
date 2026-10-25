import { notFound } from "next/navigation";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Plans from "../components/Plans";
import Stack from "../components/Stack";
import Contact from "../components/Contact";
import { SiteProvider } from "../components/ui";
import { EMAIL, GITHUB, LANGS, LINKEDIN, SEO, SITE_URL, STACK_A, STACK_B, type Lang } from "../data";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) notFound();
  const l = lang as Lang;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jhalddry González",
    jobTitle: SEO[l].role,
    description: SEO[l].description,
    url: `${SITE_URL}/${l}`,
    email: `mailto:${EMAIL}`,
    address: { "@type": "PostalAddress", addressLocality: "Maturín", addressCountry: "VE" },
    sameAs: [LINKEDIN, GITHUB],
    knowsLanguage: ["es", "en"],
    knowsAbout: [...STACK_A, ...STACK_B],
    inLanguage: l,
  };

  return (
    <SiteProvider initialLang={l}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <Hero />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Products />
        <Plans />
        <Stack />
        <Contact />
      </main>
      <footer className="border-t border-line px-5 py-8 text-center text-xs text-mute">
        Jhalddry González · Maturín, Venezuela · {new Date().getFullYear()}
      </footer>
    </SiteProvider>
  );
}
