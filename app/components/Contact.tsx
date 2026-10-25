"use client";

import { useState } from "react";
import { CERTS, EMAIL, GITHUB, LINKEDIN } from "../data";
import { Heading, Reveal, Tx, useSite } from "./ui";

const CODE = `async function contactar(mensaje) {
  const res = await fetch("/api/hablemos", {
    method: "POST",
    body: JSON.stringify(mensaje),
  });

  if (!res.ok) {
    throw new Error("intenta de nuevo");
  }

  return "te respondo pronto";
}

contactar({
  de: "tu@empresa.com",
  asunto: "una vacante, un proyecto",
});`;

const MAX = 800;

const field = (bad?: string) =>
  `card w-full rounded-xl px-4 py-3 outline-none transition placeholder:text-mute/60 focus:border-acct ${bad ? "border-red-500" : "border-line"}`;

export default function Contact() {
  const { t } = useSite();
  const c = t.contact;
  const [f, setF] = useState({ name: "", email: "", who: 0, msg: "" });
  const [errs, setErrs] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrs((e) => ({ ...e, [k]: false }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er = {
      name: f.name.trim().length < 2,
      email: !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(f.email.trim()),
      msg: f.msg.trim().length < 10,
    };
    setErrs(er);
    if (Object.values(er).some(Boolean)) return;

    const who = c.whoItems[f.who];
    const subject = `Portfolio: ${who} · ${f.name.trim()}`;
    const message = `${f.msg.trim()}\n\n— ${f.name.trim()} (${who})\n${f.email.trim()}`;
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      return setStatus(c.openMail);
    }
    setBusy(true);
    setStatus(c.sending);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: key, subject, from_name: f.name.trim(), email: f.email.trim(), message, botcheck: "" }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setDone(true);
      setStatus("");
    } catch {
      setStatus(`${c.fail} ${EMAIL}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="contacto" className="relative scroll-mt-28 md:scroll-mt-16 overflow-hidden">
      <pre aria-hidden className="pointer-events-none absolute right-0 top-16 hidden select-none text-[15px] leading-7 text-acct/[0.34] [mask-image:linear-gradient(to_left,#000_30%,transparent_98%)] md:block">{CODE}</pre>
      <div className="relative mx-auto max-w-5xl px-5 py-16 md:py-32">
      <Heading>{c.label}</Heading>
      <Reveal>
        <h2 className="max-w-3xl text-[clamp(1.8rem,5vw,3.4rem)] font-extrabold leading-tight tracking-tighter">
          <Tx>{c.title}</Tx>
        </h2>
      </Reveal>
      <Reveal delay={100}>
        {done ? (
          <div className="rise card mt-10 rounded-3xl border-acct p-8" role="status">
            <p className="text-lg font-bold text-acct">{c.okTitle}</p>
            <p className="mt-2 text-mute">{c.okText(f.name.trim().split(" ")[0], f.email.trim())}</p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-10 grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="n" className="mb-1 block text-xs text-mute">{c.name}</label>
              <input id="n" className={field(errs.name ? "x" : "")} value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
              <p className="mt-1 min-h-5 text-xs text-red-500">{errs.name ? c.errName : ""}</p>
            </div>
            <div>
              <label htmlFor="e" className="mb-1 block text-xs text-mute">{c.email}</label>
              <input id="e" type="email" className={field(errs.email ? "x" : "")} value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
              <p className="mt-1 min-h-5 text-xs text-red-500">{errs.email ? c.errEmail : ""}</p>
            </div>
            <div className="md:col-span-2">
              <p className="mb-2 text-xs text-mute">{c.who}</p>
              <div className="flex flex-wrap gap-2">
                {c.whoItems.map((w, i) => (
                  <button
                    type="button"
                    key={i}
                    aria-pressed={f.who === i}
                    onClick={() => set("who", i)}
                    className={`rounded-full border px-5 py-2 text-sm transition ${f.who === i ? "border-acc bg-acc font-bold text-black" : "border-line text-mute hover:border-fg hover:text-fg"}`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="m" className="mb-1 block text-xs text-mute">{c.msg}</label>
              <textarea id="m" rows={5} maxLength={MAX} className={`${field(errs.msg ? "x" : "")} resize-none`} value={f.msg} onChange={(e) => set("msg", e.target.value)} placeholder={c.ph} />
              <div className="mt-1 flex min-h-5 justify-between text-xs">
                <span className="text-red-500">{errs.msg ? c.errMsg : ""}</span>
                <span className={f.msg.length > MAX * 0.9 ? "text-acct" : "text-mute"}>{f.msg.length}/{MAX}</span>
              </div>
            </div>
            <div className="flex items-center gap-5 md:col-span-2">
              <button type="submit" disabled={busy} className="rounded-full bg-acc px-7 py-3 text-sm font-bold text-black transition hover:brightness-110 disabled:opacity-50">
                {busy ? c.sending : c.send}
              </button>
              <p role="status" className="text-sm text-mute">{status}</p>
            </div>
          </form>
        )}
      </Reveal>
      <Reveal delay={150}>
        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6 text-sm">
          <a className="ul text-mute transition hover:text-acct" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a className="ul text-mute transition hover:text-acct" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="ul text-mute transition hover:text-acct" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <p className="mt-6 text-xs text-mute">
          <Tx>{c.langs}</Tx>
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-mute">
          <Tx>{c.certs}</Tx>
          {CERTS.map((x) => (
            <a key={x.href} href={x.href} target="_blank" rel="noreferrer" className="rounded-full border border-line px-3 py-1 transition hover:border-acct hover:text-acct">
              {x.name}
            </a>
          ))}
        </p>
      </Reveal>
      </div>
    </section>
  );
}
