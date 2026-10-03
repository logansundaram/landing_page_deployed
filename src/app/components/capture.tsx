import type { CaptureRow } from "../lib/runs/types";

/**
 * Shared pieces for rendering a real saturn run as text. The capture sits on
 * the page background — no window chrome, no scanlines — framed by hairline
 * rules; the seam between page and terminal is meant to vanish.
 */

export function fmtTokens(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

/* The loop as the rail prints it: each agent pass with its timing, the tool
   calls it made with their (clipped) results, and every gate decision. */
export function LoopRail({ rows }: { rows: CaptureRow[] }) {
  return (
    <div>
      {rows.map((r, i) => {
        if (r.kind === "agent")
          return (
            <div key={i} className="whitespace-pre py-0.5">
              <span className="text-ok">✓</span>{" "}
              <span className="text-fg">agent</span>
              <span className="text-muted">
                {`${r.durS?.toFixed(1) ?? "–"}s`.padStart(8)}
              </span>
              <span className="text-faint">
                {"   "}iter {r.iter} · {fmtTokens(r.contextTokens)} ctx ·{" "}
                {Math.round(r.tokPerSec)} tok/s{"   "}
              </span>
              {r.calls ? (
                <span className="text-accent">→ {r.calls.join(", ")}</span>
              ) : (
                <span className="text-ok">→ answer</span>
              )}
            </div>
          );
        if (r.kind === "tool")
          return (
            <div key={i} className="py-0.5">
              <div className="whitespace-pre">
                <span className="text-faint">{"  └─ "}</span>
                <span className={r.ok ? "text-fg" : "text-hot"}>{r.call}</span>
              </div>
              <div className="whitespace-pre text-faint">
                {"     └ "}
                {r.result}
              </div>
            </div>
          );
        return (
          <div key={i} className="whitespace-pre py-0.5">
            <span className="text-hot">■</span>{" "}
            <span className="text-fg">gate </span>
            <span className="text-muted">
              {"    "}
              {r.calls.map((c) => c.name).join(", ")} —{" "}
            </span>
            {r.calls.every((c) => c.approved) ? (
              <span className="font-bold text-ok">approved</span>
            ) : (
              <span className="font-bold text-hot">denied</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* The recorded answer, verbatim. Saturn's markdown is light — **bold** and
   "> " quotes — so only those two are styled; everything else is the text. */
export function RecordedAnswer({ text }: { text: string }) {
  return (
    <div className="max-w-2xl whitespace-pre-wrap text-muted">
      {text.split("\n").map((line, i) => {
        const quote = line.startsWith("> ");
        const body = quote ? line.slice(2) : line;
        return (
          <p
            key={i}
            className={quote ? "border-l border-edge pl-3 text-fg" : undefined}
          >
            {body.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j} className="text-fg">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                part
              ),
            )}
            {body === "" && " "}
          </p>
        );
      })}
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
