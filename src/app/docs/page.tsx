import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/container";
import PageHeader from "../components/page-header";

export const metadata: Metadata = {
  title: "Docs — Saturday.ai",
  description:
    "Documentation for Saturn, the local-first, transparent terminal AI agent.",
};

const sections = [
  {
    group: "Getting started",
    items: ["Introduction", "Installation", "Your first session"],
  },
  {
    group: "Concepts",
    items: ["Plans & workflows", "Tools & approval gates", "Observability"],
  },
  {
    group: "Reference",
    items: ["CLI commands", "Configuration", "Local models"],
  },
];

const intro = [
  {
    title: "Plans & workflows",
    body: "How Saturn turns intent into an explicit, inspectable sequence of steps.",
  },
  {
    title: "Tools & approval gates",
    body: "Register tools and gate every side effect behind an approval prompt.",
  },
  {
    title: "Local models",
    body: "Point Saturn at local weights and run the whole loop on your hardware.",
  },
];

export default function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        title="Learn how Saturn works."
        lead="Guides and references for running a transparent, local-first agent. We're actively writing these — the structure below is live."
      />

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav className="space-y-7">
              {sections.map((s) => (
                <div key={s.group}>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-faint">
                    {s.group}
                  </p>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item}>
                        <span className="cursor-default text-sm text-muted transition-colors hover:text-fg">
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
            <div className="rounded-lg border border-edge bg-panel p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                Work in progress
              </p>
              <h2 className="mt-3 font-serif text-2xl text-fg">
                The full documentation is on its way.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                In the meantime, install the CLI and explore the TUI directly —
                every command is discoverable from inside the agent with{" "}
                <code className="font-mono text-fg">?</code>.
              </p>
              <Link
                href="/install"
                className="mt-5 inline-block font-mono text-sm text-accent hover:underline"
              >
                Install Saturn →
              </Link>
            </div>

            <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-edge bg-edge sm:grid-cols-2">
              {intro.map((c) => (
                <div key={c.title} className="bg-ink p-6">
                  <h3 className="text-base font-medium text-fg">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
