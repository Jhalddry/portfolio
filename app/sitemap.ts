import type { MetadataRoute } from "next";
import { LANGS, SITE_URL } from "./data";

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGS.map((l) => ({
    url: `${SITE_URL}/${l}`,
    lastModified: new Date(),
    alternates: { languages: { es: `${SITE_URL}/es`, en: `${SITE_URL}/en` } },
  }));
}
