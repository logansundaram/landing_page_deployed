import type { ReactNode } from "react";

/** Index + eyebrow annotation, serif title, optional lead — shared across home sections. */
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
    <div className="max-w-2xl">
      <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
        {index && <span className="text-faint">{index}</span>}
        <span aria-hidden className="h-px w-8 bg-edge-strong" />
        <span className="text-accent">{eyebrow}</span>
      </p>
      <h2 className="font-serif text-4xl leading-tight tracking-tight text-fg md:text-5xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-muted">{lead}</p>
      )}
    </div>
  );
}
