import type { NextConfig } from "next";

const SATURN_RAW =
  "https://raw.githubusercontent.com/logansundaram/saturn/main";

const nextConfig: NextConfig = {
  // Serve the install scripts under clean, branded URLs (saturdayai.org/install.sh,
  // saturdayai.org/install.ps1) by proxying to the raw files on the default branch.
  // These resolve once the scripts are on origin/main.
  async rewrites() {
    return [
      { source: "/install.sh", destination: `${SATURN_RAW}/install.sh` },
      { source: "/install.ps1", destination: `${SATURN_RAW}/install.ps1` },
    ];
  },
};

export default nextConfig;
