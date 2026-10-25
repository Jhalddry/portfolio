"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { COPY, SEO, type Copy, type Lang } from "../data";

/* ---------- contexto: idioma y tema ---------- */
type Theme = "dark" | "light";
type Site = { lang: Lang; setLang: (l: Lang) => void; theme: Theme; toggleTheme: (e: React.MouseEvent) => void; t: Copy };
const Ctx = createContext<Site>({ lang: "es", setLang: () => {}, theme: "dark", toggleTheme: () => {}, t: COPY.es });
export const useSite = () => useContext(Ctx);

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SiteProvider({ children, initialLang }: { children: ReactNode; initialLang: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = SEO[lang].title;
  }, [lang]);

  /* cambia el idioma sin recargar y deja la URL en /es o /en */
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.cookie = `jg-lang=${l}; path=/; max-age=31536000; samesite=lax`;
    window.history.replaceState(null, "", `/${l}${window.location.hash}`);
  }, []);

  const toggleTheme = useCallback((e: React.MouseEvent) => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      setTheme(next);
      try {
        localStorage.setItem("jg-theme", next);
      } catch {}
    };
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    type VT = { ready: Promise<void> };
    const start = (document as unknown as { startViewTransition?: (cb: () => void) => VT }).startViewTransition?.bind(document);
    if (!start || reducedMotion()) return apply();
    const vt = start(() => flushSync(apply));
    vt.ready.then(() => {
      const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] },
        { duration: 850, easing: "cubic-bezier(.65,0,.35,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }, []);

  return <Ctx.Provider value={{ lang, setLang, theme, toggleTheme, t: COPY[lang] }}>{children}</Ctx.Provider>;
}

/* ---------- texto que se "descifra" al cambiar de idioma ---------- */
const GLYPHS = "01<>/{}[]_$#=+*";
export function Tx({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(children);
  const raf = useRef(0);
  useIso(() => {
    const el = ref.current;
    const node = el?.firstChild;
    if (!el || !node || prev.current === children) {
      prev.current = children;
      return;
    }
    prev.current = children;
    const box = el.getBoundingClientRect();
    if (reducedMotion() || box.bottom < 0 || box.top > innerHeight) return;
    cancelAnimationFrame(raf.current);
    const target = children;
    const t0 = performance.now();
    const dur = Math.min(950, 380 + target.length * 5);
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const n = Math.floor(p * target.length);
      let s = target.slice(0, n);
      for (let i = n; i < target.length; i++) s += target[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      node.nodeValue = p < 1 ? s : target;
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [children]);
  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}

/* ---------- controles ---------- */
export function ThemeToggle() {
  const { theme, toggleTheme } = useSite();
  const dark = theme === "dark";
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <button type="button" onClick={toggleTheme} aria-label={dark ? "Modo claro / Light mode" : "Modo oscuro / Dark mode"} className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg transition hover:border-acct hover:text-acct">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <mask id="moon-mask">
          <rect width="24" height="24" fill="#fff" />
          <circle cx="12" cy="12" r="6" fill="#000" style={{ transform: dark ? "translate(6px,-6px)" : "translate(24px,-24px)", transition: "transform .6s cubic-bezier(.65,0,.35,1)" }} />
        </mask>
        <circle cx="12" cy="12" fill="currentColor" stroke="none" mask="url(#moon-mask)" style={{ r: dark ? 9 : 5, transition: "r .6s cubic-bezier(.65,0,.35,1)" }} />
        <g style={{ transformOrigin: "12px 12px", transform: dark ? "rotate(-90deg) scale(0)" : "rotate(0deg) scale(1)", transition: "transform .6s cubic-bezier(.65,0,.35,1)" }}>
          {rays.map((a) => (
            <line key={a} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${a} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}

export function LangSwitch() {
  const { lang, setLang } = useSite();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={lang === "en"}
      aria-label="Idioma / Language"
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className="relative flex h-9 items-center overflow-hidden rounded-full border border-line text-xs transition hover:border-acct"
    >
      <span className="absolute inset-y-0 w-1/2 bg-acc transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)]" style={{ transform: lang === "en" ? "translateX(100%)" : "none" }} />
      <span className={`relative z-10 w-9 text-center font-bold transition-colors ${lang === "es" ? "text-black" : "text-mute"}`}>ES</span>
      <span className={`relative z-10 w-9 text-center font-bold transition-colors ${lang === "en" ? "text-black" : "text-mute"}`}>EN</span>
    </button>
  );
}

/* ---------- fondo que reacciona al cursor ---------- */
export function useSpot<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const leave = () => {
      el.style.setProperty("--mx", "-400px");
      el.style.setProperty("--my", "-400px");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return ref;
}

/* ---------- scroll suave con curva propia + efecto al llegar ---------- */
let cancelScroll = () => {};
export function goTo(id: string) {
  const el = id ? document.getElementById(id) : null;
  const top = el ? Math.max(0, el.getBoundingClientRect().top + window.scrollY - 52) : 0;
  const land = () => {
    history.replaceState(null, "", id ? `#${id}` : location.pathname);
    if (!el) return;
    el.setAttribute("data-hit", "true");
    setTimeout(() => el.removeAttribute("data-hit"), 1300);
  };
  cancelScroll();
  if (reducedMotion()) {
    window.scrollTo({ top, behavior: "instant" });
    return land();
  }
  const start = window.scrollY;
  const dist = top - start;
  const dur = Math.min(1300, Math.max(600, Math.abs(dist) * 0.42));
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let t0 = 0;
  let stop = false;
  let raf = 0;
  const abort = () => {
    stop = true;
    cancelAnimationFrame(raf);
  };
  cancelScroll = abort;
  window.addEventListener("wheel", abort, { once: true, passive: true });
  window.addEventListener("touchstart", abort, { once: true, passive: true });
  const step = (now: number) => {
    if (stop) return;
    if (!t0) t0 = now;
    const p = Math.min(1, (now - t0) / dur);
    window.scrollTo({ top: start + dist * ease(p), behavior: "instant" });
    if (p < 1) raf = requestAnimationFrame(step);
    else {
      window.removeEventListener("wheel", abort);
      window.removeEventListener("touchstart", abort);
      land();
    }
  };
  raf = requestAnimationFrame(step);
}

export function ScrollLink({ id, className, children, ...rest }: { id: string; className?: string; children: ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  return (
    <a
      {...rest}
      href={`#${id}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        goTo(id);
      }}
    >
      {children}
    </a>
  );
}

/* ---------- utilidades ---------- */
export function Arrow({ dir = "right", className = "" }: { dir?: "right" | "up-right" | "left"; className?: string }) {
  const d = dir === "right" ? "M2 8h11M9 4l4 4-4 4" : dir === "left" ? "M14 8H3M7 4L3 8l4 4" : "M4 12L12 4M5 4h7v7";
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={`inline-block ${className}`} aria-hidden>
      <path d={d} />
    </svg>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Heading({ children }: { children: string }) {
  return (
    <Reveal>
      <h2 className="hd mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-mute">
        <span className="h-1.5 w-1.5 rounded-full bg-acct" />
        <Tx>{children}</Tx>
      </h2>
    </Reveal>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-acct/40 px-3 py-0.5 text-xs text-acct">{children}</span>;
}
