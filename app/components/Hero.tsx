"use client";

import { useEffect, useState } from "react";
import CodeRain from "./CodeRain";
import { Arrow, LangSwitch, ScrollLink, ThemeToggle, Tx, goTo, useSite } from "./ui";

function Typer() {
  const { t, lang } = useSite();
  const phrases = t.hero.phrases;
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    setI(0);
    setTxt("");
    setDel(false);
  }, [lang]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTxt(phrases[0]);
      return;
    }
    const full = phrases[i] ?? phrases[0];
    const id = setTimeout(
      () => {
        if (!del) {
          setTxt(full.slice(0, txt.length + 1));
          if (txt.length + 1 === full.length) setTimeout(() => setDel(true), 1500);
        } else {
          setTxt(full.slice(0, txt.length - 1));
          if (txt.length - 1 <= 0) {
            setDel(false);
            setI((i + 1) % phrases.length);
          }
        }
      },
      del ? 25 : 60,
    );
    return () => clearTimeout(id);
  }, [txt, del, i, phrases]);

  return (
    <span className="text-acct">
      {txt}
      <span className="caret" />
    </span>
  );
}

function Letters({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span key={i} className="inline-block cursor-default transition-all duration-300 hover:-translate-y-2 hover:text-acct">
          {c}
        </span>
      ))}
    </>
  );
}

const LINKS = [
  ["trabajo", "work"],
  ["planos", "plans"],
  ["contacto", "contact"],
] as const;

function NavBar() {
  const { t } = useSite();
  const [active, setActive] = useState("");
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
      let cur = "";
      for (const [id] of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = id;
      }
      setActive(cur);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <nav aria-label="Secciones" className="order-last flex w-full justify-center gap-7 pb-1 text-xs md:order-none md:w-auto md:pb-0">
        {LINKS.map(([id, k]) => (
          <ScrollLink key={id} id={id} className={`relative py-1 transition ${active === id ? "text-fg" : "text-mute hover:text-fg"}`}>
            <Tx>{t.nav[k]}</Tx>
            <span className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-acct transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] ${active === id ? "scale-x-100" : "scale-x-0"}`} />
          </ScrollLink>
        ))}
      </nav>
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left bg-acct" style={{ transform: `scaleX(${p})` }} />
    </>
  );
}

export default function Hero() {
  const { t, lang } = useSite();
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3">
          <a href="#" onClick={(e) => { e.preventDefault(); goTo(""); }} className="text-sm font-bold">
            jhalddry<span className="text-acct">.dev</span>
          </a>
          <NavBar />
          <div className="flex items-center gap-2">
            <LangSwitch />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <CodeRain />
        <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-5 pb-16 pt-32 md:pt-28">
        <p className="text-sm text-mute">
          <span className="text-acct">&gt;</span> <Tx>{t.hero.hi}</Tx>
        </p>
        <h1 aria-label="Jhalddry González" className="mt-2 text-[clamp(2.7rem,10vw,7.4rem)] font-extrabold leading-[0.95] tracking-tighter">
          <span aria-hidden>
            <Letters text="Jhalddry" />
            <br />
            <Letters text="González" />
          </span>
        </h1>
        <p className="mt-10 text-[clamp(1.2rem,3.4vw,2.1rem)] font-bold leading-snug">
          <Tx>{t.hero.pre}</Tx>
          <br />
          <Typer />
        </p>
        <p className="mt-8 max-w-xl text-mute">
          <Tx>{t.hero.intro}</Tx>
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
          <ScrollLink id="contacto" className="group inline-flex items-center gap-2 rounded-full bg-acc px-6 py-3 font-bold text-black transition hover:brightness-110">
            <Tx>{t.hero.cta}</Tx> <Arrow className="transition group-hover:translate-x-1" />
          </ScrollLink>
          <a href={`/cv/${lang}`} download className="ul text-mute transition hover:text-fg">
            <Tx>{t.hero.cv}</Tx>
          </a>
        </div>
        <ScrollLink id="trabajo" className="mt-20 inline-flex w-fit flex-col items-center gap-2 text-xs text-mute transition hover:text-acct" aria-label={t.hero.scroll}>
          <Tx>{t.hero.scroll}</Tx>
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-4 animate-[scrolly_1.5s_ease-in-out_infinite] bg-acct" />
          </span>
        </ScrollLink>
      </section>
      </div>
    </>
  );
}
