import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.almashhad.com",
        pathname: "/static/**",
      },
    ],
  },
};

export default nextConfig;
