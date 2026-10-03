import Chapter from "./chapter";

/* The six values rendered as the config file they actually are. */
const policy = [
  {
    key: "local_first",
    value: "true",
    body: "Models, context, and data stay on your machine. No API key anywhere, no telemetry. What can leave is a short list: a search query, a page fetch, a message you approved, and the MCP servers you configured.",
  },
  {
    key: "show_work",
    value: "always",
    body: "Every model pass and tool call is written to the screen as it happens — not summarized after the fact — and every run replays offline from its export record.",
  },
  {
    key: "side_effects",
    value: "gated",
    body: "Approval gates sit in front of every write, command, send, and remote call, showing the real diff, the full command, or the recipient and the exact text. Enter rejects. Grants expire with the turn.",
  },
  {
    key: "answers",
    value: "traced",
    body: "Every answer that used a tool ends with the exact calls and documents behind it. What failed or was declined is listed under the answer, never papered over.",
  },
  {
    key: "egress",
    value: "recorded",
    body: "Every byte that leaves is logged by host and channel and printed under the answer. Air-gap the whole thing with one command; web pages, mail, and files are quarantined against injection.",
  },
  {
    key: "trust_settings",
    value: "explicit",
    body: "A loosened posture — an open gate, a lifted air gap, a relaxed tier — is session-only unless you say --save. Nothing weaker is ever written to disk silently.",
  },
];

export default function PolicyChapter() {
  return (
    <Chapter
      n="03"
      label="the policy file"
      title={
        <>
          <span className="block font-normal">policy,</span>
          <span className="block">not promises.</span>
        </>
      }
    >
      <div className="border-y border-edge">
        <div className="type-micro flex items-center justify-between border-b border-edge py-2.5 lowercase text-faint">
          <p># saturn.policy</p>
          <p>6 rules · read-only</p>
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
