import Chapter from "./chapter";
import {
  AnswerSpans,
  CaptureFigure,
  NodeTrace,
  fmtTokens,
} from "./capture";
import { capture } from "../lib/runs/run-hero";

/* The words the model hedged on, straight from the data — quoted in the
   caption so the reader can find them. Confidence spans are token
   fragments ("probabil"), so each is expanded to word boundaries using
   its neighbors before quoting. */
const spans = capture.answer ?? [];
const fullText = spans.map((s) => s.text).join("");
const hedgedWords: string[] = [];
{
  let offset = 0;
  for (const s of spans) {
    if (s.level > 0) {
      // First word character inside this span, expanded to word boundaries
      const inner = s.text.search(/\S/);
      if (inner >= 0) {
        let a = offset + inner;
        let b = a;
        while (a > 0 && /\S/.test(fullText[a - 1])) a--;
        while (b < fullText.length && /\S/.test(fullText[b])) b++;
        const word = fullText.slice(a, b).replace(/[.,;:!?]+$/, "");
        if (!hedgedWords.includes(word)) hedgedWords.push(word);
      }
    }
    offset += s.text.length;
  }
}
const hedged = hedgedWords.map((w) => `"${w}"`).join(", ");

const rows = [
  {
    k: "declared up front",
    v: "model, tools, and context are stated before the first token.",
  },
  {
    k: "execution trace",
    v: "every pipeline node is timed as it runs — plan, execute, rectify, synthesize.",
  },
  {
    k: "confidence on screen",
    v: "the answer carries its own token probabilities; hedged spans wear the ramp.",
  },
  {
    k: "your move",
    v: "the prompt returns to you. side effects wait at the gate — see 02.",
  },
];

export default function RunChapter() {
  const m = capture.metrics;
  return (
    <Chapter n="01" label="a real run">
      <CaptureFigure
        caption={`fig. 01 — run #${capture.id}, ${capture.model}, ${capture.date}. rendered from the run's export record, unedited. amber marks the spans the model was less sure of: ${hedged}.`}
      >
        <div className="text-[13px] leading-relaxed">
          <p className="whitespace-pre-wrap">
            <span className="text-prompt">»</span>{" "}
            <span className="text-fg">{capture.query}</span>
          </p>

          <div className="my-6">
            <NodeTrace nodes={capture.nodes} />
          </div>

          <p className="max-w-2xl whitespace-pre-wrap text-muted">
            {capture.answer && <AnswerSpans spans={capture.answer} />}
          </p>

          <p className="type-micro mt-6 lowercase text-faint">
            ctx {fmtTokens(m.contextTokens ?? 0)} · {m.tokPerSec} tok/s ·{" "}
            {m.durationS}s total · run #{capture.id} · {capture.model} · saturn{" "}
            {capture.saturnVersion}
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
