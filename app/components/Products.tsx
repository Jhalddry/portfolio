"use client";

import { useState } from "react";
import { Arrow, Heading, Reveal, Star, Tag, Tx, useSite, useSpot } from "./ui";

function CredRow({ label, value, copy, copied }: { label: string; value: string; copy: string; copied: string }) {
  const [ok, setOk] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setOk(true);
      setTimeout(() => setOk(false), 1600);
    } catch {}
  };
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-bg/60 px-3 py-2">
      <div className="min-w-0">
        <p className="text-[11px] text-mute">{label}</p>
        <p className="select-all truncate text-sm text-fg">{value}</p>
      </div>
      <button type="button" onClick={onCopy} className="shrink-0 rounded-full border border-line px-3 py-1 text-xs transition hover:border-acct hover:text-acct">
        {ok ? copied : copy}
      </button>
    </div>
  );
}

export default function Products() {
  const { t } = useSite();
  const [i, setI] = useState(0);
  const p = t.products[i];
  const spot = useSpot<HTMLDivElement>();
  return (
    <section id="trabajo" className="scroll-mt-28 md:scroll-mt-16">
      <div ref={spot} className="dots">
      <div className="mx-auto max-w-5xl px-5 pb-12 pt-24 md:pb-16 md:pt-32">
      <Heading>{t.work.label}</Heading>
      <Reveal>
        <h2 className="mb-8 max-w-3xl text-[clamp(1.5rem,4vw,2.6rem)] md:mb-12 font-extrabold leading-tight tracking-tighter">
          <Tx>{t.work.title}</Tx>
        </h2>
      </Reveal>

      <Reveal>
        <div className="grid gap-8 md:grid-cols-[260px_1fr]">
          <div role="group" aria-label={t.work.label} className="grid grid-cols-3 gap-2 md:block md:space-y-1">
            {t.products.map((x, n) => (
              <button
                key={x.id}
                aria-pressed={n === i}
                onClick={() => setI(n)}
                onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setI(n)}
                className={`relative rounded-2xl border px-2 py-2.5 text-center transition-all md:w-full md:px-5 md:py-3 md:text-left ${n === i ? (x.badge ? "card gold-card text-fg" : "card border-acct text-fg") : "border-transparent text-mute hover:text-fg"}`}
              >
                <span className="block text-sm font-extrabold tracking-tight sm:text-base md:text-2xl">{x.name}</span>
                {x.badge && <Star className="star-glow absolute right-1.5 top-1.5 h-3.5 w-3.5 text-gold md:right-3 md:top-3 md:h-4 md:w-4" />}
                <span className="hidden text-[11px] text-mute md:block">{x.tag}</span>
              </button>
            ))}
          </div>

          <article key={`${p.id}`} className={`rise card rounded-3xl p-5 sm:p-6 md:p-8 ${p.badge ? "gold-card" : ""}`}>
            <p className="text-xs text-acct">{p.tag}</p>
            <p className="mt-1 text-xs text-mute">{p.role}</p>
            <p className="mt-5 text-sm text-fg/90 sm:text-base">{p.desc}</p>
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
            {p.creds && (
              <div className="mt-6 rounded-2xl border border-dashed border-gold/60 p-4">
                <p className="text-xs font-bold text-gold">{t.work.creds.title}</p>
                <p className="mb-3 mt-0.5 text-xs text-mute">{t.work.creds.hint}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <CredRow label={t.work.creds.email} value={p.creds.email} copy={t.work.creds.copy} copied={t.work.creds.copied} />
                  <CredRow label={t.work.creds.password} value={p.creds.password} copy={t.work.creds.copy} copied={t.work.creds.copied} />
                </div>
              </div>
            )}

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

      <div className="mx-auto max-w-5xl px-5 pb-16 md:pb-32">
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
