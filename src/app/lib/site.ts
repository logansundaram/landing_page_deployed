export const site = {
  /* Saturday.ai is the company and brands the chrome (nav, tab titles,
     social cards); Saturn is the product it ships. */
  name: "Saturday.ai",
  product: "Saturn",
  url: "https://saturdayai.org",
  tagline: "saturn, the local-first agent that shows its work",
  description:
    "Saturn is a local-first terminal AI agent from Saturday.ai. Every plan, tool call, metric, and decision is written to the screen as it happens — on your hardware, behind approval gates, with nothing hidden.",
  github: "https://github.com/logansundaram/saturn",
  installCommand: "curl -fsSL saturdayai.org/install.sh | sh",
  nav: [
    { href: "/docs", label: "docs" },
    { href: "/install", label: "install" },
  ],
} as const;
