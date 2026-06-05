import Container from "./container";

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
    <section className="border-t border-edge">
      <Container className="py-20 md:py-28">
        <div className="grid grid-cols-1 border-l border-t border-edge md:grid-cols-2 lg:grid-cols-3">
          {/* Heading occupies the first cell */}
          <div className="flex flex-col justify-center border-b border-r border-edge p-7">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Philosophy
            </p>
            <h2 className="font-serif text-3xl leading-tight tracking-tight text-fg">
              Built on five
              <br />
              non-negotiables.
            </h2>
          </div>

          {values.map((v, i) => (
            <div
              key={v.id}
              className="group border-b border-r border-edge p-7 transition-colors hover:bg-panel"
            >
              <p className="mb-4 font-mono text-xs text-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2 text-base font-medium text-fg">{v.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{v.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
