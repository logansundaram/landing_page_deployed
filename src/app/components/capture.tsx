import type { CaptureNode, CaptureSpan } from "../lib/runs/types";

/**
 * Shared pieces for rendering a real saturn run as text. The capture sits on
 * the page background — no window chrome, no scanlines — framed by hairline
 * rules; the seam between page and terminal is meant to vanish.
 */

/* Confidence level -> text treatment. Level 0 is the default voice —
   certainty is not decorated. Levels 3-4 sit below body-text contrast on
   ink, so they also carry weight (the dataviz secondary-encoding rule);
   every colored span exposes its probability on hover. */
const SPAN_CLASS: Record<CaptureSpan["level"], string> = {
  0: "",
  1: "text-ramp-1",
  2: "text-ramp-2",
  3: "text-ramp-3 font-bold",
  4: "text-ramp-4 font-bold",
};

export function AnswerSpans({ spans }: { spans: CaptureSpan[] }) {
  return (
    <>
      {spans.map((s, i) =>
        s.level === 0 ? (
          <span key={i}>{s.text}</span>
        ) : (
          <span
            key={i}
            className={SPAN_CLASS[s.level]}
            title={`confidence level ${s.level} of 4 — the model was less sure of this span`}
          >
            {s.text}
          </span>
        ),
      )}
    </>
  );
}

export function fmtTokens(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

export function NodeTrace({ nodes }: { nodes: CaptureNode[] }) {
  const pad = Math.max(...nodes.map((n) => n.node.length));
  return (
    <div>
      {nodes.map((n) => (
        <div key={n.node} className="whitespace-pre py-0.5">
          <span className="text-gate-ok">✓</span>{" "}
          <span className="text-fg">{n.node.padEnd(pad)}</span>
          <span className="text-muted">
            {`  ${n.durS.toFixed(1)}s`.padStart(8)}
          </span>
          <span className="text-faint">
            {"   "}
            {fmtTokens(n.promptTokens)} in · {fmtTokens(n.outputTokens)} out
          </span>
        </div>
      ))}
    </div>
  );
}

/** Hairline-framed full-bleed capture surface with a deadpan fig. caption. */
export function CaptureFigure({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="m-0">
      <div className="overflow-x-auto border-y border-edge py-8">
        {children}
      </div>
      <figcaption className="type-micro mt-3 lowercase text-faint">
        {caption}
      </figcaption>
    </figure>
  );
}
