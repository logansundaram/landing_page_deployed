import Link from "next/link";
import type { ReactNode } from "react";
import Chapter from "./chapter";

/* Each capability leads with a readout of what that feature actually prints
   in the TUI — not an icon. Colors in the vignettes are semantic only:
   gate states and the ramp for load. */
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
        qwen3.6:27b · <span className="text-gate-ok">loaded</span> · cloud{" "}
        <span className="text-gate-ok">0</span>
      </>
    ),
    title: "local llm support",
    body: "Run open models on your own hardware. Bring your weights; nothing leaves the machine.",
  },
  {
    tag: "inspect",
    vignette: (
      <>
        <span className="text-gate-ok">✓</span> plan{" "}
        <span className="text-faint">→</span>{" "}
        <span className="text-gate-ok">✓</span> execute{" "}
        <span className="text-faint">→</span>{" "}
        <span className="text-gate-ok">✓</span> synthesize
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
        <span className="text-gate-deny">gated</span> · approve?{" "}
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
        cpu <span className="text-gate-ok">▮▮▯▯▯</span> · gpu{" "}
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
        <span className="text-gate-ok">local</span>
      </>
    ),
    title: "rag document ingestion",
    body: "Index local files and feed grounded context to the agent without a cloud pipeline.",
  },
  {
    tag: "extend",
    vignette: (
      <>
        registry.add(my_tool) <span className="text-gate-ok">✓</span>
      </>
    ),
    title: "extensible architecture",
    body: "Register custom tools and workflows through a small, typed interface.",
  },
  {
    tag: "tui",
    vignette: (
      <>
        <span className="text-fg">?</span> help ·{" "}
        <span className="text-fg">:</span> command ·{" "}
        <span className="text-fg">tab</span> complete
      </>
    ),
    title: "terminal-first experience",
    body: "A keyboard-driven TUI built for developers who live in the terminal.",
  },
];

export default function CapabilitiesChapter() {
  return (
    <Chapter n="04" label="capabilities">
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
