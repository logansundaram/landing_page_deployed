import Container from "./container";
import SectionHeading from "./section-heading";
import MarkerChip from "./marker-chip";
import Em from "./em";

const annotations = [
  {
    n: 1,
    title: "Declared up front",
    body: "Model, context window, tools, docs, and working directory — stated before the first token.",
  },
  {
    n: 2,
    title: "Execution trace",
    body: "Each stage — plan, agent, synthesize — is logged and timed as it runs, not summarized after.",
  },
  {
    n: 3,
    title: "Live system readout",
    body: "Context, CPU, RAM, GPU, and VRAM stream in the status bar while the agent works.",
  },
  {
    n: 4,
    title: "Your move",
    body: "The prompt returns to you. Side effects wait behind approval gates.",
  },
];

export default function Terminal() {
  return (
    <section className="relative border-t border-edge">
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="01"
          eyebrow="meet saturn"
          title={
            <>
              The terminal <Em>is</Em> the product.
            </>
          }
          lead="Saturn is Saturday.ai's terminal-based, local-first agent. It surfaces everything: the plan it generates, the tools it calls, the approvals it waits on, and the system it runs on. No hidden steps, nothing leaves your machine."
        />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="overflow-hidden border border-edge-strong bg-panel">
            <div className="flex items-center justify-between border-b border-edge bg-panel-2 px-4 py-2.5">
              <p className="font-mono text-xs text-faint">
                saturn · local session · tty1
              </p>
              <p className="flex items-center gap-2 font-mono text-xs text-muted">
                <span className="animate-pulse-soft h-2 w-2 bg-accent" />
                live
              </p>
            </div>

            <div className="bg-scanlines overflow-hidden p-5 font-mono text-[13px] leading-relaxed">
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

              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
                <span>10 tools</span>
                <span>5 docs</span>
                <span>git main</span>
                <span>~/Projects/agent</span>
                <span>
                  <span className="text-[#38bdf8]">/help</span>{" "}
                  <span className="text-faint">for commands</span>
                </span>
                <MarkerChip n={1} className="ml-auto" />
              </div>

              <Line>
                <span className="text-accent">»</span>{" "}
                <span className="text-fg">explain ai agents</span>
              </Line>

              <div className="my-5 border-l-2 border-edge-strong pl-4">
                <div className="flex items-center whitespace-nowrap py-0.5">
                  <span>
                    <span className="text-ok">✓</span>{" "}
                    <span className="text-fg">plan</span>{" "}
                    <span className="ml-20 text-muted">2.4s</span>
                  </span>
                  <MarkerChip n={2} className="ml-auto" />
                </div>
                <Line>
                  <span className="text-ok">✓</span>{" "}
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
                  <span className="text-ok">✓</span>{" "}
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
                  ctx <span className="text-ok">2.6%</span>
                </span>
                <span className="text-muted">
                  cpu <span className="text-ok">11%</span>
                </span>
                <span className="text-muted">
                  ram <span className="text-ok">18%</span>
                </span>
                <span className="text-muted">
                  gpu <span className="text-hot">87%</span>
                </span>
                <span className="text-muted">
                  vram <span className="text-hot">95%</span>
                </span>
                <MarkerChip n={3} className="ml-auto" />
              </div>

              <div className="mt-4 flex items-center whitespace-nowrap py-0.5">
                <span className="text-accent">»</span>{" "}
                <span className="ml-2 inline-block h-4 w-2 translate-y-0.5 animate-[caret_1s_steps(1)_infinite] bg-accent motion-reduce:animate-none" />
                <MarkerChip n={4} className="ml-auto" />
              </div>
            </div>
          </div>

          {/* Figure annotations — chips match the markers in the render */}
          <aside className="lg:pt-2">
            <p className="mb-6 font-mono text-xs text-faint">
              <span className="text-accent">::</span> reading the session
            </p>
            <ol className="space-y-6">
              {annotations.map((a) => (
                <li
                  key={a.n}
                  className="border-l border-edge pl-5 transition-colors hover:border-accent"
                >
                  <div className="flex items-center gap-2.5">
                    <MarkerChip n={a.n} />
                    <h3 className="text-sm font-medium text-fg">{a.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
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
