import Link from "next/link";
import type { ReactNode } from "react";
import Chapter from "./chapter";

/* Each capability leads with a readout of what that feature actually prints
   in the TUI — not an icon. Vignette colors are the TUI's own: cyan
   prompt/hints, ok green, hot for gated calls and pegged gauges. */
const capabilities: {
  tag: string;
  vignette: ReactNode;
  title: string;
  body: string;
}[] = [
  {
    tag: "llm",
    vignette: (
      <>
        qwen3.6:27b · <span className="text-ok">loaded</span> · cloud{" "}
        <span className="text-ok">0</span>
      </>
    ),
    title: "local llm support",
    body: "Run open models on your own hardware. Bring your weights; nothing leaves the machine.",
  },
  {
    tag: "inspect",
    vignette: (
      <>
        <span className="text-ok">✓</span> plan{" "}
        <span className="text-faint">→</span>{" "}
        <span className="text-ok">✓</span> execute{" "}
        <span className="text-faint">→</span>{" "}
        <span className="text-ok">✓</span> synthesize
      </>
    ),
    title: "workflow inspection",
    body: "Step into any run and see the exact sequence of decisions that produced it.",
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
    title: "tool approval gates",
    body: "Every side effect pauses for review. Approve, deny, or inspect the diff before it runs.",
  },
  {
    tag: "metrics",
    vignette: (
      <>
        cpu <span className="text-ok">▮▮▯▯▯</span> · gpu{" "}
        <span className="text-ramp-3">▮▮▮▮▯</span> · 160 tok/s
      </>
    ),
    title: "live metrics",
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
    title: "rag document ingestion",
    body: "Index local files and feed grounded context to the agent without a cloud pipeline.",
  },
  {
    tag: "extend",
    vignette: (
      <>
        registry.add(my_tool) <span className="text-ok">✓</span>
      </>
    ),
    title: "extensible architecture",
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
    title: "terminal-first experience",
    body: "A keyboard-driven TUI built for developers who live in the terminal.",
  },
];

export default function CapabilitiesChapter() {
  return (
    <Chapter n="04" label="capabilities" title="what it does.">
      {/* Dense spec table — hairline rows, no cards */}
      <div className="border-y border-edge">
        {capabilities.map((c) => (
          <div
            key={c.tag}
            className="grid gap-x-8 gap-y-2 border-b border-edge py-5 t-colors hover:bg-panel md:grid-cols-[90px_minmax(0,320px)_1fr] md:items-baseline"
          >
            <p className="type-micro lowercase text-faint">{c.tag}</p>
            {/* Readouts keep their true case — [y/N] means default-No */}
            <p className="type-micro truncate text-muted">{c.vignette}</p>
            <div>
              <p className="text-sm font-bold lowercase text-fg">{c.title}</p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                {c.body}
              </p>
            </div>
          </div>
        ))}
        <Link
          href="/docs"
          className="group grid gap-x-8 py-5 t-colors hover:bg-panel md:grid-cols-[90px_minmax(0,320px)_1fr] md:items-baseline"
        >
          <p className="type-micro lowercase text-faint">$</p>
          <p className="type-micro lowercase text-muted">man saturn</p>
          <p className="text-sm lowercase text-muted t-colors group-hover:text-fg">
            the full tool and workflow reference lives in the docs →
          </p>
        </Link>
      </div>
    </Chapter>
  );
}
