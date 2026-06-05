import type { ReactNode } from "react";

/** Eyebrow + serif title + optional lead, shared across home sections. */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl leading-tight tracking-tight text-fg md:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}
