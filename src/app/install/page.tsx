import type { Metadata } from "next";
import Container from "../components/container";
import PageHeader from "../components/page-header";
import CodeBlock from "../components/code-block";
import Em from "../components/em";

export const metadata: Metadata = {
  title: "Install",
  description:
    "Install Saturn, the local-first terminal AI agent, in under a minute. One command on macOS, Linux, WSL2, or Windows — no account, no cloud dependency.",
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
  "macOS 13+, Linux, WSL2, or Windows 10/11",
  "Python 3.10+ and git",
  "8 GB RAM minimum (16 GB recommended)",
  "~6 GB free disk for the local models",
];

export default function InstallPage() {
  return (
    <>
      <PageHeader
        eyebrow="Install"
        title={
          <>
            Get <Em>Saturn</Em> running locally.
          </>
        }
        lead="One command to install the agent. Everything runs on your machine — no account, no cloud dependency."
      />

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <div className="space-y-10">
            <Step n="1" title="Install the CLI">
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Run the one-liner for your platform. It installs{" "}
                <a
                  href="https://ollama.com"
                  className="text-accent hover:underline"
                >
                  Ollama
                </a>{" "}
                if needed, sets Saturn up in an isolated environment, and puts
                the <code className="font-mono text-fg">saturn</code> command on
                your PATH.
              </p>
              <CodeBlock
                label="macOS / Linux / WSL2"
                command="curl -fsSL saturdayai.org/install.sh | sh"
              />
              <div className="mt-3">
                <CodeBlock
                  label="Windows (PowerShell)"
                  command="irm saturdayai.org/install.ps1 | iex"
                />
              </div>
            </Step>

            <Step n="2" title="Verify the install">
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Open a new terminal so the updated PATH takes effect, then:
              </p>
              <CodeBlock command="saturn --version" />
            </Step>

            <Step n="3" title="Start a session">
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Launch the TUI. The first run pulls a few GB of local models,
                then Saturn waits for your first instruction.
              </p>
              <CodeBlock command="saturn" />
            </Step>
          </div>

          <aside className="space-y-8">
            <div className="border border-edge bg-panel p-6">
              <h2 className="mb-4 font-mono text-xs lowercase text-accent">
                <span className="text-faint">::</span> requirements
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

            <div className="border border-edge bg-panel p-6">
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
        <span className="flex h-7 w-7 items-center justify-center border border-edge-strong font-mono text-xs text-accent">
          {n}
        </span>
        <h2 className="text-lg font-medium text-fg">{title}</h2>
      </div>
      <div className="pl-10">{children}</div>
    </section>
  );
}
