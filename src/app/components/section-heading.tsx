import type { ReactNode } from "react";

/**
 * Mono rule-label + sans display title, shared across home sections.
 * Reads like a schematic sheet label: `01 :: eyebrow ────────`.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-3 font-mono text-xs">
        {index && <span className="text-faint">{index}</span>}
        <span className="text-faint">::</span>
        <span className="lowercase text-accent">{eyebrow}</span>
        <span aria-hidden className="h-px min-w-8 flex-1 bg-edge" />
      </p>
      <h2 className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tight text-fg md:text-[2.75rem]">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {lead}
        </p>
      )}
    </div>
  );
}
