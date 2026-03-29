import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** أي مصدر https/http — للتطوير؛ في الإنتاج يُفضّل تقييد النطاقات */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
