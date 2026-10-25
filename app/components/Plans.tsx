"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Heading, Reveal, Tx, useSite } from "./ui";

export default function Plans() {
  const { t } = useSite();
  const [tab, setTab] = useState(0);
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(true);
  const [seen, setSeen] = useState(false);
  const root = useRef<HTMLElement>(null);

  const scheme = t.plans.schemes[tab];
  const n = scheme.steps.length;

  /* rejilla que se enciende cerca del cursor */
  useEffect(() => {
    const el = root.current;
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
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      io.disconnect();
    };
  }, []);

  /* avance automático */
  useEffect(() => {
    if (!play || !seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStep((s) => (s + 1) % n), 2600);
    return () => clearInterval(id);
  }, [play, seen, n, tab]);

  const choose = (i: number) => {
    setTab(i);
    setStep(0);
  };
  const pick = (i: number) => {
    setStep(i);
    setPlay(false);
  };

  return (
    <section id="planos" ref={root} className="bp scroll-mt-16 border-y border-line py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <Heading>{t.plans.label}</Heading>
        <Reveal>
          <h2 className="max-w-3xl text-[clamp(1.6rem,4vw,2.6rem)] font-extrabold leading-tight tracking-tighter">
            <Tx>{t.plans.title}</Tx>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-mute">
            <Tx>{t.plans.intro}</Tx>
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div role="group" aria-label={t.plans.label} className="flex flex-wrap gap-2">
            {t.plans.schemes.map((s, i) => (
              <button
                key={s.tab}
                aria-pressed={i === tab}
                onClick={() => choose(i)}
                className={`rounded-full border px-5 py-2 text-xs transition ${i === tab ? "border-acc bg-acc font-bold text-black" : "border-line bg-bg/70 text-mute hover:border-acct hover:text-fg"}`}
              >
                {s.tab}
              </button>
            ))}
          </div>

          {/* esquema */}
          <div key={tab} className="rise mt-8 flex flex-col items-stretch md:flex-row md:items-stretch">
            {scheme.steps.map((s, i) => (
              <Fragment key={s.t}>
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={i === step}
                  className={`card relative flex-1 rounded-2xl p-4 text-left backdrop-blur transition-all duration-300 ${
                    i === step ? "-translate-y-1 border-acct shadow-[0_0_0_1px_var(--acct),0_12px_40px_-14px_var(--acct)]" : "border-line hover:border-mute"
                  }`}
                >
                  <span className={`text-[11px] transition-colors ${i === step ? "text-acct" : "text-mute"}`}>0{i + 1}</span>
                  <span className="mt-1 block text-sm font-bold leading-snug">{s.t}</span>
                </button>
                {i < n - 1 && <span className="conn h-7 w-px self-center md:h-px md:w-8" data-on={i === step ? "true" : "false"} aria-hidden />}
              </Fragment>
            ))}
          </div>

          {/* detalle del paso */}
          <div className="card mt-6 rounded-3xl p-6 backdrop-blur md:p-8">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs text-acct">
                <Tx>{scheme.title}</Tx>
              </p>
              <div className="flex shrink-0 items-center gap-3 text-xs text-mute">
                <span>
                  <Tx>{t.plans.step}</Tx> {step + 1}/{n}
                </span>
                <button type="button" onClick={() => setPlay((p) => !p)} className="rounded-full border border-line px-4 py-1 transition hover:border-acct hover:text-acct">
                  <Tx>{play ? t.plans.pause : t.plans.play}</Tx>
                </button>
              </div>
            </div>
            <div key={`${tab}-${step}`} className="rise mt-4">
              <h3 className="text-xl font-extrabold tracking-tight md:text-2xl">
                <Tx>{scheme.steps[step].t}</Tx>
              </h3>
              <p className="mt-2 max-w-2xl text-mute">
                <Tx>{scheme.steps[step].d}</Tx>
              </p>
            </div>
            <div className="mt-6 flex gap-1.5" aria-hidden>
              {scheme.steps.map((s, i) => (
                <span key={s.t} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-acct" : "bg-line"}`} />
              ))}
            </div>
            <p className="mt-5 border-t border-line pt-4 text-xs text-mute">
              <Tx>{scheme.note}</Tx>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
