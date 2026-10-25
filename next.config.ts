import type { NextConfig } from "next";

/* Los CV se sirven como descarga: en móvil el atributo `download` suele ignorarse y el PDF solo se abre en el visor */
const cvHeaders = (file: string) => ({
  source: `/${file}`,
  headers: [
    { key: "Content-Disposition", value: `attachment; filename="${file}"` },
    { key: "Content-Type", value: "application/pdf" },
  ],
});

const nextConfig: NextConfig = {
  async headers() {
    return [cvHeaders("Jhalddry_Gonzalez_CV_ES.pdf"), cvHeaders("Jhalddry_Gonzalez_CV_EN.pdf")];
  },
};

export default nextConfig;
