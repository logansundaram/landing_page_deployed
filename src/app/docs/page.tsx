import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/page-header";
import DocsShell from "../components/docs/docs-shell";
import { docGroups } from "../lib/docs";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "docs",
  description:
    "Documentation for Saturn, the local-first, transparent terminal AI agent: installation, the plan rail, the approval gate, the trust stack, tools, MCP, observability, headless mode, commands, and configuration.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "docs — Saturday.ai",
    description:
      "Documentation for Saturn, the local-first, transparent terminal AI agent.",
    url: "/docs",
    type: "article",
  },
};

/* The three things a new reader most needs, in reading order. */
const start = [
  {
    href: "/docs/installation",
    k: "install",
    v: "one command; ollama, the models, and the saturn cli on your path.",
  },
  {
    href: "/docs/first-session",
    k: "first session",
    v: "the prompt, the plan rail, the status bar, and the keys during a turn.",
  },
  {
    href: "/docs/approval-gate",
    k: "the gate",
    v: "what stops, what you see, and how long an approval lives.",
  },
];

export default function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="documentation"
        title="docs."
        lead={`Guides and references for ${site.product}, the local-first agent that shows its work. Written against the current release — every command, key, and config value here is the one the agent ships.`}
      />

      <DocsShell>
        {/* Start here — three doors, hairline grid */}
        <div className="grid gap-px border border-edge bg-edge sm:grid-cols-3">
          {start.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-ink p-5 t-colors hover:bg-panel"
            >
              <p className="text-sm font-bold lowercase text-fg">
                {s.k}{" "}
                <span className="text-accent opacity-0 t-colors group-hover:opacity-100">
                  →
                </span>
              </p>
              <p className="mt-1.5 text-sm lowercase leading-relaxed text-muted">
                {s.v}
              </p>
            </Link>
          ))}
        </div>

        {/* Every page, grouped — the same rows as the sidebar, with summaries */}
        {docGroups.map((g) => (
          <section key={g.group} className="mt-12">
            <p className="type-micro mb-3 flex items-center gap-3 lowercase">
              <span className="text-faint">::</span>
              <span className="text-accent">{g.group}</span>
              <span aria-hidden className="h-px min-w-8 flex-1 bg-edge" />
            </p>
            <div className="border-y border-edge">
              {g.pages.map((d) => (
                <Link
                  key={d.slug}
                  href={`/docs/${d.slug}`}
                  className="group grid gap-x-8 gap-y-1 border-b border-edge py-4 t-colors last:border-b-0 hover:bg-panel md:grid-cols-[240px_1fr] md:items-baseline"
                >
                  <p className="text-sm font-bold lowercase text-fg t-colors group-hover:text-accent">
                    {d.title}
                  </p>
                  <p className="max-w-xl text-sm leading-relaxed text-muted">
                    {d.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <p className="type-micro mt-12 lowercase text-faint">
          source, issues, and the changelog live on{" "}
          <a
            href={site.github}
            className="text-accent hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
          . inside the agent, <code className="text-fg">/help</code> and{" "}
          <code className="text-fg">/&lt;command&gt; --help</code> are always
          current.
        </p>
      </DocsShell>
    </>
  );
}
