/*
 * Descarga del CV. Safari (iOS) abre los PDF en su visor aunque llegue
 * `Content-Disposition: attachment`. Con `application/octet-stream` no puede
 * previsualizarlo y lo descarga como cualquier otro navegador.
 */
const FILES = { es: "Jhalddry_Gonzalez_CV_ES.pdf", en: "Jhalddry_Gonzalez_CV_EN.pdf" } as const;

export async function GET(req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "es" && lang !== "en") return new Response("Not found", { status: 404 });

  const file = FILES[lang];
  const upstream = await fetch(new URL(`/${file}`, req.url));
  if (!upstream.ok) return new Response("Not found", { status: 404 });

  return new Response(await upstream.arrayBuffer(), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${file}"; filename*=UTF-8''${encodeURIComponent(file)}`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
