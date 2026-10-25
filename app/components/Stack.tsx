"use client";

import { STACK_A, STACK_B } from "../data";
import { Reveal, Tx, useSite } from "./ui";

function Row({ items, rev = false }: { items: string[]; rev?: boolean }) {
  return (
    <div className="marq-wrap overflow-hidden">
      <div className={`marq ${rev ? "rev" : ""}`}>
        {[...items, ...items].map((s, i) => (
          <span
            key={i}
            className="mr-10 shrink-0 text-[clamp(1.5rem,4.2vw,2.8rem)] font-extrabold tracking-tighter text-transparent transition [-webkit-text-stroke:1.2px_var(--mute)] hover:text-acct hover:[-webkit-text-stroke:1.2px_var(--acct)]"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const { t } = useSite();
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-4 px-5 md:grid-cols-3">
        {t.method.items.map((m, i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="card h-full rounded-3xl p-6">
              <span className="block h-1.5 w-8 rounded-full bg-acc" />
              <h3 className="mt-4 font-bold">
                <Tx>{m.t}</Tx>
              </h3>
              <p className="mt-2 text-sm text-mute">
                <Tx>{m.d}</Tx>
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-16 space-y-3" aria-hidden>
        <Row items={STACK_A} />
        <Row items={STACK_B} rev />
      </div>
    </section>
  );
}
