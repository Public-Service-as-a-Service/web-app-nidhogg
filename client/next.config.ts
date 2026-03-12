import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const apiProxyTarget = (
  process.env.API_PROXY_TARGET ?? "http://localhost:8087"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: `${apiProxyTarget}/api/:path*`,
        },
      ],
    };
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
