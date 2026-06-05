import type { Metadata } from "next";
import Container from "../components/container";
import PageHeader from "../components/page-header";
import CodeBlock from "../components/code-block";

export const metadata: Metadata = {
  title: "Install",
  description:
    "Install Saturn, the local-first terminal AI agent, in under a minute. One command on macOS, Linux, or WSL2 — no account, no cloud dependency.",
  alternates: {
    canonical: "/install",
  },
  openGraph: {
    title: "Install — Saturday.ai",
    description:
      "Install Saturn, the local-first terminal AI agent, in under a minute.",
    url: "/install",
    type: "article",
  },
};

const requirements = [
  "macOS 13+, Linux, or WSL2",
  "8 GB RAM minimum (16 GB recommended for local models)",
  "A POSIX shell",
];

export default function InstallPage() {
  return (
    <>
      <PageHeader
        eyebrow="Install"
        title="Get Saturn running locally."
        lead="One command to install the agent. Everything runs on your machine — no account, no cloud dependency."
      />

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <div className="space-y-10">
            <Step n="1" title="Install the CLI">
              <p className="mb-4 text-sm leading-relaxed text-muted">
                The install script detects your platform and drops the{" "}
                <code className="font-mono text-fg">saturn</code> binary on your
                PATH.
              </p>
              <CodeBlock
                label="macOS / Linux"
                command="curl -fsSL saturday.ai/install | sh"
              />
              <div className="mt-3">
                <CodeBlock label="Homebrew" command="brew install saturday-ai/tap/saturn" />
              </div>
            </Step>

            <Step n="2" title="Verify the install">
              <CodeBlock command="saturn --version" />
            </Step>

            <Step n="3" title="Start a session">
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Launch the TUI in any project directory. Saturn will load local
                models and wait for your first instruction.
              </p>
              <CodeBlock command="saturn" />
            </Step>
          </div>

          <aside className="space-y-8">
            <div className="rounded-lg border border-edge bg-panel p-6">
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                Requirements
              </h2>
              <ul className="space-y-3 text-sm text-muted">
                {requirements.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="text-accent">·</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-edge bg-panel p-6">
              <h2 className="mb-2 text-sm font-medium text-fg">Need details?</h2>
              <p className="text-sm leading-relaxed text-muted">
                The documentation covers model setup, tools, and configuration.
              </p>
              <a
                href="/docs"
                className="mt-3 inline-block font-mono text-sm text-accent hover:underline"
              >
                Read the docs →
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-edge-strong font-mono text-xs text-accent">
          {n}
        </span>
        <h2 className="text-lg font-medium text-fg">{title}</h2>
      </div>
      <div className="pl-10">{children}</div>
    </section>
  );
}
