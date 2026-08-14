import Link from "next/link";
import type { ReactNode } from "react";
import Container from "./container";
import SectionHeading from "./section-heading";

/* Each capability leads with a one-line "vignette" — a readout of what that
   feature actually prints in the TUI, not an icon. */
const features: {
  tag: string;
  vignette: ReactNode;
  title: string;
  body: string;
}[] = [
  {
    tag: "llm",
    vignette: (
      <>
        qwen3.5:9b · <span className="text-ok">loaded</span> · cloud{" "}
        <span className="text-ok">0</span>
      </>
    ),
    title: "Local LLM support",
    body: "Run open models on your own hardware. Bring your weights; nothing leaves the machine.",
  },
  {
    tag: "inspect",
    vignette: (
      <>
        <span className="text-ok">✓</span> plan{" "}
        <span className="text-faint">→</span>{" "}
        <span className="text-ok">✓</span> agent{" "}
        <span className="text-faint">→</span>{" "}
        <span className="text-ok">✓</span> synthesize
      </>
    ),
    title: "Workflow inspection",
    body: "Step into any plan and see the exact sequence of decisions that produced it.",
  },
  {
    tag: "gates",
    vignette: (
      <>
        write_file <span className="text-faint">→</span>{" "}
        <span className="text-hot">gated</span> · approve?{" "}
        <span className="text-fg">[y/N]</span>
      </>
    ),
    title: "Tool approval gates",
    body: "Every side effect pauses for review. Approve, deny, or inspect the diff before it runs.",
  },
  {
    tag: "metrics",
    vignette: (
      <>
        cpu <span className="text-ok">▮▮▯▯▯</span> · gpu{" "}
        <span className="text-hot">▮▮▮▮▯</span> · 160 tok/s
      </>
    ),
    title: "Live metrics",
    body: "Tokens, latency, throughput, and memory stream live as the agent works.",
  },
  {
    tag: "rag",
    vignette: (
      <>
        indexed 128 files <span className="text-faint">→</span> 12.4k chunks ·{" "}
        <span className="text-ok">local</span>
      </>
    ),
    title: "RAG document ingestion",
    body: "Index local files and feed grounded context to the agent without a cloud pipeline.",
  },
  {
    tag: "extend",
    vignette: (
      <>
        registry.add(my_tool) <span className="text-ok">✓</span>
      </>
    ),
    title: "Extensible architecture",
    body: "Register custom tools and workflows through a small, typed interface.",
  },
  {
    tag: "tui",
    vignette: (
      <>
        <span className="text-accent">?</span> help ·{" "}
        <span className="text-accent">:</span> command ·{" "}
        <span className="text-accent">tab</span> complete
      </>
    ),
    title: "Terminal-first experience",
    body: "A keyboard-driven TUI built for developers who live in the terminal.",
  },
];

export default function Features() {
  return (
    <section className="relative border-t border-edge">
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="03"
          eyebrow="capabilities"
          title={
            <>
              Everything the agent does,
              <br className="hidden md:block" /> in the open.
            </>
          }
          lead="A focused set of primitives — not a sprawling feature list. Each one is observable and under your control."
        />

        {/* Flat spec grid — hairline-divided cells, readout strip per cell */}
        <div className="mt-12 grid grid-cols-1 gap-px border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.tag}
              className="bg-ink p-6 transition-colors hover:bg-panel"
            >
              <p className="truncate border border-edge bg-panel px-3 py-2 font-mono text-[11px] text-muted">
                {f.vignette}
              </p>
              <h3 className="mt-4 text-base font-medium text-fg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {f.body}
              </p>
            </div>
          ))}

          {/* Trailing cell squares off the grid and points to docs */}
          <Link
            href="/docs"
            className="group flex flex-col justify-between bg-panel p-6 transition-colors hover:bg-panel-2 lg:col-span-2"
          >
            <p className="truncate border border-edge bg-panel-2 px-3 py-2 font-mono text-[11px] text-faint transition-colors group-hover:text-accent">
              $ man saturn
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The full tool and workflow reference lives in the docs{" "}
              <span className="font-mono text-accent">→</span>
            </p>
          </Link>
        </div>
      </Container>
    </section>
  );
}
