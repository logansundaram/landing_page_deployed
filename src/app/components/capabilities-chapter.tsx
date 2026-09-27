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
    body: "Open models through Ollama on your own hardware. Five roles, one tier line to swap them all; no API key anywhere in the product.",
  },
  {
    tag: "plan",
    vignette: (
      <>
        <span className="text-ok">✓</span> 1 web_search{" "}
        <span className="text-faint">·</span>{" "}
        <span className="text-accent">▸</span> 2 web_extract{" "}
        <span className="text-faint">· 3 calculate</span>
      </>
    ),
    title: "plans you can edit",
    body: "Press Esc to pause at a step boundary and drop, reorder, or retarget steps — or type a correction and steer the running turn. A step you remove has its effect revoked, not just its wording. /draft runs a plan you wrote yourself.",
  },
  {
    tag: "gates",
    vignette: (
      <>
        write_file <span className="text-faint">→</span>{" "}
        <span className="text-hot">gated</span> ·{" "}
        <span className="text-fg">y / N / s / a / e</span>
      </>
    ),
    title: "tool approval gates",
    body: "Every side effect stops with the real diff or the full command on screen. Enter rejects. An always-allow answer lasts for the turn, not forever, and shell prefix grants screen their argument tail every time.",
  },
  {
    tag: "answers",
    vignette: (
      <>
        figures <span className="text-ok">4/4 traced</span> · [1][2] ·{" "}
        <span className="text-ok">0</span> uncertain
      </>
    ),
    title: "answers you can check",
    body: "Inline citations that resolve to the exact tool call or document, per-token confidence marks calibrated per model, and every figure traced back to a gathered result — or disclosed as untraceable.",
  },
  {
    tag: "trust",
    vignette: (
      <>
        <span className="text-ramp-1">⇅</span> 2 sends · 18 kB{" "}
        <span className="text-faint">→</span> duckduckgo.com
      </>
    ),
    title: "egress ledger & air gap",
    body: "Every byte that leaves is recorded by host and channel and printed under the answer; /privacy airgap seals the boundary. Web pages and remote results are quarantined against prompt injection.",
  },
  {
    tag: "rag",
    vignette: (
      <>
        indexed 128 files <span className="text-faint">→</span> 12.4k chunks ·{" "}
        <span className="text-ok">local</span>
      </>
    ),
    title: "documents & memory",
    body: "Ingest PDFs, markdown, HTML, CSV, and docx into a local knowledge base; durable facts persist across sessions; SATURDAY.md carries your standing instructions.",
  },
  {
    tag: "mcp",
    vignette: (
      <>
        mcp_github_* · 12 tools ·{" "}
        <span className="text-hot">destructive</span>
      </>
    ),
    title: "mcp servers",
    body: "Connect any Model Context Protocol server from config.yaml. Its tools face the same gate as everything else and never self-declare their risk tier.",
  },
  {
    tag: "trace",
    vignette: (
      <>
        run_156.json <span className="text-faint">→</span> --replay ·{" "}
        <span className="text-ok">offline</span>
      </>
    ),
    title: "replayable runs",
    body: "Every run drills down to its plan, reasoning, tool I/O, model inputs, and gate decisions. Export it as JSON and replay it anywhere with saturn --replay — no database needed.",
  },
  {
    tag: "cli",
    vignette: (
      <>
        saturn -q <span className="text-faint">{'"…"'}</span> · gate{" "}
        <span className="text-hot">deny</span> · exported{" "}
        <span className="text-ok">✓</span>
      </>
    ),
    title: "headless & pipes",
    body: "-p and -q run one turn for scripts and pipes; gated tools deny by default; --json for machines; the run auto-exports so the receipt names a command that replays it.",
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
