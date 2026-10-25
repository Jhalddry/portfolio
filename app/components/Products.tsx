"use client";

import { useState } from "react";
import { Arrow, Heading, Reveal, Tag, Tx, useSite, useSpot } from "./ui";

export default function Products() {
  const { t } = useSite();
  const [i, setI] = useState(0);
  const p = t.products[i];
  const spot = useSpot<HTMLDivElement>();
  return (
    <section id="trabajo" className="scroll-mt-16">
      <div ref={spot} className="dots">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-24 md:pt-32">
      <Heading>{t.work.label}</Heading>
      <Reveal>
        <h2 className="mb-12 max-w-3xl text-[clamp(1.6rem,4vw,2.6rem)] font-extrabold leading-tight tracking-tighter">
          <Tx>{t.work.title}</Tx>
        </h2>
      </Reveal>

      <Reveal>
        <div className="grid gap-8 md:grid-cols-[260px_1fr]">
          <div role="group" aria-label={t.work.label} className="flex gap-2 overflow-x-auto md:block md:space-y-1 md:overflow-visible">
            {t.products.map((x, n) => (
              <button
                key={x.id}
                aria-pressed={n === i}
                onClick={() => setI(n)}
                onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setI(n)}
                className={`shrink-0 rounded-2xl border px-5 py-3 text-left transition-all md:w-full ${n === i ? "card border-acct text-fg" : "border-transparent text-mute hover:text-fg"}`}
              >
                <span className="block text-xl font-extrabold tracking-tight md:text-2xl">{x.name}</span>
                <span className="block text-[11px] text-mute">{x.tag}</span>
              </button>
            ))}
          </div>

          <article key={`${p.id}`} className="rise card rounded-3xl p-6 md:p-8">
            <p className="text-xs text-acct">{p.tag}</p>
            <p className="mt-1 text-xs text-mute">{p.role}</p>
            <p className="mt-5 text-fg/90">{p.desc}</p>
            <ul className="mt-6 space-y-3">
              {p.points.map((x, n) => (
                <li key={x} className="rise flex gap-3 text-sm text-mute" style={{ animationDelay: `${120 + n * 90}ms` }}>
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-acct" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s}>
                  <Tag>{s}</Tag>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              {p.links.map((l, n) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 transition ${n === 0 ? "bg-acc font-bold text-black hover:brightness-110" : "border border-line hover:border-acct hover:text-acct"}`}
                >
                  {l.label} <Arrow dir="up-right" className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </article>
        </div>
      </Reveal>
      </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 pb-24 md:pb-32">
      <Reveal>
        <div className="border-t border-line pt-8">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-mute">
            <Tx>{t.work.more}</Tx>
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {t.work.moreItems.map((m) => (
              <div key={m.name}>
                <h3 className="font-bold">{m.name}</h3>
                <p className="mt-1 text-sm text-mute">{m.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-mute">
            <Tx>{t.work.private}</Tx>
          </p>
        </div>
      </Reveal>
      </div>
    </section>
  );
}
