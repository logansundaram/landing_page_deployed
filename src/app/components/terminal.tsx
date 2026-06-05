import Container from "./container";
import SectionHeading from "./section-heading";

export default function Terminal() {
  return (
    <section className="border-t border-edge">
      <Container className="py-20 md:py-28">
        <SectionHeading
          eyebrow="Meet Saturn"
          title="Saturday.ai's terminal-based, local-first AI agent."
          lead="Saturn runs entirely in your terminal and surfaces everything: the plan it generates, the tools it calls, the approvals it waits on, and the system it runs on. No hidden steps, nothing leaves your machine."
        />

        <div className="mt-10 overflow-hidden rounded-xl border border-edge-strong bg-panel shadow-2xl shadow-black/40">
          {/* Window chrome */}
          <div className="flex items-center justify-between border-b border-edge bg-panel-2 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <p className="font-mono text-xs text-faint">
              saturn · session a3f9c1
            </p>
            <p className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              live
            </p>
          </div>

          {/* Body */}
          <div className="grid gap-0 md:grid-cols-[1fr_240px]">
            {/* Transcript */}
            <div className="overflow-x-auto border-b border-edge p-5 font-mono text-[13px] leading-relaxed md:border-b-0 md:border-r">
              <Line>
                <span className="text-accent">saturn{">"}</span>{" "}
                <span className="text-fg">
                  refactor the auth module and add tests
                </span>
              </Line>

              <Block label="plan" tone="accent">
                <Step n="1" state="done">resolve dependencies in auth/</Step>
                <Step n="2" state="done">extract token logic to verify.ts</Step>
                <Step n="3" state="run">generate unit tests</Step>
                <Step n="4" state="todo">run suite &amp; report coverage</Step>
              </Block>

              <Block label="tool" tone="muted">
                <Line>
                  <span className="text-faint">→</span>{" "}
                  <span className="text-fg">fs.read</span>{" "}
                  <span className="text-muted">auth/token.ts</span>{" "}
                  <span className="text-[#28c840]">ok</span>
                </Line>
                <Line>
                  <span className="text-faint">→</span>{" "}
                  <span className="text-fg">fs.write</span>{" "}
                  <span className="text-muted">auth/verify.ts</span>{" "}
                  <span className="text-accent">awaiting approval</span>
                </Line>
                <Line>
                  <span className="ml-4 text-faint">
                    [a]pprove · [d]eny · [v]iew diff
                  </span>
                </Line>
              </Block>

              <Block label="run" tone="muted">
                <Line>
                  <span className="text-faint">$</span>{" "}
                  <span className="text-fg">pnpm test auth</span>
                </Line>
                <Line>
                  <span className="text-[#28c840]">✓</span>{" "}
                  <span className="text-muted">
                    14 passed
                  </span>{" "}
                  <span className="text-faint">· 0 failed · 312ms</span>
                </Line>
              </Block>

              <Line>
                <span className="text-accent">saturn{">"}</span>{" "}
                <span className="inline-block h-4 w-2 translate-y-0.5 bg-accent [animation:caret_1s_steps(1)_infinite]" />
              </Line>
            </div>

            {/* Metrics + workflow sidebar */}
            <aside className="space-y-5 p-5 font-mono text-xs">
              <Metric label="model" value="llama-3.1 · local" />
              <Metric label="context" value="18.4k / 128k" bar={0.14} />
              <Metric label="tokens/s" value="62.3" />
              <Metric label="memory" value="6.1 / 16 GB" bar={0.38} />

              <div className="pt-1">
                <p className="mb-2 uppercase tracking-[0.16em] text-faint">
                  workflow
                </p>
                <ul className="space-y-1.5 text-muted">
                  <Node state="done">compile</Node>
                  <Node state="done">execute</Node>
                  <Node state="run">inspect</Node>
                  <Node state="todo">improve</Node>
                </ul>
              </div>
            </aside>
          </div>

          {/* Status line */}
          <div className="flex items-center justify-between border-t border-edge bg-panel-2 px-4 py-2 font-mono text-[11px] text-faint">
            <span>
              <span className="text-accent">●</span> agent running · step 3/4
            </span>
            <span>^c stop · ^p plan · ^l logs</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return <div className="whitespace-nowrap py-0.5">{children}</div>;
}

function Block({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "accent" | "muted";
  children: React.ReactNode;
}) {
  return (
    <div className="my-3 border-l-2 border-edge-strong pl-3">
      <p
        className={`mb-1 text-[11px] uppercase tracking-[0.16em] ${
          tone === "accent" ? "text-accent" : "text-faint"
        }`}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

const stateGlyph = {
  done: <span className="text-[#28c840]">✓</span>,
  run: <span className="text-accent">▸</span>,
  todo: <span className="text-faint">○</span>,
} as const;

function Step({
  n,
  state,
  children,
}: {
  n: string;
  state: keyof typeof stateGlyph;
  children: React.ReactNode;
}) {
  return (
    <Line>
      {stateGlyph[state]} <span className="text-faint">{n}</span>{" "}
      <span className={state === "todo" ? "text-faint" : "text-fg"}>
        {children}
      </span>
    </Line>
  );
}

function Metric({
  label,
  value,
  bar,
}: {
  label: string;
  value: string;
  bar?: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="uppercase tracking-[0.16em] text-faint">{label}</span>
        <span className="text-fg">{value}</span>
      </div>
      {bar !== undefined && (
        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-edge">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${Math.round(bar * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}

function Node({
  state,
  children,
}: {
  state: keyof typeof stateGlyph;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2">
      {stateGlyph[state]}
      <span className={state === "todo" ? "text-faint" : "text-muted"}>
        {children}
      </span>
    </li>
  );
}
