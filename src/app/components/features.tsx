import Link from "next/link";
import Container from "./container";
import SectionHeading from "./section-heading";
import Crosses from "./crosses";

const features = [
  {
    tag: "llm",
    title: "Local LLM support",
    body: "Run open models on your own hardware. Bring your weights; nothing leaves the machine.",
  },
  {
    tag: "inspect",
    title: "Workflow inspection",
    body: "Step into any plan and see the exact sequence of decisions that produced it.",
  },
  {
    tag: "gates",
    title: "Tool approval gates",
    body: "Every side effect pauses for review. Approve, deny, or inspect the diff before it runs.",
  },
  {
    tag: "metrics",
    title: "Live metrics",
    body: "Tokens, latency, throughput, and memory stream live as the agent works.",
  },
  {
    tag: "rag",
    title: "RAG document ingestion",
    body: "Index local files and feed grounded context to the agent without a cloud pipeline.",
  },
  {
    tag: "extend",
    title: "Extensible architecture",
    body: "Register custom tools and workflows through a small, typed interface.",
  },
  {
    tag: "tui",
    title: "Terminal-first experience",
    body: "A keyboard-driven TUI built for developers who live in the terminal.",
  },
];

export default function Features() {
  return (
    <section className="relative border-t border-edge">
      <Crosses />
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          title="Everything the agent does, in the open."
          lead="A focused set of primitives — not a sprawling feature list. Each one is observable and under your control."
        />

        {/* Flat spec grid — hairline-divided cells, no chrome */}
        <div className="mt-12 grid grid-cols-1 gap-px border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.tag} className="bg-ink p-7 transition-colors hover:bg-panel">
              <p className="font-mono text-[11px] text-accent">[{f.tag}]</p>
              <h3 className="mt-4 text-base font-medium text-fg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}

          {/* Trailing cell keeps the grid flush and points to docs */}
          <Link
            href="/docs"
            className="group flex flex-col justify-between bg-panel p-7 transition-colors hover:bg-panel-2"
          >
            <p className="font-mono text-[11px] text-faint transition-colors group-hover:text-accent">
              [more]
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
