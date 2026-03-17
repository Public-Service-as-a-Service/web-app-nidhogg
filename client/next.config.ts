import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const DEFAULT_API_PROXY_TARGET_NOTIFIER = "http://localhost:8082";
const DEFAULT_API_PROXY_TARGET_USERS = "http://localhost:8081";

const apiProxyTargetNotifier =
  process.env.API_PROXY_TARGET_NOTIFIER ?? DEFAULT_API_PROXY_TARGET_NOTIFIER;
const apiProxyTargetUsers =
  process.env.API_PROXY_TARGET_USERS ?? DEFAULT_API_PROXY_TARGET_USERS;

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/users/:path*",
          destination: `${apiProxyTargetUsers}/api/users/:path*`,
        },
        {
          source: "/api/notifier/:path*",
          destination: `${apiProxyTargetNotifier}/api/notifier/:path*`,
        },
      ],
    };
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
