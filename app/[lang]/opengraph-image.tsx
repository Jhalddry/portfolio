import { ImageResponse } from "next/og";
import { SEO, type Lang } from "../data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jhalddry González";

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l: Lang = lang === "en" ? "en" : "es";
  const line = l === "es" ? "Hago que las apps hablen entre sí." : "I make apps talk to each other.";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0c",
          color: "#ecebe6",
          fontFamily: "monospace",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#c6ff3d" }}>jhalddry.dev</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>Jhalddry González</div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 28, color: "#c6ff3d" }}>{SEO[l].role}</div>
          <div style={{ display: "flex", fontSize: 32, marginTop: 14, color: "#8c8c86" }}>{line}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8c8c86" }}>Zero CRM · Zero · La Cancha</div>
      </div>
    ),
    size,
  );
}
