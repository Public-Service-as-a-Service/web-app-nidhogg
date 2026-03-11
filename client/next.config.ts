import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/notifier/:path*",
          destination: "http://localhost:8087/api/notifier/:path*",
        },
        {
          source: "/api/:path*",
          destination: "http://localhost:8081/api/:path*",
        },
      ],
    };
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
