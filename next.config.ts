import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.almashhad.com",
        pathname: "/static/**",
      },
      {
        protocol: "https",
        hostname: "media.almashhad.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.sofascore.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
