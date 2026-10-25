import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LANGS, SEO, SITE_URL, type Lang } from "../data";
import "../globals.css";

const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

const themeScript = `try{var t=localStorage.getItem('jg-theme');if(!t){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) return {};
  const l = lang as Lang;
  const other: Lang = l === "es" ? "en" : "es";
  const s = SEO[l];
  return {
    metadataBase: new URL(SITE_URL),
    title: s.title,
    description: s.description,
    alternates: {
      canonical: `/${l}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      url: `/${l}`,
      siteName: "Jhalddry González",
      title: s.title,
      description: s.description,
      locale: s.locale,
      alternateLocale: SEO[other].locale,
    },
    twitter: { card: "summary_large_image", title: s.title, description: s.description },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) notFound();
  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${mono.variable} antialiased`}>
        <a
          href="#contenido"
          className="fixed left-3 top-3 z-[100] -translate-y-20 rounded-full bg-acc px-4 py-2 text-sm font-bold text-black transition focus:translate-y-0"
        >
          {SEO[lang as Lang].skip}
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
