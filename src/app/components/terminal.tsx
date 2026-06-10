import Container from "./container";
import SectionHeading from "./section-heading";
import Crosses from "./crosses";

const annotations = [
  {
    n: "01",
    title: "Declared up front",
    body: "Model, context window, tools, docs, and working directory — stated before the first token.",
  },
  {
    n: "02",
    title: "Execution trace",
    body: "Each stage — plan, agent, synthesize — is logged and timed as it runs, not summarized after.",
  },
  {
    n: "03",
    title: "Live system readout",
    body: "Context, CPU, RAM, GPU, and VRAM stream in the status bar while the agent works.",
  },
  {
    n: "04",
    title: "Your move",
    body: "The prompt returns to you. Side effects wait behind approval gates.",
  },
];

export default function Terminal() {
  return (
    <section className="relative border-t border-edge">
      <Crosses />
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="01"
          eyebrow="Meet Saturn"
          title="The terminal is the product."
          lead="Saturn is Saturday.ai's terminal-based, local-first agent. It surfaces everything: the plan it generates, the tools it calls, the approvals it waits on, and the system it runs on. No hidden steps, nothing leaves your machine."
        />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="overflow-hidden border border-edge-strong bg-panel shadow-[0_0_90px_-30px_rgba(0,255,255,0.25)]">
            <div className="flex items-center justify-between border-b border-edge bg-panel-2 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <p className="font-mono text-xs text-faint">
                saturn · local session
              </p>
              <p className="flex items-center gap-2 font-mono text-xs text-muted">
                <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-accent" />
                live
              </p>
            </div>

            <div className="overflow-hidden p-5 font-mono text-[13px] leading-relaxed">
              <pre className="mb-6 overflow-hidden text-[10px] leading-[1.05] text-accent/80 sm:text-[11px]">
                <span className="text-accent">{`         ························
     ······•••••••••••••••••••••·······            ·
   ·· ··•••     ·               ••••••·····
   ·  •••                 `}</span>
                <span className="text-zinc-300">{`.####**+.`}</span>
                <span className="text-accent">{`   •••••····        ·
   ·  •                 `}</span>
                <span className="text-zinc-300">{`#%%%###**++=+`}</span>
                <span className="text-accent">{`      •••···
   ·  ·•              `}</span>
                <span className="text-zinc-300">{`.*******+++==--+.`}</span>
                <span className="text-accent">{`       •••···
    ····•             `}</span>
                <span className="text-zinc-300">{`++**+++++===--::+`}</span>
                <span className="text-accent">{`          ••····
     ····•           `}</span>
                <span className="text-zinc-300">{`.******++++==-::...`}</span>
                <span className="text-accent">{`           •····
      ····••          `}</span>
                <span className="text-zinc-300">{`+++++++===--:....`}</span>
                <span className="text-accent">{`             •····
      · ····•••       `}</span>
                <span className="text-zinc-300">{`.-------:::......`}</span>
                <span className="text-accent">{`              •·  ·
            ···•••      `}</span>
                <span className="text-zinc-300">{`:::::........`}</span>
                <span className="text-accent">{`                 •  ·
            · ·····••••   `}</span>
                <span className="text-zinc-300">{`.........`}</span>
                <span className="text-accent">{`                 •••  ·
                  ·····••••••                ·    •••····
                      ········••••••••••••••••••••······
                            ························`}</span>
              </pre>

              <div className="mb-1 flex flex-wrap gap-x-4 gap-y-1">
                <span className="text-accent">saturdayai.org</span>
                <span className="text-muted">workstation:qwen3.5:9b</span>
                <span className="text-faint">·</span>
                <span className="text-muted">ctx 33k</span>
              </div>

              <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-muted">
                <span>10 tools</span>
                <span>5 docs</span>
                <span>git main</span>
                <span>~/Projects/agent</span>
                <span>
                  <span className="text-[#38bdf8]">/help</span>{" "}
                  <span className="text-faint">for commands</span>
                </span>
              </div>

              <Line>
                <span className="text-accent">»</span>{" "}
                <span className="text-fg">explain ai agents</span>
              </Line>

              <div className="my-5 border-l-2 border-edge-strong pl-4">
                <Line>
                  <span className="text-[#28c840]">✓</span>{" "}
                  <span className="text-fg">plan</span>{" "}
                  <span className="ml-20 text-muted">2.4s</span>
                </Line>
                <Line>
                  <span className="text-[#28c840]">✓</span>{" "}
                  <span className="text-fg">agent</span>{" "}
                  <span className="ml-12 text-muted">
                    4.4s&nbsp;&nbsp; iter 0 · 3.3k ctx · 160 tok/s
                  </span>
                </Line>
                <Line>
                  <span className="text-faint">│</span>{" "}
                  <span className="ml-2 text-faint">·</span>{" "}
                  <span className="text-faint">1</span>{" "}
                  <span className="text-muted">
                    Answer from knowledge about AI agents
                  </span>
                </Line>
                <Line>
                  <span className="text-[#28c840]">✓</span>{" "}
                  <span className="text-fg">synthesize </span>{" "}
                  <span className="ml-12 text-muted">
                    2.3s&nbsp;&nbsp; iter 0 · 3.5k ctx · 245 tok/s
                  </span>
                </Line>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-edge pt-3">
                <span className="text-accent">saturday</span>
                <span className="text-muted">qwen3.5:9b</span>
                <span className="text-faint">|</span>
                <span className="text-accent">plan</span>
                <span className="text-muted">iter 0</span>
                <span className="text-muted">7.0s</span>
                <span className="text-muted">0 tools</span>
                <span className="text-faint">|</span>
                <span className="text-muted">
                  ctx <span className="text-[#28c840]">2.6%</span>
                </span>
                <span className="text-muted">
                  cpu <span className="text-[#28c840]">11%</span>
                </span>
                <span className="text-muted">
                  ram <span className="text-[#28c840]">18%</span>
                </span>
                <span className="text-muted">
                  gpu <span className="text-[#ff4d6d]">87%</span>
                </span>
                <span className="text-muted">
                  vram <span className="text-[#ff4d6d]">95%</span>
                </span>
              </div>

              <Line>
                <span className="mt-4 inline-block text-accent">»</span>{" "}
                <span className="inline-block h-4 w-2 translate-y-0.5 bg-accent [animation:caret_1s_steps(1)_infinite]" />
              </Line>
            </div>
          </div>

          {/* Figure annotations — reading the session top to bottom */}
          <aside className="lg:pt-2">
            <p className="mb-6 font-mono text-xs tracking-wide text-faint">
              <span className="text-accent">{"//"}</span> reading the session
            </p>
            <ol className="space-y-6">
              {annotations.map((a) => (
                <li
                  key={a.n}
                  className="border-l border-edge pl-5 transition-colors hover:border-accent"
                >
                  <p className="font-mono text-xs text-accent">{a.n}</p>
                  <h3 className="mt-1.5 text-sm font-medium text-fg">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {a.body}
                  </p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return <div className="whitespace-nowrap py-0.5">{children}</div>;
}
