import Chapter from "./chapter";
import { CaptureFigure, LoopRail, RecordedAnswer, fmtTokens } from "./capture";
import { capture } from "../lib/runs/run-hero";

const passes = capture.rows.filter((r) => r.kind === "agent").length;

const rows = [
  {
    k: "one loop",
    v: "each pass is one model call: it calls tools or it answers. a chat question is one pass, a lookup is two.",
  },
  {
    k: "every call on screen",
    v: "each tool call prints with its arguments and what came back, as it runs.",
  },
  {
    k: "sourced answers",
    v: "the answer ends with the exact calls behind it, and arithmetic is computed, never guessed.",
  },
  {
    k: "your move",
    v: "the prompt returns to you. side effects wait at the gate — see 02.",
  },
];

export default function RunChapter() {
  const m = capture.metrics;
  return (
    <Chapter n="01" label="a real run" title="watch it work.">
      <CaptureFigure
        caption={`fig. 01 — run #${capture.id}, ${capture.model}, ${capture.date}. rendered from the run's export record, unedited. ${passes} model passes: read the file, add it up, answer.`}
      >
        <div className="text-[13px] leading-relaxed">
          <p className="whitespace-pre-wrap">
            <span className="text-accent">»</span>{" "}
            <span className="text-fg">{capture.query}</span>
          </p>

          <div className="my-6">
            <LoopRail rows={capture.rows} />
          </div>

          <RecordedAnswer text={capture.response} />

          <p className="type-micro mt-6 lowercase text-faint">
            ctx {fmtTokens(m.contextTokens ?? 0)} · {m.tokPerSec} tok/s ·{" "}
            {m.durationS}s total · run #{capture.id} · {capture.model} · saturn
            v2
          </p>
        </div>
      </CaptureFigure>

      {/* Dense spec rows — how to read the session */}
      <div className="mt-10 grid gap-px border border-edge bg-edge sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.k} className="bg-ink p-5">
            <p className="text-sm font-bold lowercase text-fg">{r.k}</p>
            <p className="mt-1.5 text-sm lowercase leading-relaxed text-muted">
              {r.v}
            </p>
          </div>
        ))}
      </div>
    </Chapter>
  );
}
