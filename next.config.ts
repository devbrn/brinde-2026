import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingIncludes: {
    "/analise-estrategica-gratuita": [
      "./docs/paginas-novas/3EB0B78792B3FC12253CE8-precise_import_main__2_/precise-import-main/public/construlead-canonical.html",
    ],
  },
};

export default nextConfig;
