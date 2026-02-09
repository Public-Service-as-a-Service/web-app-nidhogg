import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // This matches any request starting with /api
        source: "/api/:path*",
        // This redirects it to your Spring Boot / backend server
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
