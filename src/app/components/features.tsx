import Container from "./container";
import SectionHeading from "./section-heading";

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
    <section className="border-t border-edge">
      <Container className="py-20 md:py-28">
        <SectionHeading
          eyebrow="Capabilities"
          title="Everything the agent does, in the open."
          lead="A focused set of primitives — not a sprawling feature list. Each one is observable and under your control."
        />

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.tag}
              className="bg-ink p-6 transition-colors hover:bg-panel"
            >
              <span className="inline-block rounded border border-edge-strong px-2 py-0.5 font-mono text-[11px] text-accent">
                {f.tag}
              </span>
              <h3 className="mt-4 text-base font-medium text-fg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}

          {/* Trailing cell keeps the grid flush and points to docs */}
          <div className="flex flex-col justify-between bg-panel p-6">
            <span className="inline-block rounded border border-edge-strong px-2 py-0.5 font-mono text-[11px] text-faint">
              more
            </span>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Read the docs for the full tool and workflow reference.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
