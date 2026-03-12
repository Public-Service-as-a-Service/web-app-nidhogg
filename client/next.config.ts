import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const apiProxyTargetNotifier = process.env.API_PROXY_TARGET_NOTIFIER;
const apiProxyTargetUsers = process.env.API_PROXY_TARGET_USERS;

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/users/:path*",
          destination: `${apiProxyTargetUsers}/api/:path*`,
        },
        {
          source: "/api/notifier/:path*",
          destination: `${apiProxyTargetNotifier}/api/:path*`,
        },
      ],
    };
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
