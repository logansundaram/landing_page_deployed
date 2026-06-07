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

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-xl border border-edge-strong bg-panel shadow-2xl shadow-black/40">
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
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
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
      </Container>
    </section>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return <div className="whitespace-nowrap py-0.5">{children}</div>;
}
