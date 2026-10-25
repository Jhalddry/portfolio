import { NextResponse, type NextRequest } from "next/server";

/* "/" -> /es o /en: primero la cookie de la última elección, luego el idioma del navegador */
export function middleware(req: NextRequest) {
  const saved = req.cookies.get("jg-lang")?.value;
  const accept = (req.headers.get("accept-language") ?? "").toLowerCase();
  const lang = saved === "es" || saved === "en" ? saved : accept.startsWith("en") ? "en" : "es";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}`;
  return NextResponse.redirect(url, 307);
}

export const config = { matcher: ["/"] };
