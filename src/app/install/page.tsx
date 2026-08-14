import type { Metadata } from "next";
import Container from "../components/container";
import PageHeader from "../components/page-header";
import CodeBlock from "../components/code-block";

export const metadata: Metadata = {
  title: "install",
  description:
    "Install Saturn, the local-first terminal AI agent, in under a minute. One command on macOS, Linux, WSL2, or Windows — no account, no cloud dependency.",
  alternates: {
    canonical: "/install",
  },
  openGraph: {
    title: "install — Saturn",
    description:
      "Install Saturn, the local-first terminal AI agent, in under a minute.",
    url: "/install",
    type: "article",
  },
};

const requirements = [
  ["os", "macOS 13+, Linux, WSL2, or Windows 10/11"],
  ["runtime", "Python 3.10+ and git"],
  ["memory", "8 GB RAM minimum (16 GB recommended)"],
  ["disk", "~6 GB free for the local models"],
];

export default function InstallPage() {
  return (
    <>
      <PageHeader
        eyebrow="install"
        title="install."
        lead="One command to install the agent. Everything runs on your machine — no account, no cloud dependency."
      />

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <div className="space-y-10">
            <Step n="1" title="install the cli">
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Run the one-liner for your platform. It installs{" "}
                <a
                  href="https://ollama.com"
                  className="text-accent hover:underline"
                >
                  Ollama
                </a>{" "}
                if needed, sets Saturn up in an isolated environment, and puts
                the <code className="text-fg">saturn</code> command on your
                PATH.
              </p>
              <CodeBlock
                label="macos / linux / wsl2"
                command="curl -fsSL saturdayai.org/install.sh | sh"
              />
              <div className="mt-3">
                <CodeBlock
                  label="windows (powershell)"
                  command="irm saturdayai.org/install.ps1 | iex"
                />
              </div>
            </Step>

            <Step n="2" title="verify the install">
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Open a new terminal so the updated PATH takes effect, then:
              </p>
              <CodeBlock command="saturn --version" />
            </Step>

            <Step n="3" title="start a session">
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Launch the TUI. The first run pulls a few GB of local models,
                then Saturn waits for your first instruction.
              </p>
              <CodeBlock command="saturn" />
            </Step>
          </div>

          <aside className="space-y-8">
            <div className="border-y border-edge py-5">
              <h2 className="type-micro mb-4 lowercase text-faint">
                requirements
              </h2>
              <dl className="space-y-3">
                {requirements.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[72px_1fr] gap-2">
                    <dt className="type-micro lowercase text-faint">{k}</dt>
                    <dd className="text-sm leading-relaxed text-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-y border-edge py-5">
              <h2 className="text-sm font-bold lowercase text-fg">
                need details?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                The documentation covers model setup, tools, and configuration.
              </p>
              <a
                href="/docs"
                className="mt-3 inline-block text-sm lowercase text-accent hover:underline"
              >
                read the docs →
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
      <div className="mb-4 flex items-baseline gap-3">
        <span className="type-micro text-accent">{n}</span>
        <h2 className="text-sm font-bold lowercase text-fg">{title}</h2>
      </div>
      <div className="pl-6">{children}</div>
    </section>
  );
}
