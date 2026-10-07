import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/container";
import PageHeader from "../components/page-header";
import CodeBlock from "../components/code-block";
import PrereleaseNote from "../components/prerelease-note";

export const metadata: Metadata = {
  title: "install",
  description:
    "Install Saturn, the local-first terminal AI agent, in under a minute. One command on macOS or Linux — no account, no cloud dependency.",
  alternates: {
    canonical: "/install",
  },
  openGraph: {
    title: "install — Saturday.ai",
    description:
      "Install Saturn, the local-first terminal AI agent, in under a minute.",
    url: "/install",
    type: "article",
  },
};

const requirements = [
  ["os", "macOS for the app integrations; Linux runs files, shell, web, and documents"],
  ["runtime", "Python 3.11+ and git"],
  ["model", "the default 4b is a 3.4 GB download; /models sizes up to fit your machine"],
  ["disk", "~4 GB free for the default model, more for bigger sizes"],
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
        <PrereleaseNote className="mb-10" />
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <div className="space-y-10">
            <Step n="1" title="install the cli">
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Run the one-liner. It installs{" "}
                <a
                  href="https://ollama.com"
                  className="text-accent hover:underline"
                >
                  Ollama
                </a>{" "}
                if needed, sets Saturn up in an isolated environment, pulls
                the small local model, and puts the{" "}
                <code className="text-fg">saturn</code> command on your PATH.
              </p>
              <CodeBlock
                label="macos / linux"
                command="curl -fsSL saturdayai.org/install.sh | sh"
              />
            </Step>

            <Step n="2" title="verify the install">
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Open a new terminal so the updated PATH takes effect, then:
              </p>
              <CodeBlock command="saturn --version" />
            </Step>

            <Step n="3" title="start a session">
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Launch it from the folder you want it to work in. The first
                run opens <code className="text-fg">/models</code>: it reads
                your hardware, recommends a model size that fits and runs at a
                usable speed, and pulls it if you say yes. Then it offers
                three quick questions (what to call you, what you do, and
                anything it should never do) so it knows you from the first
                request. Type <code className="text-fg">/help</code> for every
                command.
              </p>
              <CodeBlock command="saturn" />
              <p className="mt-4 text-sm leading-relaxed text-muted">
                On macOS, the first time Saturn reaches an app, macOS asks
                whether your terminal may control it. Reading your Messages
                history also needs Full Disk Access for that terminal.
              </p>
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
                already use pipx or uv?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Saturn isn&apos;t on PyPI yet. Install it from GitHub with{" "}
                <code className="break-all text-fg">
                  pipx install git+https://github.com/logansundaram/saturn
                </code>{" "}
                (or <code className="text-fg">uv tool install</code>), keep
                Ollama running, and let the first launch&apos;s{" "}
                <code className="text-fg">/models</code> pull the model.
              </p>
              <Link
                href="/docs/installation"
                className="mt-3 inline-block text-sm lowercase text-accent hover:underline"
              >
                all install paths →
              </Link>
            </div>

            <div className="border-y border-edge py-5">
              <h2 className="text-sm font-bold lowercase text-fg">
                need details?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                The documentation covers the loop, the approval gate, the
                trust stack, your Mac&apos;s apps, tools, and configuration.
              </p>
              <Link
                href="/docs"
                className="mt-3 inline-block text-sm lowercase text-accent hover:underline"
              >
                read the docs →
              </Link>
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
