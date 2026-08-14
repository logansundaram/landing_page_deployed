"use client";

import { useState } from "react";

export default function CodeBlock({
  command,
  label,
}: {
  command: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="overflow-hidden border border-edge bg-panel">
      {label && (
        <div className="type-micro border-b border-edge px-4 py-2 lowercase text-faint">
          {label}
        </div>
      )}
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <code className="overflow-x-auto text-sm text-fg">
          <span className="select-none text-faint">$ </span>
          {command}
        </code>
        <button
          type="button"
          onClick={copy}
          className="type-micro shrink-0 border border-edge-strong px-2 py-1 lowercase text-muted t-colors hover:border-fg hover:text-fg"
          aria-label="Copy command"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
    </div>
  );
}
