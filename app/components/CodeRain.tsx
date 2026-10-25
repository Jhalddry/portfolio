"use client";

import { useEffect, useRef } from "react";

const TOKENS = ["{ }", "=>", "</>", "async", "await", "SELECT *", "const", "npm run dev", "git push", "POST /api", "200 OK", "WebRTC", "OAuth", "RLS", "useEffect", "null", "[]", "&&", "import", "return", "try {", "} catch", "fetch()", "401", "<App />", "JWT", "TURN", "MCP"];

type P = { x: number; y: number; v: number; t: string; s: number };

/* fichas de código que flotan hacia arriba y se encienden cerca del cursor */
export default function CodeRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let parts: P[] = [];
    const mouse = { x: -999, y: -999 };
    let col = "#c6ff3d";
    let mute = "#8c8c86";

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      col = cs.getPropertyValue("--acct").trim() || col;
      mute = cs.getPropertyValue("--mute").trim() || mute;
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(14, Math.floor((w * h) / 26000));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        v: 0.12 + Math.random() * 0.35,
        t: TOKENS[(Math.random() * TOKENS.length) | 0],
        s: 11 + Math.random() * 6,
      }));
      readColors();
    };

    const draw = () => {
      if (!visible || document.hidden) {
        raf = 0;
        return;
      }
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (!reduce) p.y -= p.v;
        if (p.y < -20) {
          p.y = h + 20;
          p.x = Math.random() * w;
          p.t = TOKENS[(Math.random() * TOKENS.length) | 0];
        }
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const near = Math.max(0, 1 - d / 170);
        ctx.font = `${p.s}px ui-monospace, Consolas, monospace`;
        ctx.globalAlpha = 0.16 + near * 0.8;
        ctx.fillStyle = near > 0.05 ? col : mute;
        ctx.fillText(p.t, p.x + (near > 0 ? (p.x - mouse.x) * near * 0.08 : 0), p.y);
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const leave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    const wake = () => {
      if (visible && !document.hidden && !raf && !reduce) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      wake();
    });
    io.observe(cv);
    document.addEventListener("visibilitychange", wake);

    resize();
    draw();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", wake);
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]" />;
}
