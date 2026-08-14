import Chapter from "./chapter";

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

export default function PolicyChapter() {
  return (
    <Chapter n="03" label="policy, not promises">
      <div className="border-y border-edge">
        <div className="type-micro flex items-center justify-between border-b border-edge py-2.5 lowercase text-faint">
          <p># saturn.policy</p>
          <p>5 rules · read-only</p>
        </div>
        {policy.map((r, i) => (
          <div
            key={r.key}
            className="grid gap-x-8 gap-y-2 border-b border-edge py-5 t-colors last:border-b-0 hover:bg-panel md:grid-cols-[24px_260px_1fr] md:items-baseline"
          >
            <p className="hidden text-sm text-faint md:block">{i + 1}</p>
            <p className="text-sm">
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
    </Chapter>
  );
}
