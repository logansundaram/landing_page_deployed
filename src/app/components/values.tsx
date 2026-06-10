import Container from "./container";
import SectionHeading from "./section-heading";
import Crosses from "./crosses";

const values = [
  {
    id: "local",
    title: "Local First",
    body: "Models, context, and data stay on your machine. No round-trips to a vendor, no telemetry you didn't opt into.",
  },
  {
    id: "transparency",
    title: "Transparency",
    body: "Plans, tool calls, and reasoning are written to the screen as they happen — not summarized after the fact.",
  },
  {
    id: "observability",
    title: "Observability",
    body: "Token usage, latency, memory, and execution traces are exposed as first-class, inspectable system state.",
  },
  {
    id: "extensibility",
    title: "Extensibility",
    body: "Add tools, integrations, and workflows over time. The agent grows with your stack instead of boxing you in.",
  },
  {
    id: "control",
    title: "Control",
    body: "Approval gates sit in front of every side effect. The agent proposes; you decide what it's allowed to do.",
  },
];

export default function Values() {
  return (
    <section className="relative border-t border-edge">
      <Crosses />
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="02"
          eyebrow="Philosophy"
          title="Five non-negotiables."
          lead="Every design decision in Saturday.ai traces back to one of these."
        />

        {/* Ledger — numbered rows instead of cards */}
        <div className="mt-12 border-t border-edge">
          {values.map((v, i) => (
            <div
              key={v.id}
              className="group grid gap-x-6 gap-y-1 border-b border-edge py-7 md:grid-cols-[88px_280px_1fr] md:items-baseline"
            >
              <p className="font-mono text-sm text-faint transition-colors group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-serif text-2xl tracking-tight text-fg">
                {v.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-muted">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
