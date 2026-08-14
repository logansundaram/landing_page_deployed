import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/container";
import PageHeader from "../components/page-header";

export const metadata: Metadata = {
  title: "docs",
  description:
    "Documentation for Saturn, the local-first, transparent terminal AI agent. Guides and references for plans, tools, approval gates, observability, and local models.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "docs — Saturn",
    description:
      "Documentation for Saturn, the local-first, transparent terminal AI agent.",
    url: "/docs",
    type: "article",
  },
};

const sections = [
  {
    group: "getting started",
    items: ["introduction", "installation", "your first session"],
  },
  {
    group: "concepts",
    items: ["plans & workflows", "tools & approval gates", "observability"],
  },
  {
    group: "reference",
    items: ["cli commands", "configuration", "local models"],
  },
];

const intro = [
  {
    title: "plans & workflows",
    body: "How Saturn turns intent into an explicit, inspectable sequence of steps.",
  },
  {
    title: "tools & approval gates",
    body: "Register tools and gate every side effect behind an approval prompt.",
  },
  {
    title: "local models",
    body: "Point Saturn at local weights and run the whole loop on your hardware.",
  },
];

export default function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="documentation"
        title="docs."
        lead="Guides and references for running a transparent, local-first agent. We're actively writing these — the structure below is live."
      />

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav className="space-y-7">
              {sections.map((s) => (
                <div key={s.group}>
                  <p className="type-micro mb-3 lowercase text-faint">
                    {s.group}
                  </p>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item}>
                        <span className="cursor-default text-sm lowercase text-muted t-colors hover:text-fg">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div>
            <div className="border-y border-edge py-6">
              <p className="type-micro lowercase text-muted">
                [ work in progress ]
              </p>
              <h2 className="mt-3 text-sm font-bold text-fg">
                The full documentation is on its way.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                In the meantime, install the CLI and explore the TUI directly —
                every command is discoverable from inside the agent with{" "}
                <code className="text-fg">?</code>.
              </p>
              <Link
                href="/install"
                className="mt-4 inline-block text-sm lowercase text-fg hover:underline"
              >
                install saturn →
              </Link>
            </div>

            <div className="mt-8 border-y border-edge">
              {intro.map((c) => (
                <div
                  key={c.title}
                  className="grid gap-x-8 gap-y-1 border-b border-edge py-5 last:border-b-0 md:grid-cols-[240px_1fr] md:items-baseline"
                >
                  <h3 className="text-sm font-bold lowercase text-fg">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
