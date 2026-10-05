export const site = {
  /* Saturday.ai is the company and brands the chrome (nav, tab titles,
     social cards); Saturn is the product it ships. */
  name: "Saturday.ai",
  product: "Saturn",
  url: "https://saturdayai.org",
  tagline: "saturn, the local-first agent that shows its work",
  description:
    "Saturn is a local-first terminal AI agent from Saturday.ai for the admin of your life. Every model pass, tool call, and decision is written to the screen as it happens — on your hardware, behind approval gates, with nothing hidden.",
  github: "https://github.com/logansundaram/saturn",
  installCommand: "curl -fsSL saturdayai.org/install.sh | sh",
  nav: [
    { href: "/docs", label: "docs" },
    { href: "/install", label: "install" },
    { href: "/eris", label: "eris" },
    { href: "/blog", label: "blog" },
  ],
} as const;

/* A pre-release notice: every <PrereleaseNote /> renders this line, and
   null hides them all. v2 shipped on 2026-10-05 and the installer clones
   it, so it is off. */
export const prerelease: string | null = null;
