import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "negocioefranquia.com.br",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "noticias.negocioefranquia.com.br",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/noticia/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
