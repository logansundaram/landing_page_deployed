import Container from "./container";
import SectionHeading from "./section-heading";

/* The five values rendered as the config file they actually are. */
const policy = [
  {
    key: "local_first",
    value: "true",
    body: "Models, context, and data stay on your machine. No round-trips to a vendor, no telemetry you didn't opt into.",
  },
  {
    key: "show_work",
    value: "always",
    body: "Plans, tool calls, and reasoning are written to the screen as they happen — not summarized after the fact.",
  },
  {
    key: "metrics",
    value: "exposed",
    body: "Token usage, latency, memory, and execution traces are first-class, inspectable system state.",
  },
  {
    key: "tools",
    value: "extensible",
    body: "Add tools, integrations, and workflows over time. The agent grows with your stack instead of boxing you in.",
  },
  {
    key: "side_effects",
    value: "gated",
    body: "Approval gates sit in front of every side effect. The agent proposes; you decide what runs.",
  },
];

export default function Values() {
  return (
    <section className="relative border-t border-edge">
      <Container className="py-20 md:py-28">
        <SectionHeading
          index="02"
          eyebrow="philosophy"
          title="Policy, not promises."
          lead="Five rules pinned in Saturn's config. Every design decision traces back to one of them."
        />

        <div className="mt-12 border border-edge-strong bg-panel">
          <div className="flex items-center justify-between border-b border-edge bg-panel-2 px-5 py-2.5 font-mono text-xs text-faint">
            <p># saturn.policy</p>
            <p>5 rules · read-only</p>
          </div>
          {policy.map((r, i) => (
            <div
              key={r.key}
              className="grid gap-x-8 gap-y-2 border-b border-edge px-5 py-5 transition-colors last:border-b-0 hover:bg-panel-2 md:grid-cols-[24px_260px_1fr] md:items-baseline"
            >
              <p className="hidden font-mono text-sm text-faint md:block">
                {i + 1}
              </p>
              <p className="font-mono text-sm">
                <span className="text-fg">{r.key}</span>
                <span className="text-faint"> = </span>
                <span className="text-ok">{r.value}</span>
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-muted">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
