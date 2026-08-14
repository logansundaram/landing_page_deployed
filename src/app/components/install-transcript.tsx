"use client";

import { useState } from "react";

const COMMAND = "curl -fsSL saturdayai.org/install.sh | sh";

/**
 * The closing CTA rendered as what actually happens: an install transcript.
 * The copy button lifts the one command that matters.
 */
export default function InstallTranscript() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="overflow-hidden border border-edge-strong bg-panel">
      <div className="flex items-center justify-between border-b border-edge bg-panel-2 px-4 py-2.5">
        <p className="font-mono text-xs text-faint">saturn · install</p>
        <button
          type="button"
          onClick={copy}
          className="border border-edge-strong px-2 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          aria-label="Copy install command"
        >
          {copied ? "copied" : "copy command"}
        </button>
      </div>

      <div className="bg-scanlines overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <Line>
          <span className="text-accent">$</span>{" "}
          <span className="text-fg">{COMMAND}</span>
        </Line>
        <Line>
          {"  fetch saturn "}
          <Dots n={12} /> <span className="text-ok">done</span>
        </Line>
        <Line>
          {"  verify checksum "}
          <Dots n={9} /> <span className="text-ok">done</span>
        </Line>
        <Line>
          {"  install ~/.saturn/bin "}
          <Dots n={3} /> <span className="text-ok">done</span>
        </Line>
        <Line>
          {"  pull qwen3.5:9b "}
          <Dots n={9} /> <span className="text-muted">4.7 GB</span>
        </Line>
        <Line className="mt-4">
          <span className="text-accent">$</span>{" "}
          <span className="text-fg">saturn</span>
        </Line>
        <Line>
          <span className="text-ok">▌ session started</span>
          <span className="text-muted">
            {" "}
            — 0 cloud calls · everything on screen
          </span>
        </Line>
        <Line className="mt-4">
          <span className="text-accent">»</span>{" "}
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-[caret_1s_steps(1)_infinite] bg-accent motion-reduce:animate-none" />
        </Line>
      </div>
    </div>
  );
}

function Line({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`whitespace-pre py-0.5 text-muted ${className}`}>
      {children}
    </div>
  );
}

function Dots({ n }: { n: number }) {
  return <span className="text-faint">{".".repeat(n)}</span>;
}
