export const site = {
  /* Saturn leads everywhere; the org name appears in the footer only. */
  name: "Saturn",
  org: "Saturday.ai",
  url: "https://saturdayai.org",
  tagline: "the local-first agent that shows its work",
  description:
    "Saturn is a local-first terminal AI agent. Every plan, tool call, metric, and decision is written to the screen as it happens — on your hardware, behind approval gates, with nothing hidden.",
  github: "https://github.com/logansundaram/saturn",
  installCommand: "curl -fsSL saturdayai.org/install.sh | sh",
  nav: [
    { href: "/docs", label: "docs" },
    { href: "/install", label: "install" },
  ],
} as const;
