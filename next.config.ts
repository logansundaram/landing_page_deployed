import type { NextConfig } from "next";

const SATURN_RAW =
  "https://raw.githubusercontent.com/logansundaram/saturn/main";

const nextConfig: NextConfig = {
  // The v1 "plans & steering" page became "the loop & steering" in v2.
  async redirects() {
    return [{ source: "/docs/plans", destination: "/docs/loop", permanent: true }];
  },
  // Serve the installer under a clean, branded URL (saturdayai.org/install.sh) by proxying
  // to the raw file on main. There is no Windows installer: v2 runs on macOS and Linux.
  async rewrites() {
    return [{ source: "/install.sh", destination: `${SATURN_RAW}/install.sh` }];
  },
};

export default nextConfig;
